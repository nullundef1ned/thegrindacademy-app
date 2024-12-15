import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Influencer | Website Content'
}

export default function InfluencerLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}