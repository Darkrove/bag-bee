import { redirect } from "next/navigation"
import { CreditCard, IndianRupee } from "lucide-react"
import { getServerSession } from "next-auth"

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

  result?.data?.forEach((row: { amount: number; createdAt: Date }) => {
    const date = new Date(row.createdAt)
    const month = date.getMonth()
    const amount = row.amount

    // Update the total sales for the corresponding month in the data array
    if (salesData[month]) {
      salesData[month].total += amount
    }
  })

  totalSalesNumber = result?.data?.length

  return (
    <DatePickerProvider>
      <OverviewContextProvider>
        <section className="container grid items-center gap-6 py-10">
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="hidden text-3xl font-bold tracking-tight md:flex">
                Welcome back, {session.user.name}
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
      </OverviewContextProvider>
    </DatePickerProvider>
  )
}
