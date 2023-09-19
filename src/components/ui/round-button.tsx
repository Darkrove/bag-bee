import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group rounded-full p-1.5 transition-all bg-secondary text-secondary-foreground duration-75 hover:scale-105 focus:outline-none active:scale-95",
  {
    variants: {
      variant: {
        default: "hover:bg-green-100",
        destructive: "hover:bg-red-100",
        secondary: "hover:bg-blue-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const RoundButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

RoundButton.displayName = "RoundButton"

export { RoundButton, buttonVariants }
