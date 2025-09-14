"use server";

import { auth } from "@/auth";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";

export async function requireRole(roles: UserRole[]) {
  const session = await auth();

  if (!session?.user || !roles.includes(session.user?.role as UserRole)) {
    redirect("/");
  }

  return session;
}
