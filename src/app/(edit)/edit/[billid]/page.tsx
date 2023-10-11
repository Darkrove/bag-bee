import React from "react"

import EditInvoice from "./edit-invoice"

interface Props {
  params: {
    billid: string
  }
}
const page = ({ params: { billid } }: Props) => {
  return (
    <section className="container items-center gap-6 pb-8 pt-6 md:py-10">
      <EditInvoice id={billid} />
    </section>
  )
}

export default page
