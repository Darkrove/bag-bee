import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { sales } from "@/lib/db/schema"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { InvoiceForm } from "@/components/invoice-form"

interface Props {}

const page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login?callbackUrl=/invoice")
  }
  return (
    <section className="container mx-auto py-10">
      <InvoiceForm />
    </section>
  )
}

export default page
