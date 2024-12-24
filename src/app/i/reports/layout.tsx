import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Reports | The Grind Academy'
}

export default function ReportsLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}