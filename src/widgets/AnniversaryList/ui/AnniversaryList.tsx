import { AnniversaryItem } from '@/entities/anniversary'

export function AnniversaryList() {
  return (
    <>
      {Array(10).map((idx) => (
        <AnniversaryItem key={idx} />
      ))}
    </>
  )
}
