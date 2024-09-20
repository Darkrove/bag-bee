import { redirect } from "next/navigation"
import { formatDistance } from "date-fns"
import { getServerSession } from "next-auth"

import { apiUrls } from "@/lib/api-urls"
import { authOptions } from "@/lib/nextauth"
import { Payment, columns } from "@/components/payments/columns"
import { DataTable } from "@/components/payments/data-table"

export const dynamic = "force-dynamic"

async function getData(): Promise<Payment[]> {
  const result = await fetch(process.env.NEXTAUTH_URL + apiUrls.sales.getAll, {
    cache: "no-store",
  }).then((res) => res.json())

  const serializableSales = result?.data?.map((sale: { createdAt: Date }) => ({
    ...sale,
    timestamp: formatDistance(new Date(sale.createdAt), new Date()),
  }))
  return serializableSales
}

export default async function DemoPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login?callbackUrl=/sales")
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
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
