"use server";

import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";
import { Commission } from "@/types";
import { getProductById } from "./products";

const COLLECTION = "commissions";
const ROLE_SPLITS = {
  ADVISOR: 0.6,
  MANAGER: 0.2,
  EXECUTIVE: 0.2,
};

export async function getAllCommissions() {
  try {
    const { db } = await connectToDatabase();
    const commissions = await db
      .collection<Commission>(COLLECTION)
      .find({})
      .toArray();
    return commissions;
  } catch (error) {
    console.error("Error while fetching commissions:", error);
  }
}

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

export async function approveCommission(commissionId: ObjectId) {
  try {
    const { db } = await connectToDatabase();
    const res = await db
      .collection<Commission>(COLLECTION)
      .updateOne({ _id: commissionId }, { $set: { status: "approved" } });
    return res.modifiedCount > 1;
  } catch (error) {
    console.error("Error while updating a commission:", error);
    return false;
  }
}
