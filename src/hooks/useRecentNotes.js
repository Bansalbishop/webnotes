import { useMemo } from 'react'
import useNotesStore from '../store/useNotesStore'
import { sortNotes } from '../utils/helpers'

/** Memoized recent notes slice */
export function useRecentNotes(limit = 4) {
  const notes = useNotesStore((s) => s.notes)

  return useMemo(
    () => sortNotes(notes, 'updated-desc').slice(0, limit),
    [notes, limit]
  )
}
