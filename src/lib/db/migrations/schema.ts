import { pgTable, pgEnum, serial, text, integer, timestamp, uniqueIndex, index, varchar, date } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])
export const equalityOp = pgEnum("equality_op", ['in', 'gte', 'gt', 'lte', 'lt', 'neq', 'eq'])
export const action = pgEnum("action", ['ERROR', 'TRUNCATE', 'DELETE', 'UPDATE', 'INSERT'])
export const role = pgEnum("role", ['USER', 'ADMIN'])


export const invoice = pgTable("invoice", {
	id: serial("id").primaryKey().notNull(),
	customerName: text("customer_name"),
	customerPhone: text("customer_phone").notNull(),
	customerAddress: text("customer_address"),
	cashierName: text("cashier_name").notNull(),
	totalAmount: integer("total_amount").notNull(),
	totalProfit: integer("total_profit").notNull(),
	totalQuantity: integer("total_quantity").notNull(),
	paymentMode: text("payment_mode"),
	warrantyPeriod: integer("warranty_period").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const invoiceItems = pgTable("invoice_items", {
	id: serial("id").primaryKey().notNull(),
	invoiceId: integer("invoice_id").notNull(),
	productCategory: text("product_category").notNull(),
	note: text("note"),
	quantity: integer("quantity").notNull(),
	price: integer("price").notNull(),
	amount: integer("amount").notNull(),
	code: text("code").notNull(),
	profit: integer("profit").notNull(),
	dealerCode: text("dealer_code"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const sales = pgTable("sales", {
	id: serial("id").primaryKey().notNull(),
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
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	expires: date("expires").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		sessionTokenIdx: uniqueIndex("sessions__sessionToken__idx").on(table.sessionToken),
		userIdIdx: index("sessions__userId__idx").on(table.userId),
	}
});

export const users = pgTable("users", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	name: varchar("name", { length: 191 }),
	email: varchar("email", { length: 191 }),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: varchar("image", { length: 191 }),
	role: role("role"),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		emailIdx: uniqueIndex("users__email__idx").on(table.email),
	}
});

export const verificationTokens = pgTable("verification_tokens", {
	identifier: varchar("identifier", { length: 191 }).primaryKey().notNull(),
	token: varchar("token", { length: 191 }).notNull(),
	expires: date("expires").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		tokenIdx: uniqueIndex("verification_tokens__token__idx").on(table.token),
	}
});