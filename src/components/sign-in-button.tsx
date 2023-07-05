"use client"

import { FC, useState } from "react"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

/**
 * NextJS does not allow to pass function from server -> client components,
 * hence this unreusable component.
 */

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true)
      await signIn("google")
    } catch (error) {
      toast({
        title: "Error signing in",
        description: "Please try again later.",
      })
    }
  }

  return (
    <Button onClick={signInWithGoogle} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
        </>
      ) : null}
      Sign in
    </Button>
  )
}

export default SignInButton
