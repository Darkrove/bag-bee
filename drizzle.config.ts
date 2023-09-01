import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config()

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  breakpoints: true,
} satisfies Config
