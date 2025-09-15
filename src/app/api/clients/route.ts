import { getClientsByAdvisor, getNotesByAdvisor } from "@/lib/clients";
import { getProductsByIds } from "@/lib/products";
import { getTasksByUser } from "@/lib/tasks";
import { Client, ClientNote, Product, Task } from "@/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export type ClientsApiResponse = {
  clients?: Client[];
  clientNotes?: ClientNote[];
  tasks?: Task[];
  products?: Product[];
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user");
    if (!userId || userId.length === 0) {
      console.error("No user id in the url");
      return new NextResponse("No user id in the url", { status: 400 });
    }
    const userObjectId = new ObjectId(userId);
    const clients = await getClientsByAdvisor(userObjectId);
    const productIds = new Set<ObjectId>();
    clients?.forEach((c) => {
      c.productsIds.forEach((id) => productIds.add(id));
    });
    const products = await getProductsByIds(Array.from(productIds));
    const clientNotes = await getNotesByAdvisor(userObjectId);
    const tasks = await getTasksByUser(userObjectId);

    return NextResponse.json<ClientsApiResponse>(
      { clients, clientNotes, tasks, products },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error while fetching clients:", error);
    return new NextResponse(
      `Error while fetching clients: ${(error as Error).message}`,
      { status: 500 },
    );
  }
}
