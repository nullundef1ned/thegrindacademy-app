import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Influencer | The Grind Academy'
}

export default function InfluencerLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}