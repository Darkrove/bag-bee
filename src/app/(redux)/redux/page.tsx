/* eslint-disable @next/next/no-img-element */
"use client"

import { decrement, increment, reset } from "@/store/features/counter-slice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useGetUsersQuery } from "@/store/services/user-api"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value)
  const dispatch = useAppDispatch()
  const { isLoading, isFetching, data, error } = useGetUsersQuery(null)

  return (
    <main className="flex flex-col items-center justify-center gap-6 p-10">
      <div className="flex items-center justify-center space-x-2">
        <Button onClick={() => dispatch(increment())}>+</Button>
        <h4>{count}</h4>
        <Button onClick={() => dispatch(decrement())}>-</Button>
      </div>
      <Button onClick={() => dispatch(reset())}>C</Button>

      <p>
        Edit <code>src/app/(redux)/redux/page.tsx</code> and save to test REDUX
      </p>
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {data.map((user) => (
            <Card key={user.id}>
              <CardContent>
                <img
                  src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                  alt={user.name}
                  style={{ height: 180, width: 180 }}
                />
              </CardContent>
              <CardFooter className="text-center">
                {user.name}#{user.id}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : null}
    </main>
  )
}
