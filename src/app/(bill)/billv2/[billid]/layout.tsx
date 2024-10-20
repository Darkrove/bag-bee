import { Metadata } from "next"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: "Invoice",
    template: `%s | ${siteConfig.name}`,
  },
  description: "Your Invoice",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <>{children}</>
}
