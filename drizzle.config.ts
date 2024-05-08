import type { Config } from "drizzle-kit";

export default {
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle",
  driver: 'pg',
  dbCredentials: { 
    host: '127.0.0.1',
    port: 5433,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
  },
  strict: true,
  verbose: true,
} satisfies Config;