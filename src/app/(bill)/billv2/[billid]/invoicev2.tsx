"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { Item } from "@/store/item-data"
import { addDays, format, parseISO } from "date-fns"
import { Loader2, Pencil, Printer, QrCode, Share, Trash } from "lucide-react"
import ReactToPrint from "react-to-print"
import useSWR from "swr"

import { apiUrls } from "@/lib/api-urls"
import useWindowSize from "@/hooks/useWindowSize"
import { Button } from "@/components/ui/button"
import { RoundButton, buttonVariants } from "@/components/ui/round-button"
import { Icons } from "@/components/icons"
import EditInvoiceModalHelper from "@/components/modals/edit/edit-invoice-modal"
import { LinkQRModalHelper } from "@/components/modals/link-qr-modal"
import { Status } from "@/components/status"

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
      address: (
        <span>
          Shop No. 5,
          <br /> Ekta Appartment,
          <br /> Opp. Ration Office,
          <br /> Dombivli East-421201
        </span>
      ),
      city: "Dombivli East, Mumbai - 421201",
      mail: "samaralishaikh212@gmail.com",
      contact: "+91 9867081170",
    },
    customer: {
      name: "Sara James",
      address: (
        <span>
          280 Suzanne Throughway,
          <br />
          Breannabury, OR 45801,
          <br />
          United States
          <br />
        </span>
      ),
      items: [
        {
          service: "general",
          code: "EEB",
          qty: "2",
          rate: "180",
          amount: "360",
        },
        {
          service: "college bag",
          code: "NEB",
          qty: "1",
          rate: "400",
          amount: "400",
        },
        {
          service: "office bag",
          code: "SCS",
          qty: "1",
          rate: "1500",
          amount: "1500",
        },
        {
          service: "air bag",
          code: "OAS",
          qty: "1",
          rate: "750",
          amount: "750",
        },
      ],
      subtotal: "0",
      taxes: "0",
      total: "0",
      amountpaid: "0",
    },
    encodedMessage: encodeURIComponent(
      `Here is your invoice@${id} from Famous Bag House. Please find it attached.`
    ),
    encodedFileURL: encodeURIComponent(
      "https://www.isro.gov.in/media_isro/pdf/Missions/LVM3/LVM3M4_Chandrayaan3_brochure.pdf"
    ),
  }

  return (
    <div>
      {isSalesLoading ? (
        <div className="flex w-full flex-col items-center justify-center rounded-md bg-slate-950 p-4">
          <Loader2 className="h-10 w-10 animate-spin text-white" />{" "}
        </div>
      ) : (
        <div className="flex-col space-y-5">
          <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex flex-col space-y-4 sm:w-11/12 lg:w-3/4">
              {userRole === "ADMIN" ? (
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <ReactToPrint
                      bodyClass="invoice"
                      trigger={() => (
                        <RoundButton>
                          <span className="sr-only">Print</span>
                          <Printer className="h-4 w-4 text-secondary-foreground  transition-all group-hover:text-green-800" />
                        </RoundButton>
                      )}
                      content={() => componentRef.current}
                    />
                    <Link
                      href={`https://api.whatsapp.com/send?phone=+91${invoiceData.data[0].customerPhone}&text=${data.encodedMessage}`}
                      className={buttonVariants({ variant: "secondary" })}
                      target="_blank"
                    >
                      <span className="sr-only">Share</span>
                      <Share className="h-4 w-4 text-secondary-foreground  transition-all group-hover:text-blue-800" />
                    </Link>
                  </div>

                  <div className=" flex gap-2 ">
                    <LinkQRModalHelper
                      props={{
                        key: id,
                        url: `https://buzzbag.vercel.app/billv2/${id}`,
                      }}
                    />
                    <EditInvoiceModalHelper
    
                    />
                    <RoundButton variant="destructive">
                      <span className="sr-only">Delete</span>
                      <Trash className="h-4 w-4 text-secondary-foreground  transition-all group-hover:text-red-800" />
                    </RoundButton>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <ReactToPrint
                      trigger={() => (
                        <RoundButton>
                          <span className="sr-only">Print</span>
                          <Printer className="h-4 w-4 text-secondary-foreground  transition-all group-hover:text-green-800" />
                        </RoundButton>
                      )}
                      content={() => componentRef.current}
                    />
                  </div>
                  <div>
                    <LinkQRModalHelper
                      props={{
                        key: id,
                        url: `https://buzzbag.vercel.app/billv2/${id}`,
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="w-full rounded-lg bg-white p-10 shadow-md dark:bg-secondary">
                <div className="flex items-center justify-between">
                  <div className="flex w-full items-center justify-between space-x-2 md:w-auto md:justify-start">
                    <h1 className=" text-gray-600 dark:text-gray-400">Mode</h1>
                    {/* <div className="flex items-center justify-center space-x-2 rounded-lg bg-[#33d69f0f]  px-4 py-2 text-[#33d69f]">
                      <div className="h-3 w-3 rounded-full  bg-[#33d69f]" />
                      <p>paid</p>
                    </div> */}
                    <Status type={invoiceData.data[0].paymentMode} />
                  </div>
                  <div className="hidden space-x-2 md:block">
                    {/* <div className="text-2xl font-bold">Date</div> */}
                    <div className="text-gray-600 dark:text-gray-400">
                      {format(parseISO(invoiceData.data[0].createdAt), "PPP")}
                    </div>
                  </div>
                </div>
              </div>
              <div
                ref={componentRef}
                className="invoice flex min-h-full w-full flex-col justify-between rounded-xl bg-white p-4 dark:bg-secondary sm:p-10"
              >
                <div>
                  <div className="flex justify-between">
                    <div>
                      {/* <svg
                        className="h-10 w-10"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 26V13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25H12"
                          className="stroke-primary dark:stroke-white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M5 26V13.16C5 8.65336 8.58172 5 13 5C17.4183 5 21 8.65336 21 13.16C21 17.6666 17.4183 21.32 13 21.32H12"
                          className="stroke-primary dark:stroke-white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle
                          cx="13"
                          cy="13.0214"
                          r="5"
                          fill="currentColor"
                          className="fill-primary dark:fill-white"
                        />
                      </svg> */}
                      <Icons.logo className="h-10 w-10"></Icons.logo>
                      <h1 className="mt-2 text-lg font-semibold text-primary dark:text-white md:text-xl">
                        {data.me.name}
                      </h1>
                    </div>

                    <div className="text-right">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 md:text-3xl">
                        Invoice #
                      </h2>
                      <span className="mt-1 block text-gray-500">{id}</span>

                      <address className="mt-4 not-italic text-gray-800 dark:text-gray-200">
                        {data.me.address}
                      </address>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Bill to:
                      </h3>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {invoiceData.data[0].customerName}
                      </h3>
                      <address className="mt-2 not-italic text-gray-500">
                        <p>{invoiceData.data[0].customerPhone}</p>
                        <p>{invoiceData.data[0].customerAddress}</p>
                      </address>
                    </div>

                    <div className="space-y-2 sm:text-right">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
                        <dl className="grid gap-x-3 sm:grid-cols-5">
                          <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                            Invoice date:
                          </dt>
                          <dd className="col-span-2 text-gray-500">
                            {format(
                              parseISO(invoiceData.data[0].createdAt),
                              "dd/MM/yyyy"
                            )}
                          </dd>
                        </dl>
                        <dl className="grid gap-x-3 text-right sm:grid-cols-5">
                          <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                            Warranty upto:
                          </dt>
                          {invoiceData.data[0].warrantyPeriod > 0 ? (
                            <dd className="col-span-3 text-gray-500 sm:col-span-2">
                              {format(
                                addDays(
                                  parseISO(invoiceData.data[0].createdAt),
                                  invoiceData.data[0].warrantyPeriod
                                ),
                                "dd/MM/yyyy"
                              )}
                            </dd>
                          ) : (
                            <dd className="col-span-3 text-gray-500 sm:col-span-2">
                              No warranty
                            </dd>
                          )}
                        </dl>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <div className="hidden sm:grid sm:grid-cols-6">
                        <div className="text-xs font-medium uppercase text-gray-500 sm:col-span-2">
                          Item
                        </div>
                        <div className="text-xs font-medium uppercase text-gray-500 ">
                          Code
                        </div>
                        <div className="text-left text-xs font-medium uppercase text-gray-500">
                          Rate
                        </div>
                        <div className="text-left text-xs font-medium uppercase text-gray-500">
                          Qty
                        </div>
                        <div className="text-right text-xs font-medium uppercase text-gray-500">
                          Total
                        </div>
                      </div>

                      <div className="hidden border-b border-gray-200 dark:border-gray-700 sm:block"></div>
                      {invoiceData.data[0].items.map(
                        (item: Item, index: number) => (
                          <>
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                              <div className="col-span-2">
                                <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                                  Item
                                </h5>
                                <p className="font-medium text-gray-800 dark:text-gray-200">
                                  {item.productCategory}
                                  {item.note ? (
                                    <span className="uppercase text-foreground/50">
                                      {" "}
                                      ({item.note})
                                    </span>
                                  ) : null}
                                </p>
                              </div>
                              <div className="text-right sm:text-left">
                                <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                                  Code
                                </h5>
                                <p className="text-gray-800 dark:text-gray-200">
                                  {item.code}
                                </p>
                              </div>
                              <div>
                                <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                                  Rate
                                </h5>
                                <p className="text-gray-800 dark:text-gray-200">
                                  ₹{item.price}
                                </p>
                              </div>
                              <div>
                                <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                                  Qty
                                </h5>
                                <p className="text-gray-800 dark:text-gray-200">
                                  {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                                  Total
                                </h5>
                                <p className="text-gray-800 dark:text-gray-200 sm:text-right">
                                  ₹{item.amount}
                                </p>
                              </div>
                            </div>
                            {index !== invoiceData.data[0].items.length - 1 && (
                              <div className="border-b border-gray-200 dark:border-gray-700 sm:hidden"></div>
                            )}
                          </>
                        )
                      )}
                    </div>
                  </div>
                  {/* <!-- End Table --> */}

                  {/* <!-- Flex --> */}
                  <div className="mt-8 flex sm:justify-end">
                    <div className="w-full max-w-2xl space-y-2 sm:text-right">
                      {/* <!-- Grid --> */}
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
                        <dl className="grid gap-x-3 sm:grid-cols-5">
                          <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                            Subtotal:
                          </dt>
                          <dd className="col-span-2 text-gray-500">
                            ₹{invoiceData.totalSales}.00
                          </dd>
                        </dl>

                        <dl className="grid gap-x-3 text-right sm:grid-cols-5">
                          <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                            GST:
                          </dt>
                          <dd className="col-span-3 text-gray-500 sm:col-span-2">
                            ₹{data.customer.taxes}.00
                          </dd>
                        </dl>

                        <dl className="grid gap-x-3 sm:grid-cols-5">
                          <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                            Total:
                          </dt>
                          <dd className="col-span-2 text-gray-500">
                            ₹{invoiceData.totalSales}.00
                          </dd>
                        </dl>

                        <dl className="grid gap-x-3 text-right sm:grid-cols-5">
                          <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                            Amount paid:
                          </dt>
                          <dd className="col-span-3 text-gray-500 sm:col-span-2">
                            ₹{invoiceData.totalSales}.00
                          </dd>
                        </dl>

                        <dl className="grid gap-x-3 sm:grid-cols-5">
                          <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                            Due balance:
                          </dt>
                          <dd className="col-span-2 text-gray-500">₹0.00</dd>
                        </dl>
                      </div>
                      {/* <!-- End Grid --> */}
                    </div>
                  </div>
                  {/* <!-- End Flex --> */}
                </div>
                <div className="justify-end">
                  <div className="mt-8 sm:mt-12">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Thank you!
                    </h4>
                    <p className="text-gray-500">
                      If you have any questions concerning this invoice, use the
                      following contact information:
                    </p>
                    <div className="mt-2">
                      <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                        {data.me.mail}
                      </p>
                      <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                        {data.me.contact}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-gray-500">
                    © 2023 {data.me.name}.
                  </p>
                </div>
              </div>
              {/* <!-- End Card --> */}
            </div>
          </div>
          {/* <!-- End Invoice --> */}
        </div>
      )}
    </div>
  )
}

export default Invoice
