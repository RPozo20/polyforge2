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
      return NextResponse.json({ error: "Total amount must be greater than 0" }, { status: 400 });
    }

    // Extract asset IDs to store in custom data
    const assetIds = items.map((i: any) => i.asset.id).join(",");

    // Create checkout
    const { error, data } = await createCheckout(storeId, variantId, {
      checkoutData: {
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
