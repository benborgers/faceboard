import { NextResponse } from "next/server";
import mongo from "../mongo";

export const GET = async (req: Request) => {
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
