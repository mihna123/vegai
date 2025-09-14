import seedDatabase from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await seedDatabase();
    return new NextResponse("Successfuly seeded the db.", { status: 200 });
  } catch (error) {
    return new NextResponse(
      `There has been an error with seeding: ${(error as Error).message}`,
    );
  }
}
