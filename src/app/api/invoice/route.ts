import { NextRequest, NextResponse } from "next/server"
import messages from "@/constants/messages"
import {
  endOfDay,
  endOfYear,
  parseISO,
  startOfDay,
  startOfYear,
} from "date-fns"
import { InferModel, and, between, eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/lib/db"
import { invoice, invoiceItems } from "@/lib/db/schema"

type InvoiceItems = InferModel<typeof invoiceItems>

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const fromString = searchParams.get("from") || ""
  const toString = searchParams.get("to") || ""
  try {
    const start = Date.now()
    if (fromString === "" || toString === "") {
      return NextResponse.json({
        error: "Missing required parameter(s)",
      })
    }
    const from = startOfDay(parseISO(fromString))
    const to = endOfDay(parseISO(toString))

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return NextResponse.json({ error: "Invalid date format" })
    }
    const invoiceData = await db
      .select()
      .from(invoice)
      .where(between(invoice.createdAt, from, to))
    const invoiceItemsData = await db
      .select()
      .from(invoiceItems)
      .where(between(invoiceItems.createdAt, from, to))
    const data = invoiceData.map((invoice) => {
      const items = invoiceItemsData.filter(
        (item) => item.invoiceId === invoice.id
      )
      return {
        ...invoice,
        items,
      }
    })
    const totalSales = data.reduce((acc, curr) => acc + curr.totalAmount, 0)
    const totalProfit = data.reduce((acc, curr) => acc + curr.totalProfit, 0)
    const end = Date.now()
    return NextResponse.json({
      success: true,
      message: "GET /api/invoice",
      time: `${end - start}ms`,
      data: data,
      totalSales: totalSales,
      totalProfit: totalProfit,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      id,
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

    if (!id) {
      return NextResponse.json(messages.request.invalid, { status: 400 })
    }

    const start = Date.now()

    // Update invoice data
    await db
      .update(invoice)
      .set({
        customerName,
        customerPhone,
        customerAddress,
        paymentMode,
        cashierName,
        warrantyPeriod,
        totalAmount,
        totalProfit,
        totalQuantity,
        updatedAt: new Date(),
      })
      .where(eq(invoice.id, id))

    // Update invoice items using Promise.all for parallel execution
    await Promise.all(
      items.map(async (item: InvoiceItems) => {
        await db
          .update(invoiceItems)
          .set({
            productCategory: item.productCategory,
            quantity: item.quantity,
            price: item.price,
            amount: item.amount,
            note: item.note,
            code: item.code,
            profit: item.profit,
            dealerCode: item.dealerCode,
            updatedAt: new Date(),
          })
          .where(
            and(eq(invoiceItems.invoiceId, id), eq(invoiceItems.id, item.id))
          )
      })
    )

    const end = Date.now()

    return NextResponse.json(
      {
        success: true,
        message: messages.updated,
        time: `${end - start}ms`,
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
