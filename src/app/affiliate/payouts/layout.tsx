import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Payouts | The Grind Academy'
}

export default function PayoutsLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
