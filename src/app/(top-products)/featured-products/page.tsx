import React from "react"
import { redirect } from "next/navigation"
import { dateFormat } from "@/constants/date"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card"
import { endOfYear, format, formatDistance, startOfYear } from "date-fns"
import { TrendingUp } from "lucide-react"
import { getServerSession } from "next-auth"

import { apiUrls } from "@/lib/api-urls"
import { authOptions } from "@/lib/nextauth"

import ToIndianCurrency from "@/helpers/to-indian-currency"

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

export default async function FeaturedPage() {
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

  const from = format(startOfYear(new Date()), dateFormat)
  const to = format(endOfYear(new Date()), dateFormat)
  const result = await fetch(
    process.env.NEXTAUTH_URL + apiUrls.invoice.getInvoice({ from, to }),
    {
      cache: "no-store",
    }
  ).then((res) => res.json())

  // top product category
  const invoices: Invoice[] = result.data
  const categorySales: {
    [category: string]: { totalSales: number; totalProfit: number }
  } = {}

  invoices?.forEach((invoice) => {
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

  return (
    <section className="container grid items-center gap-6 py-10">
        <div className="flex flex-col items-start justify-between space-y-2">
  <h2 className="text-3xl font-bold tracking-tight">Top-Selling Products</h2>
  <p className="text-sm tracking-tight">Best-selling items of the year</p>
</div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categoriesWithPercentage.map(
          ({ category, totalSales, totalProfit, percentageSales }) => (
            <Card key={category}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">
                  {category}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{ToIndianCurrency(totalSales)}</div>
                <p className="text-xs text-muted-foreground">
                  {percentageSales.toFixed(2)}% of this year sales
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  )
}
