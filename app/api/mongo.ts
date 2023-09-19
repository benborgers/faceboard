import { MongoClient } from "mongodb";

const mongo = new MongoClient(process.env.MONGO_URL!);

export default mongo;
