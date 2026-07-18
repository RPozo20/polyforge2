import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "@/lib/s3";

const BUCKET_NAME = process.env.R2_BUCKET_NAME || "polyforge-assets";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");
    
    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    
    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
    return NextResponse.redirect(signedUrl);
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
