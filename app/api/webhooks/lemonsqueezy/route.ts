import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { dynamoDb } from "@/lib/dynamodb";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

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
      const orderId = customData.order_id; // Our generated order ID

      if (!userId || !orderId) {
        console.warn("Order received without user_id or order_id in custom data:", payload.data.id);
        return NextResponse.json({ received: true });
      }

      // Update the existing pending order in DynamoDB to "paid"
      const command = new UpdateCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: `USER#${userId}`,
          SK: `ORDER#${orderId}`,
        },
        UpdateExpression: "SET #st = :status, receiptUrl = :receipt, lemonSqueezyId = :lsId, updatedAt = :updatedAt",
        ExpressionAttributeNames: {
          "#st": "status",
        },
        ExpressionAttributeValues: {
          ":status": "paid",
          ":receipt": orderData.urls?.receipt || null,
          ":lsId": payload.data.id,
          ":updatedAt": new Date().toISOString(),
        }
      });

      await dynamoDb.send(command);
      console.log(`Order ${orderId} marked as paid for user ${userId}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
