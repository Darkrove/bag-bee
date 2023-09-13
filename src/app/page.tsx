import Link from "next/link"
import { ChevronRight, LayoutDashboard, LogIn } from "lucide-react"
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
            className="group mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50"
            target="_blank"
            href="http://buzzbag.vercel.app/"
            rel="noreferrer"
          >
            <p className="text-sm font-semibold text-gray-700">
              Famous Bag House
            </p>
            <ChevronRight className="-ml-1 h-3.5 w-3.5 text-gray-700" />
          </a>

          <h1 className="font-display text-4xl font-extrabold leading-[1.15]  sm:text-6xl sm:leading-[1.15]">
            a{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
              POS
            </span>{" "}
            system for managing buisness
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
