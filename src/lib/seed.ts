import {
  Client,
  ClientNote,
  Commission,
  Notification,
  Product,
  Task,
  User,
} from "@/types";
import { connectToDatabase } from "./mongodb";
import { ObjectId } from "mongodb";

export default async function seedDatabase(userId: ObjectId) {
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection<User>("users").findOne({ _id: userId });
    if (!user) {
      console.error("No user to seed the database with. Make a user first");
      return;
    }

    const clientNum = await db
      .collection<Client>("clients")
      .countDocuments({ advisorId: user._id });
    const commNum = await db
      .collection<Commission>("commissions")
      .countDocuments({ advisorId: user._id });
    if (clientNum + commNum > 0) {
      console.log("Account not empty, not seeding...");
      return;
    }
    await db.collection<Omit<Product, "_id">>("products").insertMany([
      {
        margin: 0.05,
        name: "Life insurance",
        rate: 0.1,
        price: 100000,
      },
      {
        margin: 0.1,
        name: "Retirement Plan",
        rate: 0.02,
        price: 120000,
      },
      {
        margin: 0.08,
        name: "Investment Portfolio",
        rate: 0.05,
        price: 75000,
      },
      {
        margin: 0.1,
        name: "College Savings",
        rate: 0.08,
        price: 85000,
      },
    ]);
    const lifeInsurance = await db
      .collection<Product>("products")
      .findOne({ name: "Life insurance" });
    const retirementPlan = await db
      .collection<Product>("products")
      .findOne({ name: "Retirement Plan" });
    if (!lifeInsurance || !retirementPlan) {
      console.error("Products not found");
      return;
    }

    await db.collection<Omit<Commission, "_id">>("commissions").insertMany([
      {
        advisorId: user._id,
        APE: 2.0,
        payout: 5420,
        productId: lifeInsurance._id,
        receipts: 0,
        status: "pending",
      },
      {
        advisorId: user._id,
        APE: 1.9,
        payout: 6235,
        productId: retirementPlan._id,
        receipts: 0,
        status: "pending",
      },
      {
        advisorId: user._id,
        APE: 1.7,
        payout: 4875,
        productId: lifeInsurance._id,
        receipts: 0,
        status: "pending",
      },
      {
        advisorId: user._id,
        APE: 2.2,
        payout: 7100,
        productId: retirementPlan._id,
        receipts: 0,
        status: "pending",
      },
    ]);
    await db.collection<Omit<Notification, "_id">>("notifications").insertMany([
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
    await db.collection<Omit<Client, "_id">>("clients").insertMany([
      {
        advisorId: user._id,
        name: "Emily Johnson",
        status: "active",
        lastContact: new Date(2024, 10, 20),
        nextAppointment: new Date(2026, 2, 2),
        value: 84500,
        productsIds: [retirementPlan._id, lifeInsurance._id],
        email: "emily@example.com",
        phone: "(555) 123-4567",
      },
      {
        advisorId: user._id,
        name: "Michael Chen",
        status: "active",
        lastContact: new Date(2024, 7, 21),
        nextAppointment: new Date(2026, 1, 2),
        value: 125000,
        productsIds: [lifeInsurance._id],
        email: "michael@example.com",
        phone: "(555) 234-5678",
      },
      {
        advisorId: user._id,
        name: "Sarah Williams",
        status: "prospect",
        lastContact: new Date(2024, 10, 20),
        nextAppointment: new Date(2026, 2, 2),
        value: 0,
        productsIds: [],
        email: "sarah@example.com",
        phone: "(555) 345-6789",
      },
      {
        advisorId: user._id,
        name: "David Miller",
        status: "active",
        lastContact: new Date(2022, 2, 15),
        nextAppointment: new Date(2025, 11, 20),
        value: 56000,
        productsIds: [lifeInsurance._id],
        email: "david@example.com",
        phone: "(555) 456-7890",
      },
      {
        advisorId: user._id,
        name: "Jennifer Lopez",
        status: "inactive",
        lastContact: new Date(2024, 7, 21),
        nextAppointment: new Date(2026, 1, 2),
        value: 32000,
        productsIds: [retirementPlan._id],
        email: "jennifer@example.com",
        phone: "(555) 567-8901",
      },
    ]);
    const emily = await db.collection<Client>("clients").findOne({
      name: "Emily Johnson",
    });
    const sarah = await db.collection<Client>("clients").findOne({
      name: "Sarah Williams",
    });

    if (!emily || !sarah) {
      console.error("Couldn't fetch clients");
      return;
    }

    await db.collection<Omit<ClientNote, "_id">>("clientNotes").insertMany([
      {
        clientId: emily._id,
        ownerId: user._id,
        content:
          "Discussed retirement plan options. Client interested in aggressive growth portfolio.",
        type: "meeting",
      },
      {
        clientId: sarah._id,
        ownerId: user._id,
        content: "Asked about insurance riders for critical illness coverage.",
        type: "email",
      },
      {
        clientId: emily._id,
        ownerId: user._id,
        content:
          "Reviewed college savings plan for twins. Sent 529 plan documentation.",
        type: "call",
      },
    ]);

    await db.collection<Omit<Task, "_id">>("tasks").insertMany([
      {
        clientId: emily._id,
        ownerId: user._id,
        title: "Prepare retirement proposal",
        dueDate: new Date(2026, 1, 1),
        priority: "high",
        completed: false,
      },
      {
        clientId: sarah._id,
        ownerId: user._id,
        title: "Follow up on insurance inquiry",
        dueDate: new Date(2025, 11, 14),
        priority: "medium",
        completed: false,
      },
      {
        clientId: emily._id,
        ownerId: user._id,
        title: "Send college plan documents",
        dueDate: new Date(2026, 3, 4),
        priority: "low",
        completed: true,
      },
    ]);
  } catch (error) {
    console.error("Error while seeding the database:", error);
  }
}
