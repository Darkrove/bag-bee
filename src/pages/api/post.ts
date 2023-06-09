import { NextApiRequest, NextApiResponse } from "next"
import { InferModel, eq } from "drizzle-orm"
import { z } from "zod"

import { withMethods } from "@/lib/api-middleware/with-methods"
import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"

const reqSchema = z.object({
  customerName: z.string().max(255),
  customerPhone: z.string().max(10),
  customerAddress: z.string().max(255),
  productCategory: z.string().max(255),
  quantity: z.string().max(255),
  amount: z.string().max(255),
  code: z.string().max(255),
  dealerCode: z.string().max(255),
  paymentMode: z.string().max(255),
})

type Sales = InferModel<typeof sales>

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as unknown

  try {
    const {
      customerName,
      customerPhone,
      customerAddress,
      productCategory,
      quantity,
      amount,
      code,
      profit,
      dealerCode,
      paymentMode,
    } = body as Sales

    const result = await db.insert(sales).values({
      customerName: customerName,
      customerPhone: customerPhone,
      customerAddress: customerAddress,
      productCategory: productCategory,
      quantity: quantity,
      amount: amount,
      code: code,
      profit: profit,
      dealerCode: dealerCode,
      paymentMode: paymentMode,
    })

    return res
      .status(200)
      .json({ success: true, message: "insert into sales", data: result })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error)
      return res.status(400).json({ error: error.issues })
    }
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
export default withMethods(["POST"], handler)
