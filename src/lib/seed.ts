import { Commission, Notification, Product, User } from "@/types";
import { connectToDatabase } from "./mongodb";

export default async function seedDatabase() {
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection<User>("users").find().next();
    if (!user) {
      console.error("No user to seed the database with. Make a user first");
      return;
    }
    const res = await db
      .collection<Omit<Product, "_id">>("products")
      .insertOne({
        margin: 0.05,
        name: "Life insurance",
        rate: 0.1,
        price: 100000,
      });
    const product = await db
      .collection<Product>("products")
      .findOne({ _id: res.insertedId });
    if (!product) {
      console.error("Product not found");
      return;
    }

    await db.collection<Omit<Commission, "_id">>("commissions").insertMany([
      {
        advisorId: user._id,
        APE: 2.0,
        payout: 5420,
        productId: product._id,
        receipts: 0,
        status: "pending",
      },
      {
        advisorId: user._id,
        APE: 1.9,
        payout: 6235,
        productId: product._id,
        receipts: 0,
        status: "pending",
      },
      {
        advisorId: user._id,
        APE: 1.7,
        payout: 4875,
        productId: product._id,
        receipts: 0,
        status: "pending",
      },
      {
        advisorId: user._id,
        APE: 2.2,
        payout: 7100,
        productId: product._id,
        receipts: 0,
        status: "pending",
      },
    ]);
    await db.collection<Notification>("notifications").insertMany([
      {
        userId: user._id,
        title: "New Message",
        message: "Client Sarah Johnson responded to your proposal",
        read: false,
      },
      {
        userId: user._id,
        title: "Payment Processed",
        message: "Your commission for policy #4892 has been approved",
        read: false,
      },
      {
        userId: user._id,
        title: "Meeting Reminder",
        message: "Meeting with David Miller in 30 minutes",
        read: true,
      },
    ]);
    const commissions = await db.collection("commissions").find().toArray();
    console.log(commissions);
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}
