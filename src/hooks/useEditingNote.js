import { useMemo } from 'react'
import useNotesStore from '../store/useNotesStore'

/** Stable reference to the note being edited */
export function useEditingNote() {
  const editingNoteId = useNotesStore((s) => s.editingNoteId)
  const notes = useNotesStore((s) => s.notes)

  return useMemo(
    () => notes.find((n) => n.id === editingNoteId) ?? null,
    [notes, editingNoteId]
  )
}
