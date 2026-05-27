import { Pin, Trash2, CheckSquare } from 'lucide-react'
import { formatRelativeDate } from '../../utils/date'
import { getColorClasses, truncate } from '../../utils/helpers'
import useNotesStore from '../../store/useNotesStore'

export default function NoteCard({ note, compact = false }) {
  const openNote = useNotesStore((s) => s.openNote)
  const togglePin = useNotesStore((s) => s.togglePin)
  const deleteNote = useNotesStore((s) => s.deleteNote)

  const completedCount = note.checklist.filter((i) => i.completed).length
  const previewItems = note.checklist.slice(0, compact ? 2 : 3)

  return (
    <article
      onClick={() => openNote(note.id)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-black/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/5 ${getColorClasses(note.color)} ${
        compact ? 'p-4' : 'p-5'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openNote(note.id)}
    >
      {/* Drag-feel hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/20 dark:group-hover:bg-white/5" />

      <div className="relative">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className={`line-clamp-1 font-semibold text-gray-900 dark:text-gray-100 ${compact ? 'text-sm' : 'text-base'}`}>
            {note.title || 'Untitled'}
          </h3>
          <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                togglePin(note.id)
              }}
              className={`rounded-lg p-1.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10 ${
                note.pinned ? 'text-amber-600 opacity-100' : 'text-gray-500'
              }`}
              aria-label={note.pinned ? 'Unpin note' : 'Pin note'}
            >
              <Pin className={`h-3.5 w-3.5 ${note.pinned ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                deleteNote(note.id)
              }}
              className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              aria-label="Delete note"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {note.pinned && (
          <Pin className="absolute -top-1 right-0 h-3 w-3 fill-amber-500 text-amber-500 opacity-60 group-hover:opacity-0" />
        )}

        {note.content && (
          <p className={`mb-3 text-gray-700/80 dark:text-gray-300/80 ${compact ? 'line-clamp-2 text-xs' : 'line-clamp-3 text-sm'}`}>
            {truncate(note.content, compact ? 80 : 120)}
          </p>
        )}

        {previewItems.length > 0 && (
          <ul className="mb-3 space-y-1">
            {previewItems.map((item) => (
              <li key={item.id} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <CheckSquare
                  className={`h-3 w-3 shrink-0 ${item.completed ? 'text-emerald-500' : 'text-gray-400'}`}
                />
                <span className={item.completed ? 'line-through opacity-60' : 'line-clamp-1'}>
                  {item.text}
                </span>
              </li>
            ))}
            {note.checklist.length > previewItems.length && (
              <li className="text-[11px] text-gray-500">
                +{note.checklist.length - previewItems.length} more
              </li>
            )}
          </ul>
        )}

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
            {formatRelativeDate(note.updatedAt)}
          </span>
          {note.checklist.length > 0 && (
            <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-white/10">
              {completedCount}/{note.checklist.length}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
