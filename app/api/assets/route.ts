import { NextRequest, NextResponse } from "next/server";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 

export const dynamic = "force-dynamic";

const TABLE_NAME = process.env.DYNAMODB_ASSETS_TABLE || "PolyforgeAssets";

// Create a new Asset record
export async function POST(req: NextRequest) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body = await req.json();
    const { 
      title, description, category, tags, price, isFree, objectKey, coverImageKey, wireframeImageKey,
      polyCount, triangleCount, lodLevels, formats, software, textureResolution, hasBones, boneCount, hasBlendShapes
    } = body;

    // Basic validation
    if (!title || !objectKey) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const assetId = uuidv4();
    const timestamp = new Date().toISOString();

    const assetItem = {
      PK: `USER#123`, // In reality: `USER#${session.user.id}`
      SK: `ASSET#${assetId}`,
      GSI1PK: "ASSETS", // For global marketplace queries
      GSI1SK: timestamp, // Sort by newest first
      id: assetId,
      // userId: session.user.id,
      author: {
        name: "Studio Admin",
        avatar: "https://i.pravatar.cc/150?u=creator",
        location: "Global",
      },
      title,
      description,
      category,
      tags,
      price: isFree ? 0 : parseFloat(price),
      isFree,
      objectKey, // Reference to the R2 file
      coverImageKey, // Reference to the R2 thumbnail
      wireframeImageKey, // Reference to the R2 wireframe image (optional)
      polyCount: parseInt(polyCount) || 0,
      triangleCount: parseInt(triangleCount) || 0,
      lodLevels: parseInt(lodLevels) || 0,
      formats: formats ? formats.split(',').map((f: string) => ({ name: f.trim() })) : [],
      software: software ? software.split(',').map((s: string) => s.trim()) : [],
      textureResolution: textureResolution || "N/A",
      hasBones: Boolean(hasBones),
      boneCount: parseInt(boneCount) || 0,
      hasBlendShapes: Boolean(hasBlendShapes),
      status: "PUBLISHED",
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await dynamoDb.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: assetItem
    }));

    return NextResponse.json({ success: true, asset: assetItem }, { status: 201 });

  } catch (error) {
    console.error("DynamoDB Put Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Fetch assets (either for dashboard or marketplace)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const feed = searchParams.get("feed");

    // MARKETPLACE FEED (Fetch all published assets globally using GSI)
    if (feed === "marketplace") {
      const response = await dynamoDb.send(new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :gsiPk",
        ExpressionAttributeValues: {
          ":gsiPk": "ASSETS"
        },
        ScanIndexForward: false // Newest first
      }));
      
      return NextResponse.json({ assets: response.Items || [] });
    }

    // DASHBOARD FEED (Fetch only the user's assets)
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const userId = "123";

    const response = await dynamoDb.send(new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
      ExpressionAttributeValues: {
        ":pk": `USER#${userId}`,
        ":skPrefix": "ASSET#"
      }
    }));

    return NextResponse.json({ assets: response.Items || [] });

  } catch (error) {
    console.error("DynamoDB Query Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete an asset
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Missing asset id" }, { status: 400 });
    }

    const { DeleteCommand } = await import("@aws-sdk/lib-dynamodb");

    await dynamoDb.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `USER#123`,
        SK: `ASSET#${id}`
      }
    }));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DynamoDB Delete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Update an asset
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      id, title, description, category, tags, price, isFree, objectKey, coverImageKey, wireframeImageKey, createdAt,
      polyCount, triangleCount, lodLevels, formats, software, textureResolution, hasBones, boneCount, hasBlendShapes
    } = body;

    if (!id || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    const assetItem: any = {
      PK: `USER#123`,
      SK: `ASSET#${id}`,
      GSI1PK: "ASSETS",
      GSI1SK: createdAt || timestamp, // Preserve original timestamp or use current
      id,
      author: {
        name: "Studio Admin",
        avatar: "https://i.pravatar.cc/150?u=creator",
        location: "Global",
      },
      title,
      description,
      category,
      tags,
      price: isFree ? 0 : parseFloat(price),
      isFree,
      polyCount: parseInt(polyCount) || 0,
      triangleCount: parseInt(triangleCount) || 0,
      lodLevels: parseInt(lodLevels) || 0,
      formats: formats ? formats.split(',').map((f: string) => ({ name: f.trim() })) : [],
      software: software ? software.split(',').map((s: string) => s.trim()) : [],
      textureResolution: textureResolution || "N/A",
      hasBones: Boolean(hasBones),
      boneCount: parseInt(boneCount) || 0,
      hasBlendShapes: Boolean(hasBlendShapes),
      status: "PUBLISHED",
      createdAt: createdAt || timestamp,
      updatedAt: timestamp,
    };

    if (objectKey) assetItem.objectKey = objectKey;
    if (coverImageKey) assetItem.coverImageKey = coverImageKey;
    if (wireframeImageKey !== undefined) assetItem.wireframeImageKey = wireframeImageKey;

    const { PutCommand } = await import("@aws-sdk/lib-dynamodb");
    await dynamoDb.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: assetItem
    }));

    return NextResponse.json({ success: true, asset: assetItem });
  } catch (error) {
    console.error("DynamoDB Put (Update) Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
