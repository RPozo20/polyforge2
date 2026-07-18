import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

const TABLE_NAME = process.env.DYNAMODB_ASSETS_TABLE || "PolyforgeAssets";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Query all orders for the current user
    const response = await dynamoDb.send(new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
      ExpressionAttributeValues: {
        ":pk": `USER#${session.user.id}`,
        ":skPrefix": "ORDER#"
      }
    }));

    const orders = response.Items || [];
    
    // Only return paid orders
    const paidOrders = orders.filter((o) => o.status === "paid");

    // Flatten all purchased assets from the paid orders into a single list
    const purchasedAssets = [];
    for (const order of paidOrders) {
      if (order.purchasedAssets && Array.isArray(order.purchasedAssets)) {
        for (const asset of order.purchasedAssets) {
          // Check for duplicates (if a user somehow bought the same item twice)
          if (!purchasedAssets.some((a) => a.id === asset.id)) {
            purchasedAssets.push({
              ...asset,
              orderId: order.id,
              purchasedAt: order.createdAt,
              receiptUrl: order.receiptUrl || null,
            });
          }
        }
      }
    }
    
    // Sort by purchase date (newest first)
    purchasedAssets.sort((a, b) => new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime());

    return NextResponse.json({ assets: purchasedAssets });
  } catch (error) {
    console.error("DynamoDB Query Error (Orders):", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
