import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Courses | The Grind Academy'
}

export default function CoursesLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}
