import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema.js";
import * as relations from "./schema.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}
const sql = postgres(databaseUrl);

export const db = drizzle(sql, {
  schema: {
    ...schema,
    ...relations,
  },
});
