"use server";

import { auth } from "@/auth";
import { UserRole } from "@/types";
import { signIn } from "next-auth/react";

export async function requireRole(role: UserRole) {
  const session = await auth();

  if (!session?.user || session.user.role !== role) {
    await signIn("google");
  }

  return session;
}
