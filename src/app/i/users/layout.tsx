import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Website Content | The Grind Academy'
}

export default function WebsiteContentLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
