import { NextRequest, NextResponse } from "next/server";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";

const TABLE_NAME = process.env.DYNAMODB_ASSETS_TABLE || "PolyforgeAssets";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const userId = "123"; // Mock user ID for now

    const response = await dynamoDb.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `USER#${userId}`,
        SK: "PROFILE"
      }
    }));

    if (!response.Item) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: response.Item });
  } catch (error) {
    console.error("DynamoDB Get User Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, bio, website, paypalEmail, avatarKey } = body;
    const userId = "123";

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    const userProfile: any = {
      PK: `USER#${userId}`,
      SK: "PROFILE",
      name,
      bio,
      website,
      paypalEmail,
      updatedAt: timestamp,
    };

    if (avatarKey) {
      userProfile.avatarKey = avatarKey;
    }

    await dynamoDb.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: userProfile
    }));

    return NextResponse.json({ success: true, user: userProfile });
  } catch (error) {
    console.error("DynamoDB Update User Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
