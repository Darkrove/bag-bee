import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { InvoiceForm } from "@/components/invoice-form"

interface Props {}

const page = async () => {
  return (
    <section className="container mx-auto py-10">
      <InvoiceForm />
    </section>
  )
}

export default page
