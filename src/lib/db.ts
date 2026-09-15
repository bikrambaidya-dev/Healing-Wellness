import dns from "dns";
import mongoose from "mongoose";

// On some Windows/VPN setups, Node's built-in resolver picks up a local
// stub (127.0.0.1) that refuses the raw DNS queries the `mongodb+srv://`
// scheme needs for its SRV/TXT lookups, even though the OS resolver works
// fine. Pointing Node at a public resolver avoids that mismatch.
dns.setServers(["8.8.8.8", "1.1.1.1", ...dns.getServers()]);

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
    cache.promise = mongoose.connect(MONGODB_URI);
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
