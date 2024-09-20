"use client"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useOverview } from "@/components/context/overview-provider"
import { Chrome } from "lucide-react"
import Counter from "@/components/counter"
import { Skeleton } from "@/components/ui/skeleton"

  const chartConfig = {
    visitors: {
      label: "Sales",
    },
    sales: {
      label: "Sales",
      color: "hsl(var(--chart-1))",
    },
    profit: {
      label: "Profit",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  export function Data() {

    const { data, loading } = useOverview();

const chartData: { date: string; sales: number; profit: number }[] = [];

data?.sales?.data?.forEach(
  (row: { totalAmount: number; totalProfit: number; createdAt: Date }) => {
    const date = new Date(row.createdAt);
    const formattedDate = date.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"

    const totalAmount = row.totalAmount;
    const totalProfit = row.totalProfit;

    // Check if the date already exists in the chartData array
    const existingEntryIndex = chartData.findIndex(
      (entry) => entry.date === formattedDate
    );

    if (existingEntryIndex !== -1) {
      // If the date already exists, update the sales and profit for that date
      chartData[existingEntryIndex].sales += totalAmount;
      chartData[existingEntryIndex].profit += totalProfit;
    } else {
      // If the date doesn't exist, add a new entry for that date
      chartData.push({
        date: formattedDate,
        sales: totalAmount,
        profit: totalProfit,
      });
    }
  }
);

const profitPercentage =
  Math.round(
    (data?.sales?.totalProfit / data?.sales?.totalSales) * 100 * 100
  ) / 100;
  
    return (
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Sales VS Profit</CardTitle>
            <CardDescription>
              Showing total sales for the last {chartData.length} days
            </CardDescription>
          </div>
          {loading?(<div className="flex">
            {["Sales", "Profit"].map((key) => {return(
                <div
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground">
                  {key}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                <Skeleton className="h-6 w-[100px] md:h-10 md:w-[150px]" />
                </span>
              </div>
            )})}
 
        </div>):(<div className="flex">
              <div
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground">
                  Sales
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                ₹<Counter value={data?.sales?.totalSales} />
                </span>
              </div><div
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground">
                  Profit
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                ₹<Counter value={data?.sales?.totalProfit} />
                </span>
              </div>
        </div>)}
          
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-sales)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-sales)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-profit)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-profit)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="profit"
                type="natural"
                fill="url(#fillMobile)"
                stroke="var(--color-profit)"
                stackId="a"
              />
              <Area
                dataKey="sales"
                type="natural"
                fill="url(#fillDesktop)"
                stroke="var(--color-sales)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  }
