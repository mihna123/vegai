import { Task } from "@/types";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";

const TASKS = "tasks";

export async function getTasksByUser(ownerId: ObjectId) {
  try {
    const { db } = await connectToDatabase();
    return await db.collection<Task>(TASKS).find({ ownerId }).toArray();
  } catch (error) {
    console.error("Error while fetching tasks:", error);
  }
}

export async function addNewTask(task: Omit<Task, "_id">) {
  try {
    const { db } = await connectToDatabase();
    const res = await db.collection<Omit<Task, "_id">>(TASKS).insertOne(task);
    return await db.collection<Task>(TASKS).findOne({ _id: res.insertedId });
  } catch (error) {
    console.error("Error while adding tasks:", error);
  }
}

export async function updateTask(
  taskId: ObjectId,
  update: Partial<Omit<Task, "_id">>,
) {
  try {
    const { db } = await connectToDatabase();
    const res = await db
      .collection<Task>(TASKS)
      .updateOne({ _id: taskId }, { $set: update });
    if (res.modifiedCount === 0) return null;
    return await db.collection<Task>(TASKS).findOne({ _id: taskId });
  } catch (error) {
    console.error("Error while updating tasks:", error);
  }
}
