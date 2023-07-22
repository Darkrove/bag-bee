import Link from "next/link"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import {
  Activity,
  ChevronRight,
  CreditCard,
  DollarSign,
  Download,
  Plus,
  Users,
} from "lucide-react"
import { getServerSession } from "next-auth"
import { number } from "zod"

import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker"
import { Separator } from "@/components/ui/separator"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login?callbackUrl=/dashboard")
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

  let totalSales = 0
  let uniqueCustomerCount = 0
  let totalProfit = 0
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

  result?.data?.forEach((row: { amount: number; createdAt: Date }) => {
    const date = new Date(row.createdAt)
    const month = date.getMonth()
    const amount = row.amount

    // Update the total sales for the corresponding month in the data array
    if (salesData[month]) {
      salesData[month].total += amount
    }
  })

  result?.data?.forEach((row: { amount: number; profit: number }) => {
    totalSales += row.amount
    totalProfit += row.profit
  })

  const uniqueCustomers = new Set()

  result?.data?.forEach((row: { customerPhone: string }) => {
    uniqueCustomers.add(row.customerPhone)
  })
  uniqueCustomerCount = uniqueCustomers.size

  totalSalesNumber = result?.data?.length

  // Calculate the profit percentage and round upto  2 decimal places
  profitPercentage = Math.round((totalProfit / totalSales) * 100 * 100) / 100

  return (
    <section className="container grid items-center gap-6 py-10">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalSales}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
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
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalProfit}</div>
              <p className="text-xs text-muted-foreground">
                +{profitPercentage}% profit
              </p>
            </CardContent>
          </Card>
          <Card>
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
          </Card>
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
