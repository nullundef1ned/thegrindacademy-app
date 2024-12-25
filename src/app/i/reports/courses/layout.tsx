import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Course Reports | The Grind Academy'
}

export default function CoursesReportsLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}