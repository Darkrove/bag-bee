import {
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

/**
 * This is a sample schema.
 * Replace this with your own schema and then run migrations.
 */

export const sales = mysqlTable("sales", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address"),
  productCategory: text("product_category").notNull(),
  quantity: int("quantity").notNull(),
  amount: int("amount").notNull(),
  code: text("code").notNull(),
  profit: int("profit").notNull(),
  dealerCode: text("dealer_code"),
  paymentMode: text("payment_mode"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
