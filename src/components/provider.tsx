"use client"

import type { FC, ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default Providers
