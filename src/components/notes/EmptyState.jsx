import { FileText, Plus } from 'lucide-react'
import useNotesStore from '../../store/useNotesStore'

export default function EmptyState({ variant = 'all' }) {
  const createNote = useNotesStore((s) => s.createNote)
  const setSearchQuery = useNotesStore((s) => s.setSearchQuery)
  const setFilterColor = useNotesStore((s) => s.setFilterColor)

  const messages = {
    all: {
      title: 'No notes yet',
      description: 'Capture your ideas, tasks, and thoughts. Your notes save automatically.',
    },
    pinned: {
      title: 'No pinned notes',
      description: 'Pin important notes to keep them at the top of your workspace.',
    },
    search: {
      title: 'No matches found',
      description: 'Try a different search term or clear your filters.',
    },
    recent: {
      title: 'No recent activity',
      description: 'Notes you edit will appear here.',
    },
  }

  const msg = messages[variant] || messages.all

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-2xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/40 dark:to-indigo-900/40">
          <FileText className="h-10 w-10 text-violet-500 dark:text-violet-400" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{msg.title}</h3>
      <p className="mb-8 max-w-sm text-sm text-gray-500 dark:text-gray-400">{msg.description}</p>
      {variant === 'search' ? (
        <button
          type="button"
          onClick={() => {
            setSearchQuery('')
            setFilterColor(null)
          }}
          className="rounded-xl border border-black/10 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-black/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Clear filters
        </button>
      ) : (
        <button
          type="button"
          onClick={createNote}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Create your first note
        </button>
      )}
    </div>
  )
}
