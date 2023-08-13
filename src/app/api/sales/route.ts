import { NextRequest, NextResponse } from "next/server"
import { endOfDay, parseISO, startOfDay } from "date-fns"
import { between } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const fromString = searchParams.get("from") || ""
  const toString = searchParams.get("to") || ""
  try {
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

    const data = await db
      .select()
      .from(sales)
      .where(between(sales.createdAt, from, to))

    const totalSales = data.reduce((acc, curr) => acc + curr.amount, 0)
    const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0)

    return NextResponse.json({
      success: true,
      message: "GET /api/sales",
      data: data,
      totalSales: totalSales,
      totalProfit: totalProfit,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues })
    }
    return NextResponse.json({ error: "Internal Server Error" })
  }
}
