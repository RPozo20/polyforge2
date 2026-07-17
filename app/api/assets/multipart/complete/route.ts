import { NextRequest, NextResponse } from "next/server";
import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import { r2Client } from "@/lib/s3";

export async function POST(req: NextRequest) {
  try {
    const { objectKey, uploadId, parts } = await req.json();
    if (!objectKey || !uploadId || !parts) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    parts.sort((a: any, b: any) => a.PartNumber - b.PartNumber);
    
    const command = new CompleteMultipartUploadCommand({
      Bucket: process.env.R2_BUCKET_NAME || "polyforge-assets",
      Key: objectKey,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts
      }
    });
    
    const result = await r2Client.send(command);
    return NextResponse.json({ success: true, location: result.Location });
  } catch (error: any) {
    console.error("Error completing multipart upload:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
