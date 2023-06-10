import React from "react"
import Link from "next/link"
import { ChevronRight, Table } from "lucide-react"

import { Separator } from "@/components/ui/separator"

interface Props {}

const page = () => {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex items-center justify-start space-x-1">
        <Link href="/" className="underline opacity-80">
          Home
        </Link>
        <ChevronRight className="h-5 w-5" />
        <h3>Sales table</h3>
      </div>
      <Separator />
    </section>
  )
}

export default page
