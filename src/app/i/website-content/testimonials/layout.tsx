import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Testimonials | The Grind Academy'
}

export default function TestimonialsLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}