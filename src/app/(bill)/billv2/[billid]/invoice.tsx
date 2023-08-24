"use client"

import React from "react"
import { Loader2 } from "lucide-react"
import useSWR from "swr"

import { apiUrls } from "@/lib/api-urls"

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

  return (
    <div>
      {isSalesLoading ? (
        <div className="flex w-full flex-col items-center justify-center rounded-md bg-slate-950 p-4">
          <Loader2 className="h-10 w-10 animate-spin" />{" "}
        </div>
      ) : (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(invoiceData, null, 2)}
          </code>
        </pre>
      )}
    </div>
  )
}

export default Invoice
