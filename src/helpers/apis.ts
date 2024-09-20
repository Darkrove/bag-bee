import type { Invoice, Item } from "@/store/item-data"
import { InferModel, eq } from "drizzle-orm"

import { apiUrls } from "@/lib/api-urls"

export interface InvoiceProps {
  customerName: string
  customerPhone: string
  customerAddress: string
  paymentMode: string
  cashierName: string
  totalAmount: string
  totalProfit: string
  totalQuantity: string
  items: Item[]
}

export const createInvoice = async (data: InvoiceProps) => {
  const res = await fetch(apiUrls.sales.add, {
    method: "POST",
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw error
  }
  return await res.json()
}

// export const deleteIncome = async (id: string) => {
// 	const res = await fetch(apiUrls.income.modify, { method: 'DELETE', body: JSON.stringify({ id: [id] }) });
// 	return await res.json();
// };

export const editInvoice = async (data: Invoice) => {
  const res = await fetch(apiUrls.invoice.modify, {
    method: "PUT",
    body: JSON.stringify(data),
  })
  return await res.json()
}
