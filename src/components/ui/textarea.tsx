import * as React from "react"

import { cn } from "@/utils/helper.util"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { title?: string }
>(({ className, title, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {title && <p className="text-xs font-medium">{title}</p>}
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-[#B0CAFF1A] bg-[#00246B33] p-3 text-base ring-offset-background placeholder:text-[#E6EEFF/50] focus-visible:outline-none focus-visible:ring-[#00246B] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
