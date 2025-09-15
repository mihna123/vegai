import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import { Client, ClientNote } from "@/types";

const CLIENTS = "clients";

export async function getClientsByAdvisor(advisorId: ObjectId) {
  try {
    const { db } = await connectToDatabase();
    return await db.collection<Client>(CLIENTS).find({ advisorId }).toArray();
  } catch (error) {
    console.error("Error while fetching clients:", error);
  }
}

export async function addNewClient(client: Omit<Client, "_id">) {
  try {
    const { db } = await connectToDatabase();
    const res = await db
      .collection<Omit<Client, "_id">>(CLIENTS)
      .insertOne(client);
    const newClient = await db
      .collection<Client>(CLIENTS)
      .findOne({ _id: res.insertedId });
    if (!newClient) {
      console.error("Error while fetching created client");
      return null;
    }
    return newClient;
  } catch (error) {
    console.error("Error while creating client:", error);
  }
}

export async function updateClient(
  clientId: ObjectId,
  update: Partial<Omit<Client, "_id">>,
) {
  try {
    const { db } = await connectToDatabase();
    const res = await db
      .collection<Client>(CLIENTS)
      .updateOne({ _id: clientId }, { $set: update });
    if (res.modifiedCount === 0) return null;
    return await db.collection<Client>(CLIENTS).findOne({ _id: clientId });
  } catch (error) {
    console.error("Error while updating tasks:", error);
  }
}
