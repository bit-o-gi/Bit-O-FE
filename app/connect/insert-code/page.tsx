import { ConnectStepPage } from '@/views/connect'
import { Suspense } from 'react'

export default function InsertCodePage() {
  return (
    <Suspense>
      <ConnectStepPage type="code" />
    </Suspense>
  )
}
