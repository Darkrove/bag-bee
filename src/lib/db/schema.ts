import { relations } from "drizzle-orm"
import {
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"

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

export const accounts = pgTable(
  "accounts",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    type: varchar("type", { length: 191 }).notNull(),
    provider: varchar("provider", { length: 191 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
    access_token: text("access_token"),
    expires_in: integer("expires_in"),
    id_token: text("id_token"),
    refresh_token: text("refresh_token"),
    refresh_token_expires_in: integer("refresh_token_expires_in"),
    scope: varchar("scope", { length: 191 }),
    token_type: varchar("token_type", { length: 191 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      "accounts__provider__providerAccountId__idx"
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index("accounts__userId__idx").on(account.userId),
  })
)

export const sessions = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    expires: date("expires").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (session) => ({
    sessionTokenIndex: uniqueIndex("sessions__sessionToken__idx").on(
      session.sessionToken
    ),
    userIdIndex: index("sessions__userId__idx").on(session.userId),
  })
)
export const roleEnum = pgEnum("role", ["ADMIN", "USER"])
export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    name: varchar("name", { length: 191 }),
    email: varchar("email", { length: 191 }).notNull(),
    emailVerified: timestamp("emailVerified"),
    image: varchar("image", { length: 191 }),
    role: roleEnum('role').default("USER"),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex("users__email__idx").on(user.email),
  })
)

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 191 }).primaryKey().notNull(),
    token: varchar("token", { length: 191 }).notNull(),
    expires: date("expires").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (verificationToken) => ({
    tokenIndex: uniqueIndex("verification_tokens__token__idx").on(
      verificationToken.token
    ),
  })
)

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
