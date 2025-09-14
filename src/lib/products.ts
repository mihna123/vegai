import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import { Product } from "@/types";

const COLLECTION = "products";

export async function getProductById(productId: ObjectId) {
  try {
    const { db } = await connectToDatabase();
    return await db.collection<Product>(COLLECTION).findOne({ _id: productId });
  } catch (error) {
    console.error("Error while fetching products:", error);
  }
}
