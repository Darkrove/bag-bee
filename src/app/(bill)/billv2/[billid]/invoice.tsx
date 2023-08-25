"use client"

import React from "react"
import { addDays, format, parseISO } from "date-fns"
import { Download, Loader2, Pencil, Printer, Trash } from "lucide-react"
import useSWR from "swr"

import { apiUrls } from "@/lib/api-urls"
import { Button } from "@/components/ui/button"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  id: string
}

const Invoice = ({ id }: Props) => {
  const {
    data: invoiceData = [],
    isLoading: isSalesLoading,
    error: error,
  } = useSWR(apiUrls.invoice.getById({ id }), fetcher)

  const data = {
    me: {
      name: "Famous Bag House",
      adress:
        "Shop No. 5, Ground Floor, Ekta Appartment, Opposite Ration Office, Dombivli East, Mumbai - 400086, Maharashtra, India",
    },
  }

  return (
    <div>
      {isSalesLoading ? (
        <div className="flex w-full flex-col items-center justify-center rounded-md bg-slate-950 p-4">
          <Loader2 className="h-10 w-10 animate-spin text-white" />{" "}
        </div>
      ) : (
        // <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
        //   <code className="text-white">
        //     {JSON.stringify(invoiceData, null, 2)}
        //   </code>
        // </pre>
        <div className="grid place-content-center gap-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="secondary">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex gap-2">
              <Button>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
          <div className="w-full rounded-lg bg-secondary p-10 shadow">
            <div className="flex items-center justify-between">
              <div className="flex w-full items-center justify-between space-x-2 md:w-auto md:justify-start">
                <h1 className=" text-gray-600 dark:text-gray-400">Status</h1>
                <div className="flex items-center justify-center space-x-2 rounded-lg bg-[#33d69f0f]  px-4 py-2 text-[#33d69f]">
                  <div className="h-3 w-3 rounded-full  bg-[#33d69f]" />
                  <p>paid</p>
                </div>
              </div>
              <div className="hidden space-x-2 md:block">
                {/* <div className="text-2xl font-bold">Date</div> */}
                <div className="text-gray-600 dark:text-gray-400">
                  {format(parseISO(invoiceData.data[0].createdAt), "PPPP")}
                </div>
              </div>
            </div>
          </div>
          <div className="page overflow-hidden rounded-lg bg-secondary shadow">
            <header className="flex items-center justify-between bg-[#7e88c3] p-12">
              <h1 className="text-3xl font-bold text-white">{data.me.name}</h1>
              <h1 className=" text-2xl font-semibold text-white">
                Invoice
                <span className="text-gray-100">#</span>
                {id}
              </h1>
            </header>
            <div className="h-4 w-full bg-[#7e88c3]/75"></div>
            {/* <div className="flex w-full p-12">
              <h1 className=" text-2xl font-semibold dark:text-white">
                Invoice
                <span className="text-[#7e88c3]">#</span>
                {id}
              </h1>
            </div> */}
            <div className="flex w-full flex-col items-start justify-between px-12 py-6 md:flex-row ">
              <div className=" felx mt-4 flex-col items-center text-sm text-gray-400 md:mt-0">
                <p className="text-lg text-gray-500">Issue Date</p>
                <p> {format(parseISO(invoiceData.data[0].createdAt), "PPP")}</p>
                <p className="text-lg text-gray-500">Warranty Upto</p>
                <p>
                  {format(
                    addDays(parseISO(invoiceData.data[0].createdAt), 365),
                    "PPP"
                  )}{" "}
                  <span className="font-light">(1 year)</span>
                </p>
              </div>

              <div className=" felx mt-4 flex-col items-center text-left text-sm text-gray-400 md:mt-0 md:text-right">
                <p className="text-lg text-gray-500">Customer Details</p>
                <p>{invoiceData.data[0].customerName}</p>
                <p>{invoiceData.data[0].customerPhone}</p>
                <p>{invoiceData.data[0].customerAddress}</p>
              </div>
            </div>
            <div className="h-4 w-full bg-[#7e88c3]/75"></div>
            <div className=" flex justify-between rounded-lg rounded-t-none bg-[#7e88c3] p-12 font-semibold text-white  ">
              <h3 className=" text-xl  text-white ">Total Amount</h3>

              <h1 className="text-3xl font-bold text-white">
                ₹{invoiceData.totalSales}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Invoice
