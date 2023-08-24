import { NextRequest, NextResponse } from "next/server"
import {
  endOfDay,
  endOfYear,
  parseISO,
  startOfDay,
  startOfYear,
} from "date-fns"
import { between } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/lib/db"
import { invoice, invoiceItems } from "@/lib/db/schema"

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
