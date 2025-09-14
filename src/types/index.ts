import { ObjectId } from "mongodb";

export type UserRole = "advisor" | "introducer" | "manager" | "esmanager";

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
