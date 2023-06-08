import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { InvoiceForm } from "@/components/invoice-form"

export const runtime = "edge"

interface Props {}

const page = async () => {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex items-center justify-start space-x-1">
        <Link href="/" className="underline opacity-80">
          Home
        </Link>
        <ChevronRight className="h-5 w-5" />
        <h3>Invoice generator</h3>
      </div>

      <Separator />
      <InvoiceForm />
    </section>
  )
}

export default page
