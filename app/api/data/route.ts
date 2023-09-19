import { NextResponse } from "next/server";
import mongo from "../mongo";

export const revalidate = 0;

export const GET = async () => {
  await mongo.connect();

  const db = mongo.db("test");
  const photos = await db
    .collection("photos")
    .find()
    .sort({ created_at: -1 })
    .toArray();

  const settings = await db.collection("settings").findOne();

  return NextResponse.json({ settings, photos });
};
