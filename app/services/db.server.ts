import { MongoClient, type Db } from "mongodb";
import { env } from "@/services/env.server";

const DB_NAME = "portfolio";

// Reuse the client across dev hot reloads so connections are not leaked
const globalForMongo = global as typeof globalThis & { __mongoClient?: MongoClient };

const client = env.isProduction
  ? new MongoClient(env.mongodbUri)
  : (globalForMongo.__mongoClient ??= new MongoClient(env.mongodbUri));

export async function getDb(): Promise<Db> {
  await client.connect();
  return client.db(DB_NAME);
}
