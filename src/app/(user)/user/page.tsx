import React from "react"
import { redirect } from "next/navigation"
import { Luggage, Receipt } from "lucide-react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/nextauth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePickerProvider } from "@/components/context/datepicker-provider"
import { OverviewContextProvider } from "@/components/context/temp-overview-provider"
import { InvoiceForm } from "@/components/form/invoice-form"
import { ItemForm } from "@/components/form/item-form"
import { Backpack } from "@/components/icons/backpack"
import { Bag } from "@/components/icons/bag"
import { Beach } from "@/components/icons/beach"
import { Bus } from "@/components/icons/bus"
import { Clutch } from "@/components/icons/clutch"

import Summary from "./summary"

interface Props {}

const page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login?callbackUrl=/dashboard")
  }
  if (session?.user?.role !== "ADMIN") {
    return (
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex flex-col items-center justify-center space-y-4 ">
          <h1 className="font-heading text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            You need to be an admin to access this page.
          </h1>
          <h1 className="max-w-[42rem] text-center leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            for becoming an admin please contact the developer at{" "}
            <a
              href="mailto:samaralishaikh212@gmail.com?subject=Regarding%20admin%20role."
              className="text-blue-500"
            >
              samaralishaikh212@gmail.com
            </a>
          </h1>
        </div>
      </section>
    )
  }
  return (
    <DatePickerProvider>
      <OverviewContextProvider>
        <section className="container grid items-center gap-6 py-10">
          {/* <div className="flex-1 space-y-4 px-4">
        <div className="flex h-16 items-center ">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome to Buzz
            </h2>
            <p className="text-gray-500">choose the category</p>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search..."
              className=" text-base md:w-[100px] lg:w-[300px]"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <RadioGroup
            defaultValue="backpack"
            className="grid grid-cols-5 gap-4"
          >
            <Label
              htmlFor="backpack"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem
                value="backpack"
                id="backpack"
                className="sr-only"
              />
              <Backpack className="mb-3 h-10 w-10" />
              Backpack
            </Label>
            <Label
              htmlFor="trolleybag"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem
                value="trolleybag"
                id="trolleybag"
                className="sr-only"
              />
              <Beach className="mb-3 h-10 w-10" />
              Trolley Bag
            </Label>
            <Label
              htmlFor="dufflebag"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem
                value="dufflebag"
                id="dufflebag"
                className="sr-only"
              />
              <Bus className="mb-3 h-10 w-10" />
              Duffle Bag
            </Label>
            <Label
              htmlFor="ladiesbag"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem
                value="ladiesbag"
                id="ladiesbag"
                className="sr-only"
              />
              <Clutch className="mb-3 h-10 w-10" />
              Ladies Bag
            </Label>
            <Label
              htmlFor="general"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem
                value="general"
                id="general"
                className="sr-only"
              />
              <Bag className="mb-3 h-10 w-10" />
              General
            </Label>
          </RadioGroup>
        </div>
      </div> */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card>
              <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className=" text-xl font-bold  md:text-2xl">
                  Choose Product
                </CardTitle>
                <Luggage className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ItemForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold md:text-2xl">
                  New Invoice
                </CardTitle>
                <Receipt className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <InvoiceForm />
              </CardContent>
            </Card>
          </div>
          <Summary />
        </section>
      </OverviewContextProvider>
    </DatePickerProvider>
  )
}

export default page
