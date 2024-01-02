import { redirect } from "next/navigation"
import { dateFormat } from "@/constants/date"
import { endOfYear, format, formatDistance, startOfYear } from "date-fns"
import { BarChart2, CreditCard, IndianRupee, TrendingUp } from "lucide-react"
import { getServerSession } from "next-auth"

import { apiUrls } from "@/lib/api-urls"
import { authOptions } from "@/lib/nextauth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CardsStats } from "@/components/card-stats"
import { DatePickerProvider } from "@/components/context/datepicker-provider"
import { OverviewContextProvider } from "@/components/context/overview-provider"
import { DownloadReport } from "@/components/download-report"
// import { Overview } from "@/components/overview"
import { dealers } from "@/components/payments/data"
import { RecentSales } from "@/components/recent-sales"
import OverviewSummary from "./overview"
import Summary from "./summary"

interface Invoice {
  id: number
  customerName: string
  totalAmount: number
  totalProfit: number
  items: InvoiceItem[]
}

interface InvoiceItem {
  id: number
  productCategory: string
  quantity: number
  dealerCode: string
  price: number
  profit: number
}

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login?callbackUrl=/dashboard")
  }

  if (session?.user?.role !== "ADMIN") {
    return (
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="mx-auto max-w-md text-center sm:max-w-xl">
          <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl sm:leading-tight">
            You need to be an{" "}
            <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              admin
            </span>{" "}
            to access this page.
          </h2>
          <p className="mt-5 text-gray-600 sm:text-lg">
            for becoming an admin please contact the developer at{" "}
            <a
              href="mailto:samaralishaikh212@gmail.com?subject=Regarding%20admin%20role."
              className="text-blue-500"
            >
              samaralishaikh212@gmail.com
            </a>
          </p>
        </div>
      </section>
    )
  }
  function getLabelFromValue(targetValue: string): string | undefined {
    const lowerCaseValue = targetValue.toLowerCase()
    const dealer = dealers.find((d) => d.value === lowerCaseValue)
    return dealer ? dealer.label : undefined
  }
  const from = format(startOfYear(new Date()), dateFormat)
  const to = format(endOfYear(new Date()), dateFormat)
  const result = await fetch(
    process.env.NEXTAUTH_URL + apiUrls.invoice.getInvoice({ from, to }),
    {
      cache: "no-store",
    }
  ).then((res) => res.json())

  let totalSalesNumber = 0

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

  result?.data?.forEach((row: { totalAmount: number; createdAt: Date }) => {
    const date = new Date(row.createdAt)
    const month = date.getMonth()
    const totalAmount = row.totalAmount

    // Update the total sales for the corresponding month in the data array
    if (salesData[month]) {
      salesData[month].total += totalAmount
    }
  })

  totalSalesNumber = result?.data?.length

  // top product category
  const invoices: Invoice[] = result.data
  const categorySales: {
    [category: string]: { totalSales: number; totalProfit: number }
  } = {}

  invoices.forEach((invoice) => {
    invoice.items.forEach((item) => {
      if (!categorySales[item.productCategory]) {
        categorySales[item.productCategory] = {
          totalSales: 0,
          totalProfit: 0,
        }
      }

      categorySales[item.productCategory].totalSales +=
        item.price * item.quantity
      categorySales[item.productCategory].totalProfit += item.profit
    })
  })

  // Convert categorySales to an array for sorting
  const sortedCategories = Object.entries(categorySales).sort(
    (a, b) => b[1].totalSales - a[1].totalSales
  )

  // Extract the top 5 categories
  const topCategories = sortedCategories.slice(0, 5)

  // Calculate total sales across all categories
  const overallTotalSales = Object.values(categorySales).reduce(
    (total, category) => {
      return total + category.totalSales
    },
    0
  )

  // Calculate percentage sales for each category
  const categoriesWithPercentage = sortedCategories.map(
    ([category, { totalSales, totalProfit }]) => {
      const percentageSales = (totalSales / overallTotalSales) * 100
      return {
        category,
        totalSales,
        totalProfit,
        percentageSales,
      }
    }
  )

  // Extract the top 5 categories with percentage sales
  const topCategoriesWithPercentage = categoriesWithPercentage.slice(0, 5)

  // top merchat
  const dealerSales: {
    [dealer: string]: { totalSales: number; totalProfit: number }
  } = {}

  invoices.forEach((invoice) => {
    invoice.items.forEach((item) => {
      if (!dealerSales[item.dealerCode]) {
        dealerSales[item.dealerCode] = {
          totalSales: 0,
          totalProfit: 0,
        }
      }

      dealerSales[item.dealerCode].totalSales += item.price * item.quantity
      dealerSales[item.dealerCode].totalProfit += item.profit
    })
  })

  // Convert categorySales to an array for sorting
  const sortedDealers = Object.entries(dealerSales).sort(
    (a, b) => b[1].totalSales - a[1].totalSales
  )

  // Extract the top 5 categories
  const topDealers = sortedDealers.slice(0, 5)

  // Calculate total sales across all dealers
  const overallTotalDealerSales = Object.values(dealerSales).reduce(
    (total, dealer) => {
      return total + dealer.totalSales
    },
    0
  )

  // Calculate percentage sales for each category
  const dealersWithPercentage = sortedDealers.map(
    ([dealer, { totalSales, totalProfit }]) => {
      const percentageSales = (totalSales / overallTotalDealerSales) * 100
      return {
        dealer,
        totalSales,
        totalProfit,
        percentageSales,
      }
    }
  )

  // Extract the top 5 categories with percentage sales
  const topDealersWithPercentage = dealersWithPercentage.slice(0, 5)

  return (
    <DatePickerProvider>
      <OverviewContextProvider>
        <section className="container grid items-center gap-6 py-10">
          <div className="flex-1 space-y-4">
            <div className="flex flex-col items-center justify-between space-y-2 md:flex-row">
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome, {session.user.name}
              </h2>

              <DownloadReport />
            </div>
            <Summary />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* <Overview salesData={salesData} /> */}
                  <OverviewSummary />
                </CardContent>
              </Card>
              <Card className="col-span-4 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made {totalSalesNumber} sales this year.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* @ts-expect-error server Component */}
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 ">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      Top 5 Products
                    </CardTitle>
                    <CardDescription>
                      Top product category of this year.
                    </CardDescription>
                  </div>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {topCategoriesWithPercentage.map(
                      ({
                        category,
                        totalSales,
                        totalProfit,
                        percentageSales,
                      }) => (
                        <div
                          className="flex items-center justify-between"
                          key={category}
                        >
                          <TrendingUp className="h-8 w-8 text-green-400" />
                          <div className="ml-4 flex space-x-1">
                            <div className="flex flex-col space-y-1">
                              <p className="text-sm font-medium capitalize leading-none">
                                {category}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {percentageSales.toFixed(2)}% of sales
                              </p>
                            </div>
                          </div>
                          <div className="ml-auto flex flex-row gap-3 font-medium">
                            <div className="flex flex-col space-y-1 text-right">
                              <p className="text-sm font-medium capitalize leading-none">
                                ₹{totalSales}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ₹{totalProfit}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">
                      Top 5 Dealers
                    </CardTitle>
                    <CardDescription>Top dealers of this year.</CardDescription>
                  </div>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {topDealersWithPercentage.map(
                      ({
                        dealer,
                        totalSales,
                        totalProfit,
                        percentageSales,
                      }) => (
                        <div
                          className="flex items-center justify-between"
                          key={dealer}
                        >
                          <TrendingUp className="h-8 w-8 text-green-400" />
                          <div className="ml-4 flex space-x-1">
                            <div className="flex flex-col space-y-1">
                              <p className="text-sm font-medium capitalize leading-none">
                                {getLabelFromValue(dealer)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {percentageSales.toFixed(2)}% of sales
                              </p>
                            </div>
                          </div>
                          <div className="ml-auto flex flex-row gap-3 font-medium">
                            <div className="flex flex-col space-y-1 text-right">
                              <p className="text-sm font-medium capitalize leading-none">
                                ₹{totalSales}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ₹{totalProfit}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </OverviewContextProvider>
    </DatePickerProvider>
  )
}
