import { IndianRupee } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CardsStats } from "@/components/card-stats"

export default async function Summary() {
  let ENDPOINT
  if (process.env.NODE_ENV === "development") {
    ENDPOINT = "http://localhost:3000/api/sales"
  } else {
    ENDPOINT = "https://buzzbag.vercel.app/api/sales"
  }
  const result = await fetch(ENDPOINT, { cache: "no-store" }).then((res) =>
    res.json()
  )
  console.log(result)
  return (
    <>
      {/* {loading ? (
        <div className="grid gap-4 md:grid-cols-2 ">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Skeleton className="my-1 h-6 w-[250px]" />
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
              <div className="mt-4 h-[80px]">
                <Skeleton className="h-full w-full" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Skeleton className="my-1 h-6 w-[250px]" />
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
              <div className="mt-4 h-[80px]">
                <Skeleton className="h-full w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 ">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{data?.sales?.totalSales}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profit</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{data?.sales?.totalProfit}
                </div>
                <p className="text-xs text-muted-foreground">
                  +55% of sales
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )} */}
    </>
  )
}
