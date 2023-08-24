"use client"

import Link from "next/link"
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
import { useOverview } from "@/components/context/temp-overview-provider"

export default function Summary() {
  const { data, loading } = useOverview()
  console.log(data)
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
                <p className="text-xs text-muted-foreground">+55% of sales</p>
              </CardContent>
            </Card>
          </div>
          {/* TABLE WITH MaPPING OF INVOICE WHICH SHOWS INVOICEID, PURCHASE DATE, AMOUNT AND PROFIT */}
          <div className="mt-10">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="text-left">Invoice ID</th>
                  <th className="text-left">Purchase Date</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Profit</th>
                  <th className="text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted-foreground">
                {data?.sales?.data?.map((invoice: any, index: number) => (
                  <tr key={index} className="text-sm">
                    <td className="py-2">{invoice.id}</td>
                    <td className="py-2">{invoice.createdAt}</td>
                    <td className="py-2">{invoice.totalAmount}</td>
                    <td className="py-2">{invoice.totalProfit}</td>
                    <td className="py-2">
                      <Link href={`/billv2/${invoice.id}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}
