const { S3Client, PutBucketCorsCommand } = require("@aws-sdk/client-s3");

const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT_URL || "",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

const command = new PutBucketCorsCommand({
  Bucket: process.env.R2_BUCKET_NAME || "polyforge-assets",
  CORSConfiguration: {
    CORSRules: [
      {
        AllowedHeaders: ["*"],
        AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
        AllowedOrigins: ["*"],
        ExposeHeaders: ["ETag"], // CRITICAL FOR MULTIPART UPLOAD
        MaxAgeSeconds: 3600,
      },
    ],
  },
});

async function setup() {
  try {
    console.log("Applying CORS configuration to R2 bucket...");
    await r2Client.send(command);
    console.log("CORS configuration applied successfully! ETag is now exposed.");
  } catch (err) {
    console.error("Failed to apply CORS config:", err);
  }
}

setup();
