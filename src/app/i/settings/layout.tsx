import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Settings | The Grind Academy'
}

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
