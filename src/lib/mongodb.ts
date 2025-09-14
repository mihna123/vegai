import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB || "tickets"; // Default DB name

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local or similar",
  );
}

let client: MongoClient;
let clientPromiseInternal: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // @ts-expect-error global is used here for HMR persistence
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    // @ts-expect-error global is used here for HMR persistence
    global._mongoClientPromise = client.connect();
  }
  // @ts-expect-error global is used here for HMR persistence
  clientPromiseInternal = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromiseInternal = client.connect();
}

export const clientPromise: Promise<MongoClient> = clientPromiseInternal;

export async function connectToDatabase(): Promise<{
  db: Db;
  client: MongoClient;
}> {
  try {
    const connectedClient = await clientPromise; // Use the shared promise
    const db = connectedClient.db(MONGODB_DB_NAME);
    return { db, client: connectedClient };
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    // Ensure the error is re-thrown or handled appropriately
    // For instance, if clientPromise itself rejects, this await will throw.
    // If an error occurs after connection (e.g., db name issue), it's caught here.
    throw new Error("Failed to connect to database or access specified DB");
  }
}
