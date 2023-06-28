import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react"

import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export async function RecentSales() {
  let ENDPOINT
  if (process.env.NODE_ENV === "development") {
    ENDPOINT = "http://localhost:3000/api/get"
  } else {
    ENDPOINT = "https://buzzbag.vercel.app/api/get"
  }
  const result = await fetch(ENDPOINT, { cache: "no-store" }).then((res) =>
    res.json()
  )
  return (
    <div className="space-y-8">
      {result.data
        .reverse()
        .slice(0, 5)
        .map(
          (entry: {
            customerName: string
            customerPhone: string
            amount: string
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
                  {entry.customerPhone}
                </p>
              </div>
              <div className="ml-auto font-medium">₹{entry.amount}</div>
            </div>
          )
        )}
    </div>
  )
}
