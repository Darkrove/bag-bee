"use client"

import { Button } from "@/components/ui/button"
import DatePicker from "@/components/datepicker"

export const Row = () => {
  return (
    <div className="grid grid-cols-3">
      <h2 className="text-3xl font-bold tracking-tight col-span-2">Summary</h2>
      <DatePicker />
    </div>
  )
}
