import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Meta Information | The Grind Academy'
}

export default function MetaInformationLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}