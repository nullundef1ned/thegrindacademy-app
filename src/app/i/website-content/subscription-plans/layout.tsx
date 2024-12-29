import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Subscription Plans | The Grind Academy'
}

export default function DynamicContentLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}