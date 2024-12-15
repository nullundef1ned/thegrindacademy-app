import { Fragment, ReactNode } from "react"

export function generateMetadata({ params }: { params: { id: string } }) {
  if (params.id === 'new') {
    return {
      title: `Add New Dynamic Section | The Grind Academy`
    }
  }
  return {
    title: `Dynamic Content Section | The Grind Academy`
  }
}

export default function DynamicContentDetailLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>
}