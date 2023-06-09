import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

import { withMethods } from "@/lib/api-middleware/with-methods"
import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await db.select().from(sales)
    return res
      .status(200)
      .json({ success: true, message: "select from sales", data: result })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues })
    }
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
export default withMethods(["GET"], handler)
