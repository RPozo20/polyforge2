import { NextRequest, NextResponse } from "next/server";
import { configureLemonSqueezy } from "@/lib/lemonsqueezy";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { Asset } from "@/lib/mock/assets";

// Configure SDK
configureLemonSqueezy();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await req.json();
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    // You need to create a "Pay what you want" or custom price product in Lemon Squeezy
    // and provide its Variant ID here.
    const variantId = process.env.LEMONSQUEEZY_VARIANT_ID; 

    if (!storeId || !variantId) {
      return NextResponse.json(
        { error: "Lemon Squeezy store or variant ID not configured." },
        { status: 500 }
      );
    }

    // Calculate total in cents (Lemon Squeezy expects cents)
    const totalAmountCents = items.reduce(
      (sum: number, item: any) => sum + Math.round(item.asset.price * 100) * item.quantity,
      0
    );

    if (totalAmountCents === 0) {
      // Free cart - Bypass Lemon Squeezy and create order directly
      const { dynamoDb } = await import("@/lib/dynamodb");
      const { PutCommand } = await import("@aws-sdk/lib-dynamodb");
      const { v4: uuidv4 } = await import("uuid");
      
      const orderId = `free_${uuidv4()}`;
      const TABLE_NAME = process.env.DYNAMODB_ASSETS_TABLE || "PolyforgeAssets";
      const assetIdsArray = items.map((i: any) => i.asset.id);
      
      const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: `USER#${session.user.id}`,
          SK: `ORDER#${orderId}`,
          id: orderId,
          type: "Order",
          total: 0,
          currency: "USD",
          status: "paid", // Automatically paid since it's free
          assetIds: assetIdsArray,
          createdAt: new Date().toISOString(),
        }
      });
      
      await dynamoDb.send(command);
      
      // Return a URL pointing to the user's library instead of Lemon Squeezy
      return NextResponse.json({ url: "/dashboard/assets?success=free_order" });
    }

    // Extract asset IDs to store in custom data
    const assetIds = items.map((i: any) => i.asset.id).join(",");

    // Create checkout
    const { error, data } = await createCheckout(storeId, variantId, {
      checkoutData: {
        // @ts-ignore - customPrice is supported by the Lemon Squeezy API but missing from SDK types
        customPrice: totalAmountCents,
        email: session.user.email || "",
        name: session.user.name || "",
        custom: {
          user_id: session.user.id,
          asset_ids: assetIds,
        },
      },
      productOptions: {
        name: `Polyforge Purchase (${items.length} item${items.length > 1 ? "s" : ""})`,
        description: items.map((i: any) => i.asset.title).join(", "),
        receiptButtonText: "Return to Polyforge",
        receiptLinkUrl: `${process.env.NEXTAUTH_URL}/dashboard/assets`,
      },
    });

    if (error) {
      console.error("Lemon Squeezy checkout error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ url: data?.data?.attributes?.url });
  } catch (error: any) {
    console.error("Checkout API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
