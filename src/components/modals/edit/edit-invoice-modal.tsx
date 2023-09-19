"uSe client"

import React, { useState } from "react"
import { InferModel } from "drizzle-orm"
import { Pencil } from "lucide-react"
import useSWR from "swr"

import { apiUrls } from "@/lib/api-urls"
import { invoice, invoiceItems } from "@/lib/db/schema"
import useWindowSize from "@/hooks/useWindowSize"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaflet } from "@/components/ui/leaflet"
import { RoundButton } from "@/components/ui/round-button"

type Invoice = InferModel<typeof invoice>
type InvoiceItems = InferModel<typeof invoiceItems>
interface Props {
  id: string
  data: {
    id: number
    customerName: string | null
    customerPhone: string
    customerAddress: string | null
    cashierName: string
    totalAmount: number
    totalProfit: number
    totalQuantity: number
    paymentMode: string | null
    warrantyPeriod: number
    createdAt: Date
    updatedAt: Date
    items: InvoiceItems[]
  }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const EditInvoiceModalHelper = ({ id, data }: Props) => {
  const [openPopover, setOpenPopover] = useState(false)
  const { isMobile, isDesktop } = useWindowSize()
  const renderBody = () => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          defaultValue={data?.customerName ? data.customerName : "Local"}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="contact" className="text-right">
          Contact
        </Label>
        <Input
          id="contact"
          defaultValue={data?.customerPhone ? data.customerPhone : "123456789"}
          className="col-span-3"
        />
      </div>
    </div>
  )
  const renderFooter = () => <Button type="submit">Save changes</Button>
  return (
    <div>
      {isMobile && (
        <RoundButton onClick={() => setOpenPopover((prev) => !prev)}>
          <span className="sr-only">Edit</span>
          <Pencil className="h-4 w-4 text-secondary-foreground  transition-all group-hover:text-green-800" />
        </RoundButton>
      )}
      {openPopover && isMobile && (
        <Leaflet setShow={setOpenPopover}>
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 p-4 sm:px-16">
            <h3 className="text-lg font-medium">Edit Invoice</h3>
          </div>
          <div className="flex flex-col space-y-6 bg-background/75 p-5 py-6 text-left sm:rounded-b-2xl">
            {renderBody()}
            {renderFooter()}
          </div>
        </Leaflet>
      )}
      {isDesktop && (
        <Dialog>
          <DialogTrigger asChild>
            <RoundButton>
              <span className="sr-only">Edit</span>
              <Pencil className="h-4 w-4 text-secondary-foreground transition-all group-hover:text-green-800" />
            </RoundButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            {renderBody()}
            <DialogFooter>{renderFooter()}</DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default EditInvoiceModalHelper
