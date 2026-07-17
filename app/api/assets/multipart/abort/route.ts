import { NextRequest, NextResponse } from "next/server";
import { AbortMultipartUploadCommand } from "@aws-sdk/client-s3";
import { r2Client } from "@/lib/s3";

export async function POST(req: NextRequest) {
  try {
    const { objectKey, uploadId } = await req.json();
    if (!objectKey || !uploadId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const command = new AbortMultipartUploadCommand({
      Bucket: process.env.R2_BUCKET_NAME || "polyforge-assets",
      Key: objectKey,
      UploadId: uploadId,
    });
    
    await r2Client.send(command);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error aborting multipart upload:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
