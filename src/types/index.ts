import { ObjectId } from "mongodb";

export type UserRole =
  | "client"
  | "advisor"
  | "introducer"
  | "manager"
  | "esmanager"
  | "admin";

export type User = {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  role: UserRole;
};

export interface UserClient extends Omit<User, "_id"> {
  _id: string;
}

export type Product = {
  _id: ObjectId;
  name: string;
  rate: number;
  margin: number;
  price: number;
};

export type Commission = {
  _id: ObjectId;
  advisorId: ObjectId; // reference to the user
  productId: ObjectId;
  APE: number;
  receipts: number;
  payout: number;
  status: "pending" | "approved" | "denied";
};

export type PerformanceMetric = {
  _id: ObjectId;
  name: string;
  value: number;
  target: number;
  trend: "stable" | "up" | "down";
};

export type Notification = {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  message: string;
  read: boolean;
};

export type ClientStatus = "active" | "prospect" | "inactive";

export type Client = {
  _id: ObjectId;
  advisorId: ObjectId;
  name: string;
  status: ClientStatus;
  lastContact: Date;
  nextAppointment: Date;
  value: number;
  productsIds: ObjectId[];
  email: string;
  phone: string;
};

export type ClientClient = {
  _id: string;
  advisorId: string;
  name: string;
  status: ClientStatus;
  lastContact: string;
  nextAppointment: string;
  value: number;
  productsIds: string[];
  email: string;
  phone: string;
};

export type ClientNoteType = "meeting" | "call" | "email" | "note";

export type ClientNote = {
  _id: ObjectId;
  clientId: ObjectId;
  ownerId: ObjectId;
  content: string;
  type: ClientNoteType;
};

export type ClientNoteClient = {
  _id: string;
  clientId: string;
  ownerId: string;
  content: string;
  type: ClientNoteType;
};

export type TaskPriority = "high" | "medium" | "low";

export type Task = {
  _id: ObjectId;
  clientId: ObjectId;
  ownerId: ObjectId;
  title: string;
  dueDate: Date;
  priority: TaskPriority;
  completed: boolean;
};

export type ClientTask = {
  _id: string;
  clientId: string;
  ownerId: string;
  title: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
};
