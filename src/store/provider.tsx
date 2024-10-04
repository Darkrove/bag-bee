"use client"

import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
import { Provider } from "react-redux"

import { store } from "./store"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <ProgressBar
        height="2px"
        color="hsl(var(--primary))"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </Provider>
  )
}
