import { getNotesByAdvisor } from "@/lib/clients";
import { ClientNote } from "@/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export type NotesApiGetResponse = {
  notes?: ClientNote[];
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user");
    if (!userId || userId.length === 0) {
      console.error("No user id in the url");
      return new NextResponse("No user id in the url", { status: 400 });
    }
    const notes = await getNotesByAdvisor(new ObjectId(userId));

    return NextResponse.json<NotesApiGetResponse>({ notes }, { status: 200 });
  } catch (error) {
    console.error("Error while fetching notes:", error);
    return new NextResponse(
      `Error while fetching notes: ${(error as Error).message}`,
      { status: 500 },
    );
  }
}
