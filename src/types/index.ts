import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  email: string;
  role: "advisor" | "introducer" | "manager" | "esmanager";
};

interface UserClient extends Omit<User, "_id"> {
  _id: string;
}
