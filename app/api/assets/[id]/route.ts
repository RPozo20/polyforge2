import { NextRequest, NextResponse } from "next/server";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";

const TABLE_NAME = process.env.DYNAMODB_ASSETS_TABLE || "PolyforgeAssets";

// Fetch a single asset by ID
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // We use a Scan with a filter since we don't know the exact PK (USER#id)
    // For production, it's better to create a GSI with `id` as the partition key.
    const response = await dynamoDb.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id
      }
    }));

    if (!response.Items || response.Items.length === 0) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    return NextResponse.json({ asset: response.Items[0] });

  } catch (error) {
    console.error("DynamoDB Get Asset Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
