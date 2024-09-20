import Link from "next/link"
import { dateFormat } from "@/constants/date"
import { endOfYear, format, formatDistance, startOfYear } from "date-fns"
import { MoveUpRightIcon } from "lucide-react"

import { apiUrls } from "@/lib/api-urls"
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

  function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1
  }

  return (
    <div className="space-y-8">
      {result?.data
        ?.reverse()
        .slice(0, 5)
        .map(
          (entry: {
            id: string
            productCategory: string
            customerName: string
            customerPhone: string
            createdAt: Date
            totalAmount: string
          }) => (
            <div className="flex items-center" key={entry.customerPhone}>
              <Avatar className="h-9 w-9 bg-gray-300 shadow-sm">
                <AvatarImage
                  src={`/avatars/${getRandomNumber()}.png`}
                  alt="Avatar"
                />
                <AvatarFallback>
                  {entry.customerName ? entry.customerName[0] : ""}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 flex space-x-1">
                <div className="flex flex-col space-y-1">
                  <Link
                    href={`/billv2/${entry.id}`}
                    className="flex space-x-2 text-sm font-medium leading-none transition duration-300 ease-in-out hover:underline truncate"
                    target="_blank"
                  >
                    {entry.customerName}
                    <MoveUpRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {formatDistance(new Date(entry.createdAt), new Date())} ago
                  </p>
                </div>
              </div>
              <div className="ml-auto font-medium">+ ₹{entry.totalAmount}</div>
            </div>
          )
        )}
    </div>
  )
}
