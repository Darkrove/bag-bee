"use client"

import { FC, useState } from "react"
import { Loader2 } from "lucide-react"
import { signIn, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

/**
 * NextJS does not allow to pass function from server -> client components,
 * hence this unreusable component.
 */

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signUserOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again later.",
      })
    }
  }

  return (
    <Button onClick={signUserOut} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
        </>
      ) : null}
      Sign out
    </Button>
  )
}

export default SignOutButton
