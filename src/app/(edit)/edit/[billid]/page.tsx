import React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/nextauth"

import EditInvoice from "./edit-invoice"

interface Props {
  params: {
    billid: string
  }
}
const page = async ({ params: { billid } }: Props) => {
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
    <section className="container items-center gap-6 pb-8 pt-6 md:py-10">
      <EditInvoice id={billid} />
    </section>
  )
}

export default page
