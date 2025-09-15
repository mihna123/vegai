import { getNotesByAdvisor } from "@/lib/notes";
import { addNewNote } from "@/lib/notes";
import { ClientNote } from "@/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export type NotesApiGetResponse = {
  notes?: ClientNote[];
};

export type NotesApiPostBody = {
  note: Omit<ClientNote, "_id">;
};

export type NotesApiPostResponse = {
  note: ClientNote;
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

export async function POST(request: NextRequest) {
  try {
    const { note } = (await request.json()) as NotesApiPostBody;
    const res = await addNewNote(note);
    if (!res) {
      return new NextResponse("Error while creating a note.", { status: 500 });
    }
    return NextResponse.json<NotesApiPostResponse>(
      { note: res },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error while creating a note:", error);
    return new NextResponse(
      `Error while creating a note: ${(error as Error).message}`,
      { status: 500 },
    );
  }
}
