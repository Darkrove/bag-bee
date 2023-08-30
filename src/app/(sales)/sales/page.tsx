import { redirect } from "next/navigation"
import { formatDistance } from "date-fns"
import { getServerSession } from "next-auth"

import { apiUrls } from "@/lib/api-urls"
import { authOptions } from "@/lib/nextauth"
import { Payment, columns } from "@/components/payments/columns"
import { DataTable } from "@/components/payments/data-table"

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
        <div className="container flex flex-col items-center justify-center space-y-4 ">
          <h1 className="font-heading text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            You need to be an admin to access this page.
          </h1>
          <h1 className="max-w-[42rem] text-center leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            for becoming an admin please contact the developer at{" "}
            <a
              href="mailto:samaralishaikh212@gmail.com?subject=Regarding%20admin%20role."
              className="text-blue-500"
            >
              samaralishaikh212@gmail.com
            </a>
          </h1>
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
