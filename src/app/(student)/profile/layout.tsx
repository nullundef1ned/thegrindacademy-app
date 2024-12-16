import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Profile | The Grind Academy'
}

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
