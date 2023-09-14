"use client"

import React, { PureComponent } from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

interface data {
  date: Date
  total: number
}

interface BarProps {
  data: data[]
}
export function CardsStats({ data }: BarProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="total"
          stroke="#16a34a"
          strokeWidth={2}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const originalDate = new Date(payload[0].payload.date)
              const formattedDate = originalDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        date
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {formattedDate}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        total
                      </span>
                      <span className="font-bold text-muted-foreground">
                        ₹{payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            return null
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
