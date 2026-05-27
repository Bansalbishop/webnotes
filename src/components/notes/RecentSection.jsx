import { Clock } from 'lucide-react'
import { useRecentNotes } from '../../hooks/useRecentNotes'
import NoteCard from './NoteCard'

export default function RecentSection() {
  const recentNotes = useRecentNotes()

  if (!recentNotes.length) return null

  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-violet-500" />
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Recently edited</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {recentNotes.map((note) => (
          <NoteCard key={note.id} note={note} compact />
        ))}
      </div>
    </section>
  )
}
