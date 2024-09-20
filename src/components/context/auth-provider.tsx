"use client"

import * as React from "react"
import { SessionProvider } from "next-auth/react"


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
