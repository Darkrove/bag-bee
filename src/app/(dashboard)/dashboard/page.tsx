import { redirect } from "next/navigation"
import { dateFormat } from "@/constants/date"
import { endOfYear, format, startOfYear } from "date-fns"
import { CreditCard, IndianRupee } from "lucide-react"
import { getServerSession } from "next-auth"

import { apiUrls } from "@/lib/api-urls"
import { authOptions } from "@/lib/nextauth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardsStats } from "@/components/card-stats"
import { DatePickerProvider } from "@/components/context/datepicker-provider"
import { OverviewContextProvider } from "@/components/context/overview-provider"
import { DownloadReport } from "@/components/download-report"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"

import Summary from "./summary"

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
                  <Overview salesData={salesData} />
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
          </div>
        </section>
      </OverviewContextProvider>
    </DatePickerProvider>
  )
}
