import { addNewClient, getClientsByAdvisor } from "@/lib/clients";
import { getProductsByIds } from "@/lib/products";
import { Client, Product } from "@/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export type ClientsApiResponse = {
  clients?: Client[];
  products?: Product[];
};

export type ClientsApiPostBody = {
  client: Omit<Client, "_id">;
};

export type ClientsApiPostResonse = {
  client: Client;
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

    return NextResponse.json<ClientsApiResponse>(
      { clients, products },
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

export async function POST(request: NextRequest) {
  try {
    const { client } = (await request.json()) as ClientsApiPostBody;
    const res = await addNewClient({
      ...client,
      advisorId: new ObjectId(client.advisorId),
    });
    if (!res) {
      return new NextResponse("Error while creating a client.", {
        status: 500,
      });
    }
    return NextResponse.json<ClientsApiPostResonse>(
      { client: res },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error while creating a client:", error);
    return new NextResponse(
      `Error while creating a client: ${(error as Error).message}`,
      { status: 500 },
    );
  }
}
