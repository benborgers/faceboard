import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  endpoint: process.env.S3_ENDPOINT!,
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const photo = formData.get("photo") as File;

  const filename = Date.now() + "-" + photo.name;

  const command = new PutObjectCommand({
    Bucket: "faceboard",
    Key: filename,
    Body: Buffer.from(await photo.arrayBuffer()),
    ContentType: photo.type,
    ACL: "public-read",
  });

  const response = await client.send(command);
  console.log("Uploaded to S3", response);

  const url = process.env.S3_PUBLIC_URL + filename;

  console.log("url", url);

  return NextResponse.json({ success: true });
};
