import { NextRequest, NextResponse } from "next/server"
import messages from "@/constants/messages"
import { InferModel, eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/lib/db"
import { invoice, invoiceItems } from "@/lib/db/schema"

type Invoice = InferModel<typeof invoice>
type InvoiceItems = InferModel<typeof invoiceItems>

export async function POST(request: NextRequest) {
  const {
    customerName,
    customerPhone,
    customerAddress,
    paymentMode,
    warrantyPeriod,
    cashierName,
    totalAmount,
    totalProfit,
    totalQuantity,
    items,
  } = await request.json()

  try {
    const start = Date.now()
    const data = await db.insert(invoice).values({
      customerName,
      customerPhone,
      customerAddress,
      paymentMode,
      cashierName,
      warrantyPeriod,
      totalAmount,
      totalProfit,
      totalQuantity,
    })

    const insertedId = parseInt(data?.insertId)
    try {
      items.map(async (item: InvoiceItems) => {
        await db.insert(invoiceItems).values({
          invoiceId: insertedId,
          productCategory: item.productCategory,
          quantity: item.quantity,
          price: item.price,
          amount: item.amount,
          code: item.code,
          profit: item.profit,
          dealerCode: item.dealerCode,
        })
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error)
        return NextResponse.json({ error: error.issues }, { status: 400 })
      }
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 }
      )
    }

    const end = Date.now()

    return NextResponse.json(
      {
        success: true,
        message: messages.success,
        time: `${end - start}ms`,
        data: data,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error)
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json(
      { error, message: messages.request.failed },
      { status: 500 }
    )
  }
}
