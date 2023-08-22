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
        {/* <div className="w-full rounded-lg  bg-secondary p-4 shadow  sm:w-1/2">
          <h1 className="text-xl font-bold">Choose Product</h1>
          <ItemForm />
        </div> */}
        <Card>
          <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className=" text-xl md:text-2xl  font-bold">
              Choose Product
            </CardTitle>
            <Luggage className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ItemForm />
            {/* <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl md:text-2xl font-bold">
              New Invoice
            </CardTitle>
            <Receipt className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* <div className="py-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input type="text" placeholder="customer name" />
              <Input type="text" placeholder="customer number" />
              <Input type="text" placeholder="address" />
            </div> */}
            <InvoiceForm />

            {/* <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p> */}
          </CardContent>
        </Card>

        {/* <div className="w-full rounded-lg  bg-slate-50 p-4 shadow sm:w-1/2">
          <h1 className="text-xl font-bold">New Invoice</h1>
          <div className="py-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input type="text" placeholder="customer name" />
            <Input type="text" placeholder="customer number" />
            <Input type="text" placeholder="address" />
          </div>
          <div>
            <div className="mx-auto py-3">
              <h1 className="text-xl font-bold mb-4">Item List</h1>
              <div className="shadow bg-white rounded-md flex flex-col gap-3">
                <div className="flex flex-row px-3 justify-between">
                  <div className="flex flex-col">
                    <p className="font-bold text-md">College Bag</p>
                    <p>1 x ₹480</p>
                  </div>
                  <div className="flex items-center">
                    <h3 className="font-bold mr-4">₹ 480.00</h3>
                    <button className="rounded-full p-2 bg-red-600 text-white hover:bg-red-700 transition">
                      <span className="text-lg">&times;</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-row px-3 justify-between">
                  <div className="flex flex-col">
                    <p className="font-bold text-md">College Bag</p>
                    <p>1 x ₹3800</p>
                  </div>
                  <div className="flex items-center">
                    <h3 className="font-bold mr-4">₹ 3800.00</h3>
                    <button className="rounded-full p-2 bg-red-600 text-white hover:bg-red-700 transition">
                      <span className="text-lg">&times;</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-row p-5 items-center justify-between rounded-b-md bg-slate-600 h-20">
                  <p className="text-md font-bold text-white">Total</p>
                  <p className="text-xl font-bold text-white">₹4280</p>
                </div>
              </div>
            </div>
            <Button className="w-full">Create Invoice</Button>
          </div>
        </div> */}
      </div>
      <Summary />
    </section>
  )
}

export default page
