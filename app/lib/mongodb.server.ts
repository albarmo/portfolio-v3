import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "portfolio";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

// Reuse connection across hot-reloads in development
const g = global as typeof globalThis & { __mongoClient?: MongoClient };

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  if (!g.__mongoClient) {
    g.__mongoClient = new MongoClient(MONGODB_URI);
  }
  client = g.__mongoClient;
} else {
  client = new MongoClient(MONGODB_URI);
}

export async function getDb(): Promise<Db> {
  await client.connect();
  return client.db(DB_NAME);
}
