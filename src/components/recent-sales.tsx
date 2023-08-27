import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react"
import { dateFormat } from "@/constants/date"
import { endOfYear, format, formatDistance, startOfYear } from "date-fns"

import { apiUrls } from "@/lib/api-urls"
import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export async function RecentSales() {
  const from = format(startOfYear(new Date()), dateFormat)
  const to = format(endOfYear(new Date()), dateFormat)
  const result = await fetch(
    process.env.NEXTAUTH_URL + apiUrls.invoice.getInvoice({ from, to }),
    {
      cache: "no-store",
    }
  ).then((res) => res.json())

  return (
    <div className="space-y-8">
      {result?.data
        ?.reverse()
        .slice(0, 5)
        .map(
          (entry: {
            productCategory: string
            customerName: string
            customerPhone: string
            createdAt: Date
            totalAmount: string
          }) => (
            <div className="flex items-center" key={entry.customerPhone}>
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/03.jpg" alt="Avatar" />
                <AvatarFallback>
                  {entry.customerName ? entry.customerName[0] : ""}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {entry.customerName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDistance(new Date(entry.createdAt), new Date())} ago
                </p>
              </div>
              <div className="ml-auto font-medium">₹{entry.totalAmount}</div>
            </div>
          )
        )}
    </div>
  )
}
