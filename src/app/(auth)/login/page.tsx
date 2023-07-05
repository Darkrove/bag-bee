import { FC } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import LargeHeading from "@/components/ui/large-heading"
import Paragraph from "@/components/ui/paragraph"
import UserAuthForm from "@/components/user-auth-form"

const page: FC = () => {
  return (
    <>
      <div className="container absolute inset-0 mx-auto flex h-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full max-w-lg flex-col justify-center space-y-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <Link
              className={buttonVariants({
                variant: "ghost",
                className: "w-fit",
              })}
              href="/"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <LargeHeading>Welcome back!</LargeHeading>
            <Paragraph>Please sign in using your Google account.</Paragraph>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </>
  )
}

export default page
