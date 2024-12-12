import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Course | The Grind Academy'
}

export default function CourseLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
