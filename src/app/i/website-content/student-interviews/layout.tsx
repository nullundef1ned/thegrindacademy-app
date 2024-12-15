import { Fragment, ReactNode } from "react"

export const metadata = {
  title: 'Student Interviews | The Grind Academy'
}

export default function StudentInterviewsLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}