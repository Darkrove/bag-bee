'use client'
import { useOverview } from '@/components/context/overview-provider'
import { Overview } from '@/components/overview'
import { Skeleton } from "@/components/ui/skeleton"
import React from 'react'


export default function OverviewSummary() {
    const { data, loading } = useOverview()
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
      data?.sales?.data?.forEach((row: { totalAmount: number; createdAt: Date }) => {
        const date = new Date(row.createdAt)
        const month = date.getMonth()
        const totalAmount = row.totalAmount
    
        // Update the total sales for the corresponding month in the data array
        if (salesData[month]) {
          salesData[month].total += totalAmount
        }
      })
      console.log(data)
  return (
    <div>
        <Overview salesData={salesData}/>
    </div>
  )
}
