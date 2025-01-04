import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Resources | The Grind Academy'
}

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
