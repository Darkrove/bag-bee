import React from "react"

import { Separator } from "@/components/ui/separator"
import { InvoiceForm } from "@/components/invoice-form"

interface Props {}

const page = () => {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Invoice generator <br className="hidden sm:inline" />
      </h1>
      <Separator />
      <InvoiceForm />
    </section>
  )
}

export default page
