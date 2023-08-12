"use client"

import * as React from "react"
import { FC } from "react"
import jsPDF from "jspdf"

import "jspdf-autotable"
import { Loader2 } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker"
import { toast } from "@/components/ui/use-toast"

interface Props {}

export const DownloadReport = async () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  let ENDPOINT
  if (process.env.NODE_ENV === "development") {
    ENDPOINT = "http://localhost:3000/api/get"
  } else {
    ENDPOINT = "https://buzzbag.vercel.app/api/get"
  }
  const result = await fetch(ENDPOINT, { cache: "no-store" }).then((res) =>
    res.json()
  )
  function generate() {
    try {
      setIsLoading(true)
      const doc = new jsPDF()
      doc.autoTable({
        head: [
          [
            "Id",
            "Product Category",
            "Amount",
            "Quantity",
            "Code",
            "Profit",
            "Dealer Code",
            "Payment Mode",
            "Timestamp",
          ],
        ],
        body: result?.data?.map(
          ({
            id,
            productCategory,
            amount,
            code,
            quantity,
            dealerCode,
            profit,
            paymentMode,
            createdAt,
          }) => {
            return [
              id,
              productCategory,
              `₹${amount}`,
              quantity,
              code.toUpperCase(),
              `₹${profit}`,
              dealerCode.toUpperCase(),
              paymentMode.toUpperCase(),
              createdAt,
            ]
          }
        ),
      })
      doc.save("table.pdf")
    } catch (error) {
      toast({
        title: "Error occured while generating report",
        description: "Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="hidden items-center space-x-2 md:flex">
      <CalendarDateRangePicker />
      <Button onClick={() => generate()} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
          </>
        ) : null}
        Download
      </Button>
    </div>
  )
}
