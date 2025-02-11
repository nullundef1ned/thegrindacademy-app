import * as React from "react"

import { cn } from "@/utils/helper.util"
import IconifyIcon from "../IconifyIcon"
import clsx from "clsx"
import { FormikErrors, FormikTouched } from "formik"

interface InputProps<T> extends React.ComponentProps<"input"> {
  icon?: string
  errors?: FormikErrors<T>
  touched?: FormikTouched<T>
  title?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps<unknown>>(
  ({ className, type, icon, errors, touched, title, ...props }, ref) => {
    const error = errors?.[props.name as keyof typeof errors]
    const isTouched = touched?.[props.name as keyof typeof touched]
    const isError = error && isTouched

    return (
      <div className="flex flex-col gap-2 w-full">
        {title && <p className="text-xs font-medium">{title}</p>}
        <div className={clsx('relative', className)}>
          {icon && <IconifyIcon icon={icon} className='absolute left-3 top-3.5 text-primary-100' />}
          <input
            type={type}
            className={cn(
              icon && '!pl-10', isError && '!border-red-600',
              "flex w-full rounded border border-[#B0CAFF1A] bg-[#00246B33] px-3 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#E6EEFF/50] focus-visible:outline-none focus-visible:ring-[#00246B] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className
            )}
            ref={ref}
            {...props}
          />
          {isError && <p className='text-red-600 text-xs mt-1.5'>{error}</p>}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
