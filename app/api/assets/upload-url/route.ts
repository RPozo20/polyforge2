import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "@/lib/s3";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Assuming you have authOptions exported from here

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { filename, contentType } = await req.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: "Missing filename or contentType" }, { status: 400 });
    }

    // Generate unique object key
    const extension = filename.split(".").pop();
    const objectKey = `assets/${uuidv4()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "polyforge-assets",
      Key: objectKey,
      ContentType: contentType,
      // Metadata: { userId: session.user.id }
    });

    // The presigned URL expires in 3600 seconds (1 hour)
    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });

    return NextResponse.json({ 
      uploadUrl: signedUrl,
      objectKey: objectKey 
    });

  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
