"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader2,
  Plus,
  Trash,
} from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  customerName: z
    .string()
    .min(2, "Customer name must be at least 2 characters.")
    .max(30, "Customer name must not be longer than 30 characters."),
  contact: z.string().min(10, "Contact number must be at least 10 digits."),
  address: z.string().min(2, "Address must be at least 2 characters."),
  mode: z.string().refine((value) => value.length > 0, {
    message: "Please select a payment mode.",
    path: ["mode"],
  }),
})
const modes = [
  { label: "Cash", value: "cash" },
  { label: "Online", value: "online" },
  { label: "Card", value: "card" },
  { label: "Cheque", value: "cheque" },
] as const

type InvoiceFormValues = z.infer<typeof formSchema>

// This can come from your database or API
const defaultValues: Partial<InvoiceFormValues> = {
  customerName: "local",
  contact: "1234567890",
  address: "dombivli - 421201",
}

export function InvoiceForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  async function onSubmit(data: InvoiceFormValues) {
    setIsLoading(true)
    try {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to process.",
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* customer name */}
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer name</FormLabel>
                <FormControl>
                  <Input placeholder="sajjad shaikh" {...field} />
                </FormControl>
                <FormDescription>
                  This is customer name for billing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* contact number */}
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact number</FormLabel>
                <FormControl>
                  <Input placeholder="8433624344" {...field} />
                </FormControl>
                <FormDescription>
                  This is contact number for billing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer address</FormLabel>
                <FormControl>
                  <Input placeholder="dombivli" {...field} />
                </FormControl>
                <FormDescription>
                  This is customer address for billing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* mode */}
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="leading-[1.50rem]">
                  Payment mode
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? modes.find((mode) => mode.value === field.value)
                              ?.label
                          : "Select mode"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search mode..." />
                      <CommandEmpty>No mode found.</CommandEmpty>
                      <CommandGroup>
                        {modes.map((mode) => (
                          <CommandItem
                            value={mode.value}
                            key={mode.value}
                            onSelect={(value) => {
                              form.setValue("mode", value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                mode.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {mode.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the mode that will be used in the database.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mx-auto">
          <h1 className="mb-4 text-xl font-bold">Item List</h1>
          <div className="flex flex-col gap-3 rounded-md bg-muted shadow">
            <div className="flex flex-row justify-between px-3 py-2">
              <div className="flex flex-col">
                <p className="text-md font-bold">College Bag</p>
                <p className="text-muted-foreground">1 x ₹480</p>
              </div>
              <div className="flex items-center">
                <h3 className="mr-4 font-bold">₹ 480.00</h3>
                <Button
                  size="icon"
                  variant="destructive"
                  className="ml-auto rounded-full"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-row justify-between px-3">
              <div className="flex flex-col">
                <p className="text-md font-bold">Trolley Bag</p>
                <p className="text-muted-foreground">1 x ₹3800</p>
              </div>
              <div className="flex items-center">
                <h3 className="mr-4 font-bold">₹ 3800.00</h3>
                <Button
                  size="icon"
                  variant="destructive"
                  className="ml-auto rounded-full"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex h-20 flex-row items-center justify-between rounded-b-md bg-[#373b53] p-5">
              <p className="text-md font-bold text-white">Total</p>
              <p className="text-xl font-bold text-white">₹4280</p>
            </div>
          </div>
        </div>

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
            </>
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          Create Invoice
        </Button>
      </form>
    </Form>
  )
}