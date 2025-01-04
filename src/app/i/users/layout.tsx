import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Users | The Grind Academy'
}

export default function UsersLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
