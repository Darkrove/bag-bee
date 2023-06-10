import * as React from "react"
import { ReactElement } from "react"
import Link from "next/link"
import { Button } from "@/ui/button"
import { Menu } from "lucide-react"

import { docsConfig, siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Icons } from "@/components/icons"

const MobileNav = () => {
  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            <Menu className="h-6 w-6" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={24}
          alignOffset={4}
          className="w-[300px] overflow-scroll"
        >
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center">
              <Icons.logo className="mr-2 h-4 w-4" /> {siteConfig.name}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <ScrollArea className="h-[400px]">
            {docsConfig.mainNav?.map(
              (item, index) =>
                item.href && (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </DropdownMenuItem>
                )
            )}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </React.Fragment>
  )
}

export default MobileNav
