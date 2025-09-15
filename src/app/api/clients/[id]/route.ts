import { updateClient } from "@/lib/clients";
import { Client } from "@/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export type ClientsApiPutBody = {
  update: Partial<Omit<Client, "_id">>;
};

export type ClientsApiPutResponse = {
  client: Client;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { update } = (await request.json()) as ClientsApiPutBody;
    console.log(update);
    const res = await updateClient(new ObjectId(id), {
      ...update,
      advisorId: new ObjectId(update.advisorId),
    });
    if (!res) {
      return new NextResponse("There has been an error with client update", {
        status: 500,
      });
    }
    return NextResponse.json<ClientsApiPutResponse>(
      { client: res },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error while updating a client:", error);
    return new NextResponse(
      `Error while updating a client: ${(error as Error).message}`,
      { status: 500 },
    );
  }
}
