import { S3Client } from "@aws-sdk/client-s3";

// Configure the S3 client to connect to Cloudflare R2
export const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT_URL || "", // e.g. https://<ACCOUNT_ID>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});
