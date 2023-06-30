import { NextApiRequest, NextApiResponse } from "next"
import { eq, gte, lt, ne, sql } from "drizzle-orm"
import { z } from "zod"

import { withMethods } from "@/lib/api-middleware/with-methods"
import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //   res.status(200).json({ message: `Welcome ${re`q.query.id}` })
  try {
    const result = await db
      .select()
      .from(sales)
      .where(sql`${sales.id} = ${req.query.billid}`)
    return res
      .status(200)
      .json({ success: true, message: "select filter", data: result })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues })
    }
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

export default withMethods(["GET"], handler)
