import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'FAQs | The Grind Academy'
}

export default function FAQsLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}