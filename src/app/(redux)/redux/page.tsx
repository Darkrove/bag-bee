"use client"

import { decrement, increment, reset } from "@/store/features/counter-slice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

import { Button } from "@/components/ui/button"

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value)
  const dispatch = useAppDispatch()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-center space-x-2">
        <Button onClick={() => dispatch(increment())}>+</Button>
        <h4>{count}</h4>
        <Button onClick={() => dispatch(decrement())}>-</Button>
      </div>
      <Button onClick={() => dispatch(reset())}>C</Button>

      <p>
        Edit <code>src/app/(redux)/redux/page.tsx</code> and save to test REDUX
      </p>
    </main>
  )
}
