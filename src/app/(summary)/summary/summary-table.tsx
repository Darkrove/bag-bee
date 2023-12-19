"use client"

import { Suspense } from "react"
import Link from "next/link"
import { IndianRupee } from "lucide-react"

import { useOverview } from "@/components/context/overview-provider"

export default function Summary() {
  const { data, loading } = useOverview()
  console.log(data)
  return (
    <>
      {" "}
      <Suspense fallback={<Skeleton />}>
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
      </Suspense>
    </>
  )
}

export function Skeleton() {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 py-4 px-2 sticky top-0 h-[60px]" />
  )
}
