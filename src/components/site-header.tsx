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
import { ModeToggle } from "@/components/theme-toggle"

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
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
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
      <div className="hidden sm:inline-block">
              <SignInButton />
        </div>
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
