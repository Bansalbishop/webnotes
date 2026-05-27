import { useEffect } from 'react'
import useNotesStore from '../store/useNotesStore'

/**
 * Global keyboard shortcuts for productivity.
 * Cmd/Ctrl+N — new note
 * Cmd/Ctrl+K — focus search
 * Escape — close editor / sidebar
 */
export function useKeyboardShortcuts(searchRef) {
  const createNote = useNotesStore((s) => s.createNote)
  const closeEditor = useNotesStore((s) => s.closeEditor)
  const editingNoteId = useNotesStore((s) => s.editingNoteId)
  const sidebarOpen = useNotesStore((s) => s.sidebarOpen)
  const setSidebarOpen = useNotesStore((s) => s.setSidebarOpen)

  useEffect(() => {
    const handler = (e) => {
      const meta = e.metaKey || e.ctrlKey

      if (meta && e.key === 'n') {
        e.preventDefault()
        createNote()
      }

      if (meta && e.key === 'k') {
        e.preventDefault()
        searchRef?.current?.focus()
      }

      if (e.key === 'Escape') {
        if (editingNoteId) closeEditor()
        if (sidebarOpen) setSidebarOpen(false)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [
    createNote,
    closeEditor,
    editingNoteId,
    sidebarOpen,
    setSidebarOpen,
    searchRef,
  ])
}
