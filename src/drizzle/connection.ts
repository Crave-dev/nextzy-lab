import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from './schema'

export const client = new Client({
    host: '127.0.0.1',
    port: 5433,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
})

export const db = drizzle(client, {
  schema,
})