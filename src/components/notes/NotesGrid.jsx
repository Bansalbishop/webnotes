import useNotesStore from '../../store/useNotesStore'
import { useFilteredNotes } from '../../hooks/useFilteredNotes'
import NoteCard from './NoteCard'
import EmptyState from './EmptyState'

export default function NotesGrid() {
  const notes = useFilteredNotes()
  const searchQuery = useNotesStore((s) => s.searchQuery)
  const filterColor = useNotesStore((s) => s.filterColor)
  const activeView = useNotesStore((s) => s.activeView)

  if (!notes.length) {
    const variant =
      searchQuery || filterColor
        ? 'search'
        : activeView === 'pinned'
          ? 'pinned'
          : 'all'
    return <EmptyState variant={variant} />
  }

  return (
    <div className="notes-masonry">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}
