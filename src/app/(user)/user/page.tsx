import React from "react"
import { Luggage } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Backpack } from "@/components/icons/backpack"
import { Bag } from "@/components/icons/bag"
import { Beach } from "@/components/icons/beach"
import { Bus } from "@/components/icons/bus"
import { Clutch } from "@/components/icons/clutch"

interface Props {}

const page = () => {
  return (
    <section className="container grid items-center gap-6 py-10">
      <div className="flex-1 space-y-4 px-4">
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
      </div>
    </section>
  )
}

export default page
