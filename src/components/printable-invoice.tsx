"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { Printer } from "lucide-react"
import ReactToPrint from "react-to-print"

import { Button } from "@/components/ui/button"

interface Props {}

export const PrintableInvoice = () => {
  const componentRef = useRef(null)
  const data = {
    me: {
      name: "Famous Bag House",
      address: (
        <span>
          Shop No. 5<br /> Ekta Appartment
          <br /> Opp. Ration Office
          <br /> Dombivli East-421201
        </span>
      ),
      city: "Dombivli East, Mumbai - 421201",
      mail: "samaralishaikh212@gmail.com",
      contact: "+91 (843) 3624344",
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
      subtotal: "3010",
      taxes: "542",
      total: "3552",
      amountpaid: "3552",
    },
  }

  return (
    <>
      <div className="flex items-center justify-end px-4">
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
        </div>
      </div>
      <div className="mx-auto my-4 max-w-[85rem] px-4 sm:my-10 sm:px-6 lg:px-8">
        <div className="mx-auto sm:w-11/12 lg:w-3/4">
          <div
            ref={componentRef}
            className="invoice flex h-full w-full flex-col rounded-xl bg-white p-4 dark:bg-gray-800 sm:p-10"
          >
            <div className="flex justify-between">
              <div>
                <svg
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
                </svg>

                <h1 className="mt-2 text-lg font-semibold text-primary dark:text-white md:text-xl">
                  {data.me.name}
                </h1>
              </div>

              <div className="text-right">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 md:text-3xl">
                  Invoice #
                </h2>
                <span className="mt-1 block text-gray-500">3682303</span>

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
                  {data.customer.name}
                </h3>
                <address className="mt-2 not-italic text-gray-500">
                  {data.customer.address}
                </address>
              </div>

              <div className="space-y-2 sm:text-right">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
                  <dl className="grid gap-x-3 sm:grid-cols-5">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                      Invoice date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">03/10/2023</dd>
                  </dl>
                  <dl className="grid gap-x-3 text-right sm:grid-cols-5">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                      Warranty upto:
                    </dt>
                    <dd className="col-span-3 text-gray-500 sm:col-span-2">
                      03/11/2024
                    </dd>
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
                    Qty
                  </div>
                  <div className="text-left text-xs font-medium uppercase text-gray-500">
                    Rate
                  </div>
                  <div className="text-right text-xs font-medium uppercase text-gray-500">
                    Amount
                  </div>
                </div>

                <div className="hidden border-b border-gray-200 dark:border-gray-700 sm:block"></div>
                {data.customer.items.map((item, index) => (
                  <>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                      <div className="col-span-2">
                        <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                          Item
                        </h5>
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          {item.service}
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
                          Qty
                        </h5>
                        <p className="text-gray-800 dark:text-gray-200">
                          {item.qty}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                          Rate
                        </h5>
                        <p className="text-gray-800 dark:text-gray-200">
                          ₹{item.rate}
                        </p>
                      </div>
                      <div className="text-right">
                        <h5 className="text-xs font-medium uppercase text-gray-500 sm:hidden">
                          Amount
                        </h5>
                        <p className="text-gray-800 dark:text-gray-200 sm:text-right">
                          ₹{item.amount}
                        </p>
                      </div>
                    </div>
                    {index !== data.customer.items.length - 1 && (
                      <div className="border-b border-gray-200 dark:border-gray-700 sm:hidden"></div>
                    )}
                  </>
                ))}
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
                      ₹{data.customer.subtotal}.00
                    </dd>
                  </dl>

                  <dl className="grid gap-x-3 text-right sm:grid-cols-5">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                      Tax:
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
                      ₹{data.customer.total}.00
                    </dd>
                  </dl>

                  <dl className="grid gap-x-3 text-right sm:grid-cols-5">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                      Amount paid:
                    </dt>
                    <dd className="col-span-3 text-gray-500 sm:col-span-2">
                      ₹{data.customer.amountpaid}.00
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

            <p className="mt-5 text-sm text-gray-500">© 2023 {data.me.name}.</p>
          </div>
          {/* <!-- End Card --> */}

          {/* <!-- Buttons --> */}
          {/* <div className="mt-6 flex justify-end gap-x-3">
            <a
              className="inline-flex justify-center items-center gap-x-3 text-sm text-center border hover:border-gray-300 shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:border-gray-800 dark:hover:border-gray-600 dark:shadow-slate-700/[.7] dark:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
              href="#"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
              </svg>
              PDF
            </a>
            <a
              className="inline-flex justify-center items-center gap-x-3 text-center bg-primary hover:bg-blue-700 border border-transparent text-sm text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
              href="#"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
              </svg>
              Print details
            </a>
          </div> */}
          {/* <!-- End Buttons --> */}
        </div>
      </div>
      {/* <!-- End Invoice --> */}
    </>
  )
}
