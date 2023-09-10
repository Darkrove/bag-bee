import Link from "next/link"
import { getServerSession } from "next-auth"

import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/nextauth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
// import MobileNav from "@/components/nav-mobile"
import MobileNav from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import SignInButton from "./sign-in-button"
import SignOutButton from "./sign-out-button"

const SiteHeader = async () => {
  const session = await getServerSession(authOptions)
  const fallback = session?.user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/50 backdrop-blur">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {session ? (
              <div className="hidden sm:inline-block">
                <div className="flex space-x-2 ">
                  <SignOutButton />
                  <Avatar>
                    <AvatarImage
                      src={session?.user?.image ?? ""}
                      alt="@sajjad"
                    />
                    <AvatarFallback>{fallback}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            ) : (
              <SignInButton />
            )}
            <div className="sm:hidden">
              <MobileNav />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
