import Link from "next/link"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import {
  Activity,
  ChevronRight,
  CreditCard,
  DollarSign,
  Download,
  IndianRupee,
  Plus,
  Users,
} from "lucide-react"
import { getServerSession } from "next-auth"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { number } from "zod"

import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"
import { authOptions } from "@/lib/nextauth"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CardsStats } from "@/components/card-stats"
import { DownloadReport } from "@/components/download-report"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login?callbackUrl=/dashboard")
  }
  if (session?.user?.role !== "ADMIN") {
    return (
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex flex-col items-center justify-center space-y-4 ">
          <h1 className="font-heading text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            You need to be an admin to access this page.
          </h1>
          <h1 className="max-w-[42rem] text-center leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            for becoming an admin please contact the developer at{" "}
            <a
              href="mailto:samaralishaikh212@gmail.com?subject=Regarding%20admin%20role."
              className="text-blue-500"
            >
              samaralishaikh212@gmail.com
            </a>
          </h1>
        </div>
      </section>
    )
  }
  let ENDPOINT
  if (process.env.NODE_ENV === "development") {
    ENDPOINT = "http://localhost:3000/api/get"
  } else {
    ENDPOINT = "https://buzzbag.vercel.app/api/get"
  }
  const result = await fetch(ENDPOINT, { cache: "no-store" }).then((res) =>
    res.json()
  )

  let totalMonthlySales = 0
  let uniqueCustomerCount = 0
  let totalMonthlyProfit = 0
  let totalSalesNumber = 0
  let profitPercentage = 0

  const salesData: { name: string; total: number }[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ]

  const dailySalesData: { date: Date; total: number }[] = []
  const dailyProfitData: { date: Date; total: number }[] = []

  const profitData: { name: string; profit: number }[] = [
    { name: "Jan", profit: 0 },
    { name: "Feb", profit: 0 },
    { name: "Mar", profit: 0 },
    { name: "Apr", profit: 0 },
    { name: "May", profit: 0 },
    { name: "Jun", profit: 0 },
    { name: "Jul", profit: 0 },
    { name: "Aug", profit: 0 },
    { name: "Sep", profit: 0 },
    { name: "Oct", profit: 0 },
    { name: "Nov", profit: 0 },
    { name: "Dec", profit: 0 },
  ]

  const currentMonth = new Date().getMonth()

  result?.data?.forEach((row: { amount: number; createdAt: Date }) => {
    const date = new Date(row.createdAt)
    const month = date.getMonth()
    const amount = row.amount

    // Update the total sales for the corresponding month in the data array
    if (salesData[month]) {
      salesData[month].total += amount
    }
  })

  result?.data?.forEach(
    (row: { amount: number; profit: number; createdAt: Date }) => {
      const date = new Date(row.createdAt)
      const month = date.getMonth()

      // Update the total sales for the corresponding month in the data array
      if (month === currentMonth) {
        totalMonthlySales += row.amount
        totalMonthlyProfit += row.profit
      }
    }
  )

  result?.data?.forEach(
    (row: { amount: number; profit: number; createdAt: Date }) => {
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth()
      const date = new Date(row.createdAt)

      if (date.getMonth() === currentMonth) {
        const formattedDate = new Date(date.toDateString()) // Remove time information
        const amount = row.amount

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
          dailySalesData[existingEntryIndex].total += amount
        } else {
          // If the date doesn't exist, add a new entry for that date
          dailySalesData.push({ date: formattedDate, total: amount })
        }

        if (existingProfitEntryIndex !== -1) {
          // If the date already exists, update the total sales for that date
          dailyProfitData[existingProfitEntryIndex].total += row.profit
        } else {
          // If the date doesn't exist, add a new entry for that date
          dailyProfitData.push({ date: formattedDate, total: row.profit })
        }
      }
    }
  )

  const uniqueCustomers = new Set()

  result?.data?.forEach((row: { customerPhone: string }) => {
    uniqueCustomers.add(row.customerPhone)
  })
  uniqueCustomerCount = uniqueCustomers.size

  totalSalesNumber = result?.data?.length

  // Calculate the profit percentage and round upto  2 decimal places
  profitPercentage =
    Math.round((totalMonthlyProfit / totalMonthlySales) * 100 * 100) / 100

  return (
    <section className="container grid items-center gap-6 py-10">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {session.user.name}
          </h2>
          <DownloadReport />
        </div>

        <div className="grid gap-4 md:grid-cols-2 ">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                This Month Sales
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalMonthlySales}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
              <div className="mt-4 h-[80px]">
                <CardsStats data={dailySalesData} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                This Month Profit
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalMonthlyProfit}</div>
              <p className="text-xs text-muted-foreground">
                +{profitPercentage}% profit
              </p>
              <div className="mt-4 h-[80px]">
                <CardsStats data={dailyProfitData} />
              </div>
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{uniqueCustomerCount}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card> */}
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales Count</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{totalSalesNumber}</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card> */}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview salesData={salesData} />
            </CardContent>
          </Card>
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made {totalSalesNumber} sales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* @ts-expect-error server Component */}
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
