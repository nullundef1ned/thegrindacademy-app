import { Fragment, ReactNode } from "react"

export function generateMetadata({ params }: { params: { id: string } }) {
  if (params.id === 'new') {
    return {
      title: `Add New Student Interview | The Grind Academy`
    }
  }
  return {
    title: `Student Interview | The Grind Academy`
  }
}

export default function StudentInterviewLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}