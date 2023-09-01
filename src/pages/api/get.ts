import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

import { withMethods } from "@/lib/api-middleware/with-methods"
import { db } from "@/lib/db"
import { invoice, sales } from "@/lib/db/schema"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const start = Date.now()
    const result = await db.select().from(invoice)
    const totalSales = result.reduce((acc, curr) => acc + curr.totalAmount, 0)
    const totalProfit = result.reduce((acc, curr) => acc + curr.totalProfit, 0)
    const end = Date.now()
    return res.status(200).json({
      success: true,
      message: "GET /api/get",
      time: `${end - start}ms`,
      data: result,
      totalSales: totalSales,
      totalProfit: totalProfit,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues })
    }
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
export default withMethods(["GET"], handler)
