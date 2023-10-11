import "@/styles/globals.css"
import { Metadata } from "next"
import { Providers } from "@/store/provider"
import { Toaster } from "sonner"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
// import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "@/components/context/auth-provider"
import { ThemeProvider } from "@/components/context/theme-provider"
import SiteHeader from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
// }

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "sajjad shaikh",
      url: "https://github.com/Darkrove",
    },
  ],
  creator: "sajjad",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            async
            defer
            data-website-id="cba60c13-c7b2-457d-b358-79c1c3d216aa"
            src="https://u-sajjadshaikh.vercel.app/umami.js"
          ></script>
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <AuthProvider>
                <div className="relative flex min-h-screen flex-col">
                  {/* @ts-expect-error server Component */}
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                </div>
                <TailwindIndicator />
              </AuthProvider>
            </ThemeProvider>
          </Providers>
          <Toaster richColors position="top-right" />
        </body>
      </html>
    </>
  )
}
