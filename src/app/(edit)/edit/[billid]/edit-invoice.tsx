"use client"

import { setValue } from "@/store/features/invoice-slice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Loader2 } from "lucide-react"
import useSWR from "swr"

import { apiUrls } from "@/lib/api-urls"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  id: string
}

const EditInvoice = ({ id }: Props) => {
  const {
    data: invoiceData = [],
    isLoading: isSalesLoading,
    error: error,
  } = useSWR(apiUrls.invoice.getById({ id }), fetcher)
  const invoiceValue = useAppSelector((state) => state.invoiceReducer.value)
  const dispatch = useAppDispatch()
  if (!isSalesLoading) {
    dispatch(setValue(invoiceData.data[0]))
  }
  return (
    <div>
      {isSalesLoading ? (
        <div className="flex w-full flex-col items-center justify-center rounded-md bg-slate-950 p-4">
          <Loader2 className="h-10 w-10 animate-spin text-white" />{" "}
        </div>
      ) : (
        <pre className="mt-2 w-full overflow-hidden rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(invoiceValue, null, 2)}
          </code>
        </pre>
      )}
    </div>
  )
}

export default EditInvoice
