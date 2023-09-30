"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// const data = [
//   {
//     name: "Jan",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
//   {
//     name: "Feb",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
//   {
//     name: "Mar",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
//   {
//     name: "Apr",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
//   {
//     name: "May",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
//   {
//     name: "Jun",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
//   {
//     name: "Jul",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
//   {
//     name: "Aug",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
//   {
//     name: "Sep",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
//   {
//     name: "Oct",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
//   {
//     name: "Nov",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
//   {
//     name: "Dec",
//     total: Math.floor(Math.random() * 10000) + 1000,
//   },
// ]

interface SalesData {
  name: string
  total: number
}

interface OverviewProps {
  salesData: SalesData[]
}

export function Overview({ salesData }: OverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={salesData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        <Bar dataKey="total" fill="#00b899" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
