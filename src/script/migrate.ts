import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from '../drizzle/connection';

export default {
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle',
  driver: 'pg',
  dbCredentials: { connectionString: process.env.DB_URL! },
} satisfies Config;

(async () => {
    await migrate(db, { migrationsFolder: './src/drizzle'})
  }
)()