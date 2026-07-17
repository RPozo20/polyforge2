import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "@/lib/s3";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";

const TABLE_NAME = process.env.DYNAMODB_ASSETS_TABLE || "PolyforgeAssets";
const BUCKET_NAME = process.env.R2_BUCKET_NAME || "polyforge-assets";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // 1. Authenticate user
    // In production: const session = await getServerSession(authOptions);
    // if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    // 2. Fetch asset to get its objectKey
    const dbResponse = await dynamoDb.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id
      }
    }));
    
    if (!dbResponse.Items || dbResponse.Items.length === 0) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }
    
    const asset = dbResponse.Items[0];
    
    // 3. Verify Ownership
    // In production: Query a Purchases table or check if user is creator
    // if (asset.PK !== `USER#${session.user.id}` && !hasPurchased(session.user.id, asset.id)) {
    //   return NextResponse.json({ error: "Forbidden. You do not own this asset." }, { status: 403 });
    // }
    
    if (!asset.objectKey) {
       return NextResponse.json({ error: "Asset has no source file" }, { status: 404 });
    }

    // 4. Generate short-lived Presigned URL (5 minutes)
    // We add ResponseContentDisposition to force a download instead of displaying in browser
    const filename = asset.title ? asset.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() : "asset";
    const extension = asset.objectKey.split('.').pop() || "zip";
    
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: asset.objectKey,
      ResponseContentDisposition: `attachment; filename="polyforge_${filename}_source.${extension}"`
    });
    
    // 300 seconds = 5 minutes expiration
    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 });
    
    // 5. Redirect the user to the secure download link
    return NextResponse.redirect(signedUrl);
    
  } catch (error) {
    console.error("Error generating secure download URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
