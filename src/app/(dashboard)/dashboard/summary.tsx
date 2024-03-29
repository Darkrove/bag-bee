"use client"

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
import { useOverview } from "@/components/context/overview-provider"
import Counter from "@/components/counter"

export default function Summary() {
  const { data, loading } = useOverview()

  const dailySalesData: { date: Date; total: number }[] = []
  const dailyProfitData: { date: Date; total: number }[] = []

  data?.sales?.data?.forEach(
    (row: { totalAmount: number; totalProfit: number; createdAt: Date }) => {
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth()
      const date = new Date(row.createdAt)

      const formattedDate = new Date(date.toDateString()) // Remove time information
      const totalAmount = row.totalAmount
      const totalProfit = row.totalProfit

      // Check if the date already exists in the dailySales array
      const existingEntryIndex = dailySalesData.findIndex(
        (entry) => entry.date.getTime() === formattedDate.getTime()
      )

      // Check if the date already exists in the dailyProfit array
      const existingProfitEntryIndex = dailyProfitData.findIndex(
        (entry) => entry.date.getTime() === formattedDate.getTime()
      )

      if (existingEntryIndex !== -1) {
        // If the date already exists, update the total sales for that date
        dailySalesData[existingEntryIndex].total += totalAmount
      } else {
        // If the date doesn't exist, add a new entry for that date
        dailySalesData.push({ date: formattedDate, total: totalAmount })
      }

      if (existingProfitEntryIndex !== -1) {
        // If the date already exists, update the total sales for that date
        dailyProfitData[existingProfitEntryIndex].total += totalProfit
      } else {
        // If the date doesn't exist, add a new entry for that date
        dailyProfitData.push({ date: formattedDate, total: totalProfit })
      }
    }
  )

  const profitPercentage =
    Math.round(
      (data?.sales?.totalProfit / data?.sales?.totalSales) * 100 * 100
    ) / 100

  return (
    <>
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 ">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="relative origin-center truncate text-xl font-semibold tabular-nums md:text-2xl md:tracking-tight">
                <Skeleton className="h-7 w-[250px] md:h-8" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
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
              <div className="relative origin-center truncate text-xl font-semibold tabular-nums md:text-2xl md:tracking-tight">
                <Skeleton className="h-7 w-[250px] md:h-8" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
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
                <dd className="relative origin-center truncate text-xl font-semibold tabular-nums md:text-2xl md:tracking-tight">
                  ₹<Counter value={data?.sales?.totalSales} />
                </dd>
                <p className="mt-1 text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
                <div className="mt-4 h-[80px]">
                  <CardsStats data={dailySalesData} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profit</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <dd className="relative origin-center truncate text-xl font-semibold tabular-nums md:text-2xl md:tracking-tight">
                  ₹<Counter value={data?.sales?.totalProfit} />
                </dd>
                <p className="mt-1 text-xs text-muted-foreground">
                  +{profitPercentage ? profitPercentage : "0"}% of sales
                </p>
                <div className="mt-4 h-[80px]">
                  <CardsStats data={dailyProfitData} />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  )
}
