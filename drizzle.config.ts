import { defineConfig } from "drizzle-kit";

const migrationUrl= process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if(!migrationUrl)
{
  throw new Error('DATABASE_URL_UNPOOLED (or DATABASE_URL) is not set in .evn.local')
}



export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  casing: 'snake_case',
  verbose: true,
  strict: true
});
