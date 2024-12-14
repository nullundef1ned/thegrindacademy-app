import React, { Suspense } from 'react'

function SubscriptionLayout({ children }: { children: React.ReactNode }) {
  return children
}


export default function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <SubscriptionLayout>
        {children}
      </SubscriptionLayout>
    </Suspense>
  )
}
