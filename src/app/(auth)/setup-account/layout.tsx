import { ReactNode } from "react"

export const metadata = {
  title: 'Welcome to The Grind Academy',
  description: 'Setup your account to continue'
}

export default function SetupAccountLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
