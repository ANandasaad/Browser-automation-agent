import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

import type { NeonHttpDatabase } from "drizzle-orm/neon-http";

let _db: NeonHttpDatabase<typeof schema> | null = null

export function getDb() {
  if (!_db) {
    const sql = neon(process.env.DATABASE_URL!);
    _db = drizzle({ client: sql, schema });
  }
  return _db
}
