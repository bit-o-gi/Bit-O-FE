import { ConnectStepPage } from '@/views/connect'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense>
      <ConnectStepPage type="create" />
    </Suspense>
  )
}
