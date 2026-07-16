const { DynamoDBClient, CreateTableCommand, DescribeTableCommand } = require("@aws-sdk/client-dynamodb");

// Load credentials from environment
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "your_access_key",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "your_secret_key",
  },
});

const TABLE_NAME = process.env.DYNAMODB_ASSETS_TABLE || "PolyforgeAssets";

async function createTable() {
  console.log(`Checking if table "${TABLE_NAME}" exists...`);
  
  try {
    await client.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
    console.log(`Table "${TABLE_NAME}" already exists! No action needed.`);
    return;
  } catch (err) {
    if (err.name !== "ResourceNotFoundException") {
      console.error("Error describing table:", err);
      process.exit(1);
    }
  }

  console.log(`Creating table "${TABLE_NAME}"...`);

  const command = new CreateTableCommand({
    TableName: TABLE_NAME,
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },
      { AttributeName: "SK", AttributeType: "S" },
      { AttributeName: "GSI1PK", AttributeType: "S" },
      { AttributeName: "GSI1SK", AttributeType: "S" }
    ],
    KeySchema: [
      { AttributeName: "PK", KeyType: "HASH" },
      { AttributeName: "SK", KeyType: "RANGE" }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "GSI1",
        KeySchema: [
          { AttributeName: "GSI1PK", KeyType: "HASH" },
          { AttributeName: "GSI1SK", KeyType: "RANGE" }
        ],
        Projection: { ProjectionType: "ALL" },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  });

  try {
    const response = await client.send(command);
    console.log("Table creation initiated successfully.");
    console.log("Table Status:", response.TableDescription?.TableStatus);
    console.log("\nNote: It may take a minute for AWS to fully provision the table and Global Secondary Index.");
  } catch (error) {
    console.error("Error creating table:", error);
    process.exit(1);
  }
}

createTable();
