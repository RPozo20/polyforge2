const { DynamoDBClient, ScanCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const envVars = env.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) acc[key.trim()] = value.trim().replace(/^"|"$/g, '');
  return acc;
}, {});

const client = new DynamoDBClient({
  region: envVars.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: envVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
  },
});

const TABLE_NAME = envVars.DYNAMODB_ASSETS_TABLE || "PolyforgeAssets";

async function run() {
  try {
    const scanRes = await client.send(new ScanCommand({ TableName: TABLE_NAME }));
    console.log("Total items in table:", scanRes.Items.length);
    if (scanRes.Items.length > 0) {
      console.log("First item:", unmarshall(scanRes.Items[0]));
    }

    const queryRes = await client.send(new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1PK = :gsiPk",
      ExpressionAttributeValues: {
        ":gsiPk": { S: "ASSETS" }
      }
    }));
    console.log("Items in GSI1:", queryRes.Items.length);
  } catch (e) {
    console.error(e);
  }
}
run();
