"uSe client"

import React, { useState } from "react"
import { invoiceAtom } from "@/store/item-atom"
import { Invoice } from "@/store/item-data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { apiUrls } from "@/lib/api-urls"
import { invoice } from "@/lib/db/schema"
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaflet } from "@/components/ui/leaflet"
import { RoundButton } from "@/components/ui/round-button"

interface Props {}

const formSchema = z.object({
  customerName: z
    .string()
    .min(2, "Customer name must be at least 2 characters.")
    .max(30, "Customer name must not be longer than 30 characters."),
  customerPhone: z
    .string()
    .min(10, "Contact number must be at least 10 digits."),
})

type InvoiceFormValues = z.infer<typeof formSchema>

const EditInvoiceModalHelper = () => {
  const [openPopover, setOpenPopover] = useState(false)
  const { isMobile, isDesktop } = useWindowSize()
  const invoiceValue = useAtomValue(invoiceAtom)
  const setInvoiceValue = useSetAtom(invoiceAtom)

  const defaultValues: Partial<InvoiceFormValues> = {
    customerName: "local",
    customerPhone: "123456",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  const renderBody = () => (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="sajjad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Phone</FormLabel>
                <FormControl>
                  <Input placeholder="8433624344" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
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
              <DialogTitle>Edit Invoice</DialogTitle>
              <DialogDescription>
                Make changes to invoice here. Click save when you&apos;re done.
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
