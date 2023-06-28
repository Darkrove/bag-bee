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
  product: z.string().refine((value) => value.length > 0, {
    message: "Please select a product to continue.",
    path: ["product"],
  }),
  quantity: z.string().min(1, "Quantity must be at least 1 digit."),
  amount: z.string().min(1, "Amount must be at least 1 digit."),
  mode: z.string().refine((value) => value.length > 0, {
    message: "Please select a payment mode.",
    path: ["mode"],
  }),
  code: z.string().min(2, "Code must be at least 2 characters."),
  dealerCode: z.string().refine((value) => value.length > 0, {
    message: "Please select a dealer code.",
    path: ["dealerCode"],
  }),
})
const modes = [
  { label: "Cash", value: "cash" },
  { label: "Online", value: "online" },
  { label: "Cheque", value: "cheque" },
] as const

const products = [
  { label: "Office Bag", value: "officebag" },
  { label: "School Bag", value: "schoolbag" },
  { label: "Air Bag", value: "airbag" },
  { label: "Laptop Bag", value: "laptopbag" },
  { label: "Trolley Bag", value: "trolleybag" },
  { label: "Duffel Bag", value: "duffelbag" },
  { label: "Sling Bag", value: "slingbag" },
  { label: "Wallet", value: "wallet" },
  { label: "Belt", value: "belt" },
  { label: "General", value: "general" },
] as const

const dealers = [
  { label: "Luggage king", value: "idr" },
  { label: "Goodwin", value: "gwd" },
  { label: "Legon bag", value: "lgb" },
  { label: "Fly bag", value: "fly" },
  { label: "Zabco bag", value: "zab" },
  { label: "Market", value: "mar" },
  { label: "Peri bag", value: "per" },
  { label: "Dubbly bag", value: "sur" },
] as const

type InvoiceFormValues = z.infer<typeof formSchema>

// This can come from your database or API.
const defaultValues: Partial<InvoiceFormValues> = {
  customerName: "",
  contact: "",
  address: "dombivli - 421201",
  quantity: "1",
}

export function InvoiceForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  async function postData(data: InvoiceFormValues) {
    const codeToDigit: { [key: string]: number } = {
      B: 0,
      L: 9,
      A: 8,
      C: 7,
      K: 6,
      S: 5,
      T: 4,
      O: 3,
      N: 2,
      E: 1,
    }

    const characters: string[] = data.code.toUpperCase().split("")
    const digits: number[] = characters.map(
      (character) => codeToDigit[character]
    )
    const correspondingNumber: string = digits.join("")
    const profit: number = data.amount - correspondingNumber
    console.log(profit)
    const convertData = {
      customerName: data.customerName,
      customerPhone: data.contact,
      customerAddress: data.address,
      prouctCategory: data.product,
      quantity: data.quantity,
      amount: data.amount,
      paymentMode: data.mode,
      code: data.code,
      profit: profit,
      dealerCode: data.dealerCode,
    }
    let ENDPOINT
    if (process.env.NODE_ENV === "development") {
      ENDPOINT = "http://localhost:3000/api/post"
    } else {
      ENDPOINT = "https://buzzbag.vercel.app/api/post"
    }
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(convertData),
    })

    const result = await response.json()
    return result
  }

  async function onSubmit(data: InvoiceFormValues) {
    setIsLoading(true)
    try {
      const res = await postData(data)
      // toast({
      //   title: "You submitted the following values:",
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // })
      if (res.success) {
        toast({
          title: "Success",
          description: "Inovice created successfully.",
        })
      }
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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

          {/* quantity */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormDescription>
                  This is product quantity for billing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="345" {...field} />
                </FormControl>
                <FormDescription>
                  This is total amount for billing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="OSB" {...field} />
                </FormControl>
                <FormDescription>
                  This is purchase code for billing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* product */}
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel className="leading-[1.50rem]">
                  Product category
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
                          ? products.find(
                              (product) => product.value === field.value
                            )?.label
                          : "Select category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {products.map((product) => (
                          <CommandItem
                            value={product.value}
                            key={product.value}
                            onSelect={(value) => {
                              form.setValue("product", value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                product.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {product.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the product category for billing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* dealer code */}
          <FormField
            control={form.control}
            name="dealerCode"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel className="leading-[1.50rem]">Dealer code</FormLabel>
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
                          ? dealers.find(
                              (dealer) => dealer.value === field.value
                            )?.label
                          : "Select dealer code"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search code..." />
                      <CommandEmpty>No dealer code found.</CommandEmpty>
                      <CommandGroup>
                        {dealers.map((dealer) => (
                          <CommandItem
                            value={dealer.value}
                            key={dealer.value}
                            onSelect={(value) => {
                              form.setValue("dealerCode", value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                dealer.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {dealer.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the product category for billing.
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
            </>
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  )
}
