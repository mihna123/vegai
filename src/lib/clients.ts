import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import { Client, ClientNote } from "@/types";

const CLIENTS = "clients";
const NOTES = "clientNotes";

export async function getClientsByAdvisor(advisorId: ObjectId) {
  try {
    const { db } = await connectToDatabase();
    return await db.collection<Client>(CLIENTS).find({ advisorId }).toArray();
  } catch (error) {
    console.error("Error while fetching clients:", error);
  }
}

export async function getNotesByAdvisor(ownerId: ObjectId) {
  try {
    const { db } = await connectToDatabase();
    return await db.collection<ClientNote>(NOTES).find({ ownerId }).toArray();
  } catch (error) {
    console.error("Error while fetching notes:", error);
  }
}
