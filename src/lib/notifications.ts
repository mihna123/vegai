import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import { Notification } from "@/types";

const COLLECTION = "notifications";

export async function getNotificationsForUser(userId: ObjectId) {
  try {
    const { db } = await connectToDatabase();
    return await db
      .collection<Notification>(COLLECTION)
      .find({ userId })
      .toArray();
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
  }
}
