// import React from "react"
// import Link from "next/link"
// import { formatDistance } from "date-fns"
// import { ChevronRight } from "lucide-react"

// import { Separator } from "@/components/ui/separator"
// import { TableDemo } from "@/components/sales-table"

// interface Props {}

// export default async function page() {
//   let ENDPOINT
//   if (process.env.NODE_ENV === "development") {
//     ENDPOINT = "http://localhost:3000/api/get"
//   } else {
//     ENDPOINT = "https://buzzbag.vercel.app/api/get"
//   }
//   const result = await fetch(ENDPOINT, { cache: "no-store" }).then((res) =>
//     res.json()
//   )
//   const serializableSales = result?.data?.map((sale: { createdAt: Date }) => ({
//     ...sale,
//     timestamp: formatDistance(new Date(sale.createdAt), new Date()),
//   }))
//   // console.log(serializableSales)

//   return (
//     <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
//       <div className="flex items-center justify-start space-x-1">
//         <Link href="/" className="underline opacity-80">
//           Home
//         </Link>
//         <ChevronRight className="h-5 w-5" />
//         <h3>Sales table</h3>
//       </div>
//       <Separator />
//       <TableDemo TableData={serializableSales} />
//     </section>
//   )
// }

import { redirect } from "next/navigation"
import { formatDistance } from "date-fns"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { Payment, columns } from "@/components/payments/columns"
import { DataTable } from "@/components/payments/data-table"

async function getData(): Promise<Payment[]> {
  let ENDPOINT
  if (process.env.NODE_ENV === "development") {
    ENDPOINT = "http://localhost:3000/api/get"
  } else {
    ENDPOINT = "https://buzzbag.vercel.app/api/get"
  }
  const result = await fetch(ENDPOINT, { cache: "no-store" }).then((res) =>
    res.json()
  )
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
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
