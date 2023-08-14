"use client"

import * as React from "react"
import { format, parseISO } from 'date-fns';
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Loader2 } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker"
import { toast } from "@/components/ui/use-toast"
import { useOverview } from "@/components/context/overview-provider"
import DatePicker from "@/components/datepicker"

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

export const DownloadReport = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { data, loading } = useOverview()

  function generate() {
    try {
      setIsLoading(true)
      var doc = new jsPDF()
      doc.setFontSize(18)
      doc.text("Famous Bag House", 14, 22)
      doc.setFontSize(8)
      autoTable(doc, {
        head: [
          [
            "Id",
            "Product Category",
            "Quantity",
            "Code",
            "Amount",
            "Profit",
            "Dealer Code",
            "Payment Mode",
            "Timestamp",
          ],
        ],
        body: data?.sales?.data?.map(
          ({
            id,
            productCategory,
            code,
            quantity,
            amount,
            dealerCode,
            profit,
            paymentMode,
            createdAt,
          }: InvoiceData) => {
            const dateObject = parseISO(createdAt);
            return [
              id,
              productCategory.toUpperCase(),
              quantity,
              code.toUpperCase(),
              amount,
              profit,
              dealerCode.toUpperCase(),
              paymentMode.toUpperCase(),
              format(dateObject, 'yyyy-MM-dd HH:mm:ss'),
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
    <div className="flex items-center space-x-2">
      <DatePicker />
      <Button
        onClick={() => generate()}
        disabled={isLoading}
        className="hidden md:flex"
      >
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
