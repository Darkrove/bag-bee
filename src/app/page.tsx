import Link from "next/link"
import { LayoutDashboard, LogIn } from "lucide-react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/nextauth"
import { buttonVariants } from "@/components/ui/button"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <a
            className="rounded-2xl bg-primary/75 px-4 py-1.5 text-sm font-medium"
            target="_blank"
            href="https://bag-bee.vercel.app/"
            rel="noreferrer"
          >
            Famous Bag House
          </a>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            a POS system for managing buisness
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            “Forget past mistakes. Forget failures. Forget everything except
            what you&apos;re going to do now and do it.”
          </p>

          {session ? (
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href="/dashboard"
            >
              <span className="flex items-center justify-center space-x-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <span className="flex items-center justify-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </span>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
