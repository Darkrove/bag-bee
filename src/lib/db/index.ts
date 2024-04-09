import "dotenv/config"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined")
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const connectionString = process.env.DATABASE_URL
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client)
