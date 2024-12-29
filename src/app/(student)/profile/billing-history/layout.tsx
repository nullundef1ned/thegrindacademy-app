import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Billing History | The Grind Academy'
}

export default function BillingHistoryLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
