import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db"
import { invoice } from "@/lib/db/schema"

export async function GET(request: NextRequest) {
  try {
    const start = Date.now()
    const data = await db.select().from(invoice)

    // Sort the data by invoice id
    data.sort((a, b) => a.id - b.id)
    
    const totalSales = data.reduce((acc, curr) => acc + curr.totalAmount, 0)
    const totalProfit = data.reduce((acc, curr) => acc + curr.totalProfit, 0)
    const end = Date.now()
    return NextResponse.json({
      success: true,
      message: "GET /api/sales/getall",
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
