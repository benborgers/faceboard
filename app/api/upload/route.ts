import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import s3 from "../s3";
import mongo from "../mongo";

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

  const response = await s3.send(command);
  console.log("Uploaded to S3", response);

  const url = process.env.S3_PUBLIC_URL + "/" + filename;
  console.log("url", url);

  await mongo.connect();

  const db = mongo.db("test");
  const collection = db.collection("photos");

  await collection.insertOne({ url, created_at: Date.now() });

  return NextResponse.json({ success: true });
};
