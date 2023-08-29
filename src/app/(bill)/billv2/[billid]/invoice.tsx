"use client"

import React, { useRef } from "react"
import type { Item } from "@/store/item-data"
import { addDays, format, parseISO } from "date-fns"
import { Download, Loader2, Pencil, Printer, Share, Trash } from "lucide-react"
import ReactToPrint from "react-to-print"
import useSWR from "swr"

import { apiUrls } from "@/lib/api-urls"
import useWindowSize from "@/hooks/useWindowSize"
import { Button } from "@/components/ui/button"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  id: string
  userRole: string | undefined
}

const Invoice = ({ id, userRole }: Props) => {
  const {
    data: invoiceData = [],
    isLoading: isSalesLoading,
    error: error,
  } = useSWR(apiUrls.invoice.getById({ id }), fetcher)
  const componentRef = useRef(null)
  const { isMobile, isDesktop } = useWindowSize()
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
          {userRole === "ADMIN" ? (
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <ReactToPrint
                  trigger={() => (
                    <Button>
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
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
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <ReactToPrint
                  trigger={() => (
                    <Button>
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
                <Button variant="secondary">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="hidden gap-2 md:flex ">
                <Button>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          )}
          <div className="grid place-content-center gap-5">
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
            <div
              ref={componentRef}
              className="overflow-hidden rounded-lg bg-secondary shadow sm:min-w-[500px] md:min-w-[600px]"
            >
              <header className="flex items-center justify-between bg-primary p-6 md:p-12">
                <h1 className="text-xl font-bold text-white md:text-3xl">
                  {data.me.name}
                </h1>
                <h1 className="text-md hidden font-semibold text-white md:block md:text-2xl">
                  Invoice
                  <span className="text-gray-100">#</span>
                  {id}
                </h1>
              </header>
              <div className="h-2 w-full bg-primary/75 md:h-4"></div>
              {/* <div className="flex w-full p-12">
              <h1 className=" text-2xl font-semibold dark:text-white">
                Invoice
                <span className="text-primary">#</span>
                {id}
              </h1>
            </div> */}
              <div className="flex w-full flex-col px-6 py-3 md:flex-row md:items-center md:justify-between md:px-12 md:py-6">
                <div className=" felx mt-4 flex-col items-center text-sm text-gray-400 md:mt-0">
                  <p className="text-lg text-gray-400">Issue Date</p>
                  <p>
                    {" "}
                    {format(parseISO(invoiceData.data[0].createdAt), "PPP")}
                  </p>
                  <p className="text-lg text-gray-400">Warranty Upto</p>
                  <p>
                    {format(
                      addDays(
                        parseISO(invoiceData.data[0].createdAt),
                        invoiceData.data[0].warrantyPeriod
                      ),
                      "PPP"
                    )}{" "}
                    <span className="font-light">
                      ({invoiceData.data[0].warrantyPeriod} days)
                    </span>
                  </p>
                </div>

                <div className=" felx mt-4 flex-col items-center text-left text-sm text-gray-400 md:mt-0 md:text-right">
                  <p className="text-lg text-gray-400">Customer Details</p>
                  <p>{invoiceData.data[0].customerName}</p>
                  <p>{invoiceData.data[0].customerPhone}</p>
                  <p>{invoiceData.data[0].customerAddress}</p>
                </div>
              </div>
              {isMobile && (
                <div className="p-6 ">
                  <div className="mt-10 rounded-lg bg-primary/75 p-6">
                    {invoiceData.data[0].items.map((item: Item) => (
                      <div className="flex items-center justify-between text-lg dark:text-white">
                        <div className="flex flex-col">
                          <h1 className="font-semibold">
                            {item.productCategory}
                          </h1>
                          <p className="text-sm text-gray-400">
                            {item.quantity} x{" "}
                            <span className="font-medium">₹{item.price}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="">₹{item.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {isDesktop && (
                <div>
                  <div className="flex flex-col px-6 pb-3 md:px-12 md:pb-6">
                    <div className="-m-1.5 overflow-x-auto">
                      <div className="inline-block min-w-full p-1.5 align-middle">
                        <div className="overflow-hidden rounded-lg border dark:border-gray-700">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-primary/75">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium uppercase text-primary-foreground"
                                >
                                  Item
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium uppercase text-primary-foreground"
                                >
                                  Code
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium uppercase text-primary-foreground"
                                >
                                  Price
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium uppercase text-primary-foreground"
                                >
                                  Qty
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-right text-xs font-medium uppercase text-primary-foreground"
                                >
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {invoiceData.data[0].items.map((item: Item) => (
                                <tr className="">
                                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium capitalize">
                                    {item.productCategory}
                                    <span className="uppercase text-gray-400">
                                      {" "}
                                      ({item.dealerCode})
                                    </span>
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 text-sm uppercase">
                                    {item.code}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-400">
                                    ₹{item.price}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 text-sm ">
                                    {item.quantity}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    ₹{item.amount}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="h-2 w-full bg-primary/75 md:h-4"></div>
              <div className="flex flex-col rounded-lg rounded-t-none bg-primary p-6 font-semibold text-white md:flex-row md:justify-between md:p-12">
                <h3 className=" text-xl text-white ">TOTAL </h3>

                <h1 className="text-3xl font-bold text-white">
                  ₹{invoiceData.totalSales}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Invoice
