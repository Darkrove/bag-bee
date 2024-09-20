import { relations } from "drizzle-orm"
import {
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "next-auth/adapters"

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)

export const roleEnum = pgEnum("role", ["ADMIN", "USER"])

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: roleEnum("role").default("USER"),
})

export const sales = pgTable("sales", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address"),
  productCategory: text("product_category").notNull(),
  quantity: integer("quantity").notNull(),
  amount: integer("amount").notNull(),
  code: text("code").notNull(),
  profit: integer("profit").notNull(),
  dealerCode: text("dealer_code"),
  paymentMode: text("payment_mode"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const invoice = pgTable("invoice", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address"),
  cashierName: text("cashier_name").notNull(),
  totalAmount: integer("total_amount").notNull(),
  totalProfit: integer("total_profit").notNull(),
  totalQuantity: integer("total_quantity").notNull(),
  paymentMode: text("payment_mode"),
  warrantyPeriod: integer("warranty_period").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const invoiceRelations = relations(invoice, ({ many }) => ({
  items: many(invoiceItems),
}))

export const invoiceItems = pgTable("invoice_items", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull(),
  productCategory: text("product_category").notNull(),
  note: text("note"),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  amount: integer("amount").notNull(),
  code: text("code").notNull(),
  profit: integer("profit").notNull(),
  dealerCode: text("dealer_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const invoiceItemsRelations = relations(invoiceItems, ({ one }) => ({
  invoice: one(invoice, {
    fields: [invoiceItems.invoiceId],
    references: [invoice.id],
  }),
}))
