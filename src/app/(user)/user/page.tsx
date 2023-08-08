import React from "react"

interface Props {}

const page = () => {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex flex-col items-center justify-center ">
        <h1 className="font-heading text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          You need to be an admin to access this page.
        </h1>
      </div>
    </section>
  )
}

export default page
