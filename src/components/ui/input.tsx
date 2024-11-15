import * as React from "react"

import { cn } from "@/utils/helper.util"
import IconifyIcon from "../IconifyIcon"
import clsx from "clsx"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { icon?: string }>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className={clsx('relative', className)}>
        {icon && <IconifyIcon icon={icon} className='absolute left-3 top-1/2 -translate-y-1/2 text-primary-100' />}
        <input
          type={type}
          className={cn(
            icon && '!pl-10',
            "flex w-full rounded border border-[#B0CAFF1A] bg-[#00246B33] px-3 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#E6EEFF] focus-visible:outline-none focus-visible:ring-[#00246B] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
