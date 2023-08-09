import React from "react"
import { redirect } from "next/navigation"
import format from "date-fns/format"
import { getServerSession } from "next-auth"
import QRCode from "react-qr-code"

import { authOptions } from "@/lib/nextauth"

interface Props {
  params: {
    billid: string
  }
}

export default async function page({ params: { billid } }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login?callbackUrl=/")
  }
  let ENDPOINT
  if (process.env.NODE_ENV === "development") {
    ENDPOINT = `http://localhost:3000/api/invoice/${billid}`
  } else {
    ENDPOINT = `https://buzzbag.vercel.app/api/invoice/${billid}`
  }
  const result = await fetch(ENDPOINT, { cache: "no-store" }).then((res) =>
    res.json()
  )

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="rounded-md bg-primary p-4 text-primary-foreground shadow">
        <div className="mb-4 flex justify-between">
          <h2 className="text-2xl font-bold">Bill Details</h2>
        </div>
        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <p>
              <span className="font-bold">Bill Id:</span> {result.data[0].id}
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <p>
              <span className="font-bold">Name:</span>{" "}
              {result.data[0].customerName}
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <p>
              <span className="font-bold">Address:</span>{" "}
              {result.data[0].customerAddress}
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <p>
              <span className="font-bold">Phone:</span>{" "}
              {result.data[0].customerPhone}
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <p>
              <span className="font-bold">Product Name:</span>{" "}
              {result.data[0].productCategory}
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <p>
              <span className="font-bold">Amount:</span> ₹
              {result.data[0].amount}
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <p>
              <span className="font-bold">Code:</span>{" "}
              <span className="uppercase">{result.data[0].code}</span>
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <p>
              <span className="font-bold">Purchase Date:</span>{" "}
              {format(
                new Date(result.data[0].createdAt),
                "dd/MM/yyyy HH:mm:ss"
              )}
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <p>
              <span className="font-bold">Dealer Code:</span>{" "}
              <span className="uppercase">{result.data[0].dealerCode}</span>
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <p>
              <span className="font-bold">Mode:</span>{" "}
              <span className="uppercase">{result.data[0].paymentMode}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-md bg-transparent p-3 dark:bg-white">
        <QRCode
          value={`https://buzzbag.vercel.app/bill/${result.data[0].id}`}
          className=""
        />
      </div>
    </section>
  )
}
