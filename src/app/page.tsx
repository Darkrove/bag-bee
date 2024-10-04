import Link from "next/link"
import { ChevronRight, LayoutDashboard, LogIn } from "lucide-react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/nextauth"
import { buttonVariants } from "@/components/ui/button"

import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background md:shadow-xl">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <a
            className="group mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-[#00B899] bg-white px-7 py-2 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50"
            target="_blank"
            href="https://famousbag.vercel.app/"
            rel="noreferrer"
          >
            <p className="text-sm font-semibold text-gray-700">
              Famous Bag House
            </p>
            <ChevronRight className="-ml-1 h-3.5 w-3.5 text-gray-700" />
          </a>

          <h1 className="font-display text-4xl font-extrabold leading-[1.15]  sm:text-6xl sm:leading-[1.15]">
            a{" "}
            <span className="bg-gradient-to-br from-primary to-green-300 bg-clip-text text-transparent">
              POS
            </span>{" "}
            system for managing business
          </h1>
          <h2 className="mt-5 dark:text-gray-200 text-gray-600 sm:text-xl">
            “Forget past mistakes. Forget failures. Forget everything except
            what you&apos;re going to do now and do it.”
          </h2>

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
              className={buttonVariants({ size: "lg" })}
            >
              <span className="flex items-center justify-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </span>
            </Link>
          )}
          
        </div>
      </section>
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[150%] skew-y-12",
        )}
      />
    </div>
  )
}
