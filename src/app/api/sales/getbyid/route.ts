import { NextRequest, NextResponse } from "next/server"
import { eq, gte, lt, ne, sql } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/lib/db"
import { invoice, invoiceItems } from "@/lib/db/schema"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const idString = searchParams.get("id") || ""
  console.log(idString)
  try {
    const start = Date.now()
    if (idString === "") {
      return NextResponse.json({
        error: "Missing required parameter(s)",
      })
    }
    const invoiceData = await db
      .select()
      .from(invoice)
      .where(sql`${invoice.id} = ${idString}`)
    console.log(invoiceData)
    const invoiceItemsData = await db
      .select()
      .from(invoiceItems)
      .where(sql`${invoiceItems.invoiceId} = ${idString}`)
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
      message: "GET /api/sales/getbyid",
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
