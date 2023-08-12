"use client"

import * as React from "react"
import { FC } from "react"
import jsPDF from "jspdf"

import "jspdf-autotable"
import { Loader2 } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker"
import { toast } from "@/components/ui/use-toast"

interface InvoiceData {
  id: number
  customerName: string
  customerPhone: string
  customerAddress: string
  productCategory: string
  quantity: number
  amount: number
  code: string
  profit: number
  dealerCode: string
  paymentMode: string
  createdAt: string
  updatedAt: string
  timestamp: string
}

interface Props {
  data: InvoiceData[]
}

export const DownloadReport = ({ data }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  function generate() {
    try {
      setIsLoading(true)
      var doc = new jsPDF()
      doc.setFontSize(18)
      doc.text("Famous Bag House", 14, 22)
      doc.setFontSize(8)
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
        body: data?.map(
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
              productCategory.toUpperCase(),
              amount,
              quantity,
              code.toUpperCase(),
              profit,
              dealerCode.toUpperCase(),
              paymentMode.toUpperCase(),
              createdAt,
            ]
          }
        ),
        headStyles: {
          fillColor: [34, 197, 94],
          fontSize: 8,
          halign: "center",
        },
        bodyStyles: { halign: "center" },
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
