import { ReactNode } from "react"

export const metadata = {
  title: 'Login | The Grind Academy',
  description: 'Login to your The Grind Academy account'
}

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
