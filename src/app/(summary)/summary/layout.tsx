import { Metadata } from "next"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: "Summary",
    template: `%s | ${siteConfig.name}`,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <>{children}</>
}
