import React from "react"
import { redirect } from "next/navigation"
import format from "date-fns/format"
import { getServerSession } from "next-auth"
import QRCode from "react-qr-code"

import { authOptions } from "@/lib/nextauth"

import Invoice from "./invoicev2"

interface Props {
  params: {
    billid: string
  }
}

export default async function page({ params: { billid } }: Props) {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role

  return (
    <section className="container items-center gap-6 pb-8 pt-6 md:py-10">
      <Invoice id={billid} userRole={role} />
    </section>
  )
}
