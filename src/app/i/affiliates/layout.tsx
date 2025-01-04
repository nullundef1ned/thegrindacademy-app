import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Affiliates | The Grind Academy'
}

export default function AffiliatesLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}