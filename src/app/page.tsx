import Link from "next/link"
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  Plus,
  Users,
} from "lucide-react"

import { siteConfig } from "@/config/site"
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
import { Separator } from "@/components/ui/separator"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"

export default async function IndexPage() {
  const data = await db.select().from(sales)
  let totalSales = 0
  let uniqueCustomerCount = 0
  data?.forEach((row) => {
    totalSales += row.amount // Assuming there is an "amount" column in the "sales" table
  })

  const uniqueCustomers = new Set()

  data.forEach((row) => {
    uniqueCustomers.add(row.customerPhone)
  })
  uniqueCustomerCount = uniqueCustomers.size

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl">
          Welcome to Famous Bag House <br className="hidden sm:inline" />
        </h1>
        <Link href="/invoice" className={buttonVariants()}>
          <span className="flex items-center justify-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New</span>
          </span>
        </Link>
      </div>
      <Separator />

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
            <div className="text-2xl font-bold">₹12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
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
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* @ts-expect-error server Component */}
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
