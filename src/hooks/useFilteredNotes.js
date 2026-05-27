import { useMemo } from 'react'
import useNotesStore from '../store/useNotesStore'
import { filterNotes, sortNotes } from '../utils/helpers'
import { VIEWS } from '../utils/constants'

/** Memoized filtered + sorted notes — avoids unstable Zustand selectors */
export function useFilteredNotes() {
  const notes = useNotesStore((s) => s.notes)
  const searchQuery = useNotesStore((s) => s.searchQuery)
  const filterColor = useNotesStore((s) => s.filterColor)
  const activeView = useNotesStore((s) => s.activeView)
  const sortBy = useNotesStore((s) => s.settings.sortBy)

  return useMemo(() => {
    const filtered = filterNotes(notes, {
      searchQuery,
      filterColor,
      view: activeView === VIEWS.PINNED ? 'pinned' : 'all',
    })
    return sortNotes(filtered, sortBy)
  }, [notes, searchQuery, filterColor, activeView, sortBy])
}
