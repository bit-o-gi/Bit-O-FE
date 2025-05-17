import { Anniversary, AnniversaryItem } from '@/entities/anniversary'

interface IAnniversaryListProps {
  list: Anniversary[]
}

export function AnniversaryList({ list }: IAnniversaryListProps) {
  return (
    <div className="grid divide-y divide-slate-200">
      {list.map((anniv, idx) => (
        <AnniversaryItem key={idx} anniversary={anniv} />
      ))}
    </div>
  )
}
