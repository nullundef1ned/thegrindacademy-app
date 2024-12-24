import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Finance Reports | The Grind Academy'
}

export default function FinanceReportsLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
