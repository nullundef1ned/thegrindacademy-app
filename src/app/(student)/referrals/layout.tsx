import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Referrals | The Grind Academy'
}

export default function ReferralsLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
