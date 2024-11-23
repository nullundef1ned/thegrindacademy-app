import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/helper.util"
import Link from "next/link"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] text-xs font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/70",
        warning:
          "bg-[#EBB3C6] text-[#50051E] hover:bg-[#EBB3C6]/90",
        destructive:
          "bg-[#950229] text-[#F9E7ED] hover:bg-[#950229]/90",
        outline:
          "border border-accent text-accent bg-background hover:border-muted hover:text-muted",
        secondary:
          "bg-[#00246B80] border border-[#002F8C9C] text-primary-50 hover:bg-[#00246B9C]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-1.5",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
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
  href?: string;
  target?: string;
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, target, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    if (href) {
      return (
        <Link href={href} target={target}>
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        </Link>
      )
    }

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
