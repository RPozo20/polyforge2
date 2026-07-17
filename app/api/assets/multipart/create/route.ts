import { NextRequest, NextResponse } from "next/server";
import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";
import { r2Client } from "@/lib/s3";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { filename, contentType } = await req.json();
    if (!filename || !contentType) {
      return NextResponse.json({ error: "Missing filename or contentType" }, { status: 400 });
    }
    const extension = filename.split(".").pop();
    const objectKey = `assets/${uuidv4()}.${extension}`;
    
    const command = new CreateMultipartUploadCommand({
      Bucket: process.env.R2_BUCKET_NAME || "polyforge-assets",
      Key: objectKey,
      ContentType: contentType,
    });
    const result = await r2Client.send(command);
    return NextResponse.json({ uploadId: result.UploadId, objectKey });
  } catch (error) {
    console.error("Error creating multipart upload:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
