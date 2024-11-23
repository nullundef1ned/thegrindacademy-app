import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Overview | The Grind Academy'
}

export default function OverviewLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
