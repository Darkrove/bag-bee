import { InferModel } from "drizzle-orm"

import { invoiceItems } from "@/lib/db/schema"

type InvoiceItems = InferModel<typeof invoiceItems>

export interface Item {
  code: string
  productCategory: string
  note?: string
  quantity: string
  price: string
  amount: string
  profit: string
  dealerCode: string
}

export interface Invoice {
  id: number
  customerName: string | null
  customerPhone: string
  customerAddress: string | null
  cashierName: string
  totalAmount: number
  totalProfit: number
  totalQuantity: number
  paymentMode: string | null
  warrantyPeriod: number
  createdAt: Date
  updatedAt: Date
  items: InvoiceItems[]
}

export const INVOICE_DATA: Invoice = {
  id: 0,
  customerName: null,
  customerPhone: "",
  customerAddress: null,
  cashierName: "",
  totalAmount: 0,
  totalProfit: 0,
  totalQuantity: 0,
  paymentMode: null,
  warrantyPeriod: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  items: [],
}
