import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'New User | The Grind Academy'
}

export default function UsersLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
