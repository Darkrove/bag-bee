"use client"

import { createContext, useContext } from "react"
import { dateFormat } from "@/constants/date"
import { format } from "date-fns"
import useSWR from "swr"

import { apiUrls } from "@/lib/api-urls"

import { useDate } from "./datepicker-provider"

const OverviewContext = createContext(null)

interface Data {
  sales: Array<any>
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const OverviewContextProvider = (props: any) => {
  const { date } = useDate()
  const from = format(date.from || date.to, dateFormat)
  const to = format(date.to || date.from, dateFormat)
  const { children, ...others } = props

  const {
    data: salesData = [],
    isLoading: isSalesLoading,
    error: error,
  } = useSWR(apiUrls.sales.getSales({ from, to }), fetcher)

  const data = {
    sales: salesData,
  }
  const loading = isSalesLoading

  return (
    <OverviewContext.Provider value={{ loading, data }} {...others}>
      {children}
    </OverviewContext.Provider>
  )
}

export const useOverview = () => {
  const context = useContext<any>(OverviewContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a OverviewContext.`)
  }
  return context
}
