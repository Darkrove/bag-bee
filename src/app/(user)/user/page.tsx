import React from "react"
import { redirect } from "next/navigation"
import { Luggage, Receipt } from "lucide-react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/nextauth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { InvoiceForm } from "@/components/form/invoice-form"
import { ItemForm } from "@/components/form/item-form"
import { PrintableInvoice } from "@/components/printable-invoice"

interface Props {}

const page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login?callbackUrl=/dashboard")
  }
  if (session?.user?.role !== "ADMIN") {
    return (
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="mx-auto max-w-md text-center sm:max-w-xl">
          <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl sm:leading-tight">
            You need to be an{" "}
            <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              admin
            </span>{" "}
            to access this page.
          </h2>
          <p className="mt-5 text-gray-600 sm:text-lg">
            for becoming an admin please contact the developer at{" "}
            <a
              href="mailto:samaralishaikh212@gmail.com?subject=Regarding%20admin%20role."
              className="text-blue-500"
            >
              samaralishaikh212@gmail.com
            </a>
          </p>
        </div>
      </section>
    )
  }
  return (
    <section className="container  items-center gap-6 py-10">
      {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
      </div> */}
      <PrintableInvoice />
    </section>
  )
}

export default page
