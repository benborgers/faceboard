import { NextResponse } from "next/server";
import mongo from "../mongo";

export const POST = async (req: Request) => {
  const body = await req.json();

  await mongo.connect();
  const db = mongo.db("test");

  await db.collection("questions").insertOne({ title: body.question });

  return NextResponse.json({ success: true });
};
