import { Plus } from 'lucide-react'
import useNotesStore from '../../store/useNotesStore'

export default function FloatingAddButton() {
  const createNote = useNotesStore((s) => s.createNote)

  return (
    <button
      type="button"
      onClick={createNote}
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/40 active:scale-95 sm:bottom-8 sm:right-8"
      aria-label="Create new note"
      title="New note (⌘N)"
    >
      <Plus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
    </button>
  )
}
