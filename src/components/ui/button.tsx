import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark hover:shadow-luxury hover:scale-105 shadow-crisp",
        hero: "bg-gradient-hero text-primary-foreground hover:shadow-premium hover:scale-105 transition-luxury font-bold tracking-wide",
        luxury: "bg-gradient-luxury text-primary-foreground hover:shadow-luxury hover:scale-105 transition-luxury font-bold",
        premium: "bg-gradient-premium text-accent-foreground hover:shadow-premium hover:scale-105 transition-luxury font-bold",
        accent: "bg-accent text-accent-foreground hover:bg-accent-dark hover:shadow-glow hover:scale-105 transition-luxury",
        tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary-light hover:shadow-glow hover:scale-105 transition-luxury",
        success: "bg-success text-success-foreground hover:bg-success-light hover:scale-105 shadow-soft",
        warning: "bg-warning text-warning-foreground hover:scale-105 shadow-soft",
        processing: "bg-processing text-processing-foreground hover:scale-105 shadow-soft",
        error: "bg-error text-error-foreground hover:scale-105 shadow-soft",
        destructive: "bg-destructive text-destructive-foreground hover:scale-105 shadow-soft",
        outline: "border-2 border-primary/20 bg-background hover:bg-primary/5 hover:border-primary hover:text-primary hover:scale-105 transition-luxury",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-dark hover:scale-105 transition-luxury",
        ghost: "hover:bg-primary/10 hover:text-primary hover:scale-105 transition-luxury",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-dark transition-luxury",
        glass: "glass-card text-foreground hover:scale-105 transition-luxury"
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-13 rounded-xl px-8 text-base font-bold",
        xl: "h-16 rounded-2xl px-12 text-lg font-bold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
