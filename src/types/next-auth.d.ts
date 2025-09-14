import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string;
  }
}
