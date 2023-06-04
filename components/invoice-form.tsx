"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

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
    .min(2, {
      message: "Customer name must be at least 2 characters.",
    })
    .max(30, {
      message: "Customer name must not be longer than 30 characters.",
    }),
  contact: z
    .string()
    .min(10, { message: "Contact number must be at least 10 digits." }),
  product: z.string({
    required_error: "Please select an product to continue.",
  }),
  amount: z.string().min(1, { message: "Amount muSt be at least 1 digit." }),
  mode: z.string({
    required_error: "Please select a language.",
  }),
})

const modes = [
  { label: "Cash", value: "cash" },
  { label: "Online", value: "online" },
  { label: "Cheque", value: "cheque" },
] as const

type InvoiceFormValues = z.infer<typeof formSchema>

// This can come from your database or API.
const defaultValues: Partial<InvoiceFormValues> = {
  customerName: "",
  contact: "",
}

export function InvoiceForm() {
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  function onSubmit(data: InvoiceFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified product." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="officebag">Office Bag</SelectItem>
                    <SelectItem value="schoolbag">School Bag</SelectItem>
                    <SelectItem value="airbag">Air Bag</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Categories of all product.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Payment mode</FormLabel>
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
                      <CommandInput placeholder="Search language..." />
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
