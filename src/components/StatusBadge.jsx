import { workStatuses } from '../data/content'

const tones = {
  completed: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  live: { badge: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500 motion-safe:animate-pulse' },
  'in-development': { badge: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-500' },
}

export default function StatusBadge({ status }) {
  const tone = tones[status] ?? tones.completed
  return (
    <span className={`inline-flex items-center gap-1.5 border rounded-full py-0.5 px-2.5 text-[0.72rem] font-medium ${tone.badge}`}>
      <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
      {workStatuses[status] ?? status}
    </span>
  )
}
