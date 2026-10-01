import StatusBadge from './StatusBadge'

export default function ProjectCardFooter({ item, onView, className = 'mt-5 pt-5' }) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-2 border-t border-border shrink-0 ${className}`}>
      <StatusBadge status={item.status} />
      <button
        type="button"
        onClick={onView}
        aria-label={`View Project: ${item.title}`}
        className="text-accent2 font-medium text-[0.85rem] hover:translate-x-1 transition-transform duration-200 inline-block cursor-pointer"
      >
        View Project
      </button>
    </div>
  )
}
