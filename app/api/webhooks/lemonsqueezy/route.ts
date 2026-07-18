import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { dynamoDb } from "@/lib/dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.DYNAMODB_ASSETS_TABLE || "PolyforgeAssets";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("X-Signature") || "";
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";

    if (!secret) {
      console.error("LEMONSQUEEZY_WEBHOOK_SECRET is not configured.");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;

    if (eventName === "order_created") {
      const orderData = payload.data.attributes;
      const customData = payload.meta.custom_data || {};
      const userId = customData.user_id;
      const assetIds = customData.asset_ids ? customData.asset_ids.split(",") : [];

      if (!userId) {
        console.warn("Order received without user_id in custom data:", payload.data.id);
        return NextResponse.json({ received: true });
      }

      // Save order to DynamoDB
      const orderId = payload.data.id;
      
      const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: `USER#${userId}`,
          SK: `ORDER#${orderId}`,
          id: orderId,
          type: "Order",
          total: orderData.total,
          currency: orderData.currency,
          status: orderData.status,
          assetIds: assetIds,
          receiptUrl: orderData.urls?.receipt,
          createdAt: new Date(orderData.created_at).toISOString(),
        }
      });

      await dynamoDb.send(command);
      console.log(`Order ${orderId} saved for user ${userId}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
