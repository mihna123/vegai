import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import { Commission, Product } from "@/types";
import { getProductById } from "./products";

const COLLECTION = "commissions";
const ROLE_SPLITS = {
  ADVISOR: 0.6,
  MANAGER: 0.2,
  EXECUTIVE: 0.2,
};
export async function getCommissionsByAdvisor(advisorId: ObjectId) {
  try {
    const { db } = await connectToDatabase();
    const commissions = await db
      .collection<Commission>(COLLECTION)
      .find({ advisorId })
      .toArray();
    return commissions;
  } catch (error) {
    console.error("Error while fetching commissions:", error);
  }
}

export async function calculateCommission(
  productId: ObjectId,
  APE: number,
  receipts: number,
  threshold = 2.0,
) {
  const product = await getProductById(productId);
  if (!product) {
    return;
  }
  const base =
    receipts <= threshold * APE ? APE * product.rate : receipts * product.rate;
  const afterMargin = base * (1 - product.margin);

  const payout = {
    advisor: afterMargin * ROLE_SPLITS.ADVISOR,
    manager: afterMargin * ROLE_SPLITS.MANAGER,
    executive: afterMargin * ROLE_SPLITS.EXECUTIVE,
  };

  return { product, base, afterMargin, payout };
}
