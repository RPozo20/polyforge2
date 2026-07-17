import { NextRequest, NextResponse } from "next/server";
import { UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "@/lib/s3";

export async function POST(req: NextRequest) {
  try {
    const { objectKey, uploadId, partNumber } = await req.json();
    if (!objectKey || !uploadId || !partNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const command = new UploadPartCommand({
      Bucket: process.env.R2_BUCKET_NAME || "polyforge-assets",
      Key: objectKey,
      UploadId: uploadId,
      PartNumber: partNumber,
    });
    
    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error signing multipart part:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
