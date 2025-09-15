import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import { ClientNote } from "@/types";

const NOTES = "clientNotes";
export async function getNotesByAdvisor(ownerId: ObjectId) {
  try {
    const { db } = await connectToDatabase();
    return await db.collection<ClientNote>(NOTES).find({ ownerId }).toArray();
  } catch (error) {
    console.error("Error while fetching notes:", error);
  }
}

export async function addNewNote(note: Omit<ClientNote, "_id">) {
  try {
    const { db } = await connectToDatabase();
    const res = await db
      .collection<Omit<ClientNote, "_id">>(NOTES)
      .insertOne(note);
    return await db
      .collection<ClientNote>(NOTES)
      .findOne({ _id: res.insertedId });
  } catch (error) {
    console.error("Error while adding tasks:", error);
  }
}
