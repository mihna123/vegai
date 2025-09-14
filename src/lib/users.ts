import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import { User } from "@/types";

const COLLECTION = "users";

export async function getUserById(id: ObjectId) {
  try {
    const { db } = await connectToDatabase();
    return await db.collection<User>(COLLECTION).findOne({ _id: id });
  } catch (error) {
    console.error("Failed to fetch advisor by id:", error);
  }
}
