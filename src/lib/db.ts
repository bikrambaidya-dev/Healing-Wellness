import "@/lib/dns-fix";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Cached across hot-reloads in dev and across invocations in serverless —
// without this, every request would open a new connection to Atlas.
const globalForMongoose = globalThis as unknown as { _mongoose?: MongooseCache };
const cache: MongooseCache = globalForMongoose._mongoose ?? { conn: null, promise: null };
globalForMongoose._mongoose = cache;

export async function dbConnect() {
  if (cache.conn) return cache.conn;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local.");
  }
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI).catch((err) => {
      cache.promise = null; // don't cache a failed attempt — let the next call retry
      throw err;
    });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
