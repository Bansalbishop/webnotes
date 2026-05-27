import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { STORAGE_KEY, DEFAULT_SETTINGS, VIEWS } from '../utils/constants'
import { generateId } from '../utils/helpers'
import { SEED_NOTES } from '../data/seedNotes'

const DEBOUNCE_MS = 300
let saveTimer = null

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function persistToStorage(state) {
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    try {
      const payload = {
        notes: state.notes,
        settings: state.settings,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      /* quota exceeded — silent fail */
    }
  }, DEBOUNCE_MS)
}

const stored = loadFromStorage()

const useNotesStore = create(
  subscribeWithSelector((set, get) => ({
    notes: stored?.notes ?? SEED_NOTES,
    settings: { ...DEFAULT_SETTINGS, ...stored?.settings },

    // UI state (not persisted)
    activeView: VIEWS.ALL,
    searchQuery: '',
    filterColor: null,
    editingNoteId: null,
    sidebarOpen: false,
    isLoading: true,
    isNewNote: false,
    toasts: [],

    // Hydration complete
    init: () => {
      const { settings } = get()
      applyDarkMode(settings.darkMode)
      set({ isLoading: false })
    },

    // Settings
    toggleDarkMode: () => {
      set((s) => {
        const darkMode = !s.settings.darkMode
        applyDarkMode(darkMode)
        return { settings: { ...s.settings, darkMode } }
      })
    },

    setSortBy: (sortBy) => {
      set((s) => ({ settings: { ...s.settings, sortBy } }))
    },

    setActiveView: (view) => {
      set({ activeView: view, sidebarOpen: false })
    },

    setSearchQuery: (searchQuery) => set({ searchQuery }),
    setFilterColor: (filterColor) => set({ filterColor }),
    setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

    // Note CRUD
    createNote: () => {
      const id = generateId()
      const now = Date.now()
      const note = {
        id,
        title: '',
        content: '',
        color: 'yellow',
        pinned: false,
        checklist: [],
        createdAt: now,
        updatedAt: now,
      }
      set((s) => ({
        notes: [note, ...s.notes],
        editingNoteId: id,
        isNewNote: true,
        activeView: VIEWS.ALL,
      }))
      get().addToast('New note created', 'success')
      return id
    },

    updateNote: (id, updates) => {
      set((s) => ({
        notes: s.notes.map((n) =>
          n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n
        ),
        isNewNote: false,
      }))
    },

    deleteNote: (id) => {
      set((s) => ({
        notes: s.notes.filter((n) => n.id !== id),
        editingNoteId: s.editingNoteId === id ? null : s.editingNoteId,
      }))
      get().addToast('Note deleted', 'info')
    },

    togglePin: (id) => {
      const note = get().notes.find((n) => n.id === id)
      set((s) => ({
        notes: s.notes.map((n) =>
          n.id === id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n
        ),
      }))
      get().addToast(note?.pinned ? 'Note unpinned' : 'Note pinned', 'success')
    },

    openNote: (id) => set({ editingNoteId: id, isNewNote: false }),
    closeEditor: () => set({ editingNoteId: null, isNewNote: false }),

    // Checklist
    addChecklistItem: (noteId, text) => {
      const item = { id: generateId(), text, completed: false }
      set((s) => ({
        notes: s.notes.map((n) =>
          n.id === noteId
            ? { ...n, checklist: [...n.checklist, item], updatedAt: Date.now() }
            : n
        ),
      }))
      return item.id
    },

    updateChecklistItem: (noteId, itemId, updates) => {
      set((s) => ({
        notes: s.notes.map((n) =>
          n.id === noteId
            ? {
                ...n,
                checklist: n.checklist.map((item) =>
                  item.id === itemId ? { ...item, ...updates } : item
                ),
                updatedAt: Date.now(),
              }
            : n
        ),
      }))
    },

    removeChecklistItem: (noteId, itemId) => {
      set((s) => ({
        notes: s.notes.map((n) =>
          n.id === noteId
            ? {
                ...n,
                checklist: n.checklist.filter((item) => item.id !== itemId),
                updatedAt: Date.now(),
              }
            : n
        ),
      }))
    },

    toggleChecklistItem: (noteId, itemId) => {
      const note = get().notes.find((n) => n.id === noteId)
      const item = note?.checklist.find((i) => i.id === itemId)
      if (item) {
        get().updateChecklistItem(noteId, itemId, { completed: !item.completed })
      }
    },

    // Toasts
    addToast: (message, type = 'info') => {
      const id = generateId()
      set((s) => ({ toasts: [...s.toasts, { id, message, type }] }))
      setTimeout(() => get().removeToast(id), 3200)
    },

    removeToast: (id) => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    },
  }))
)

function applyDarkMode(dark) {
  document.documentElement.classList.toggle('dark', dark)
}

// Optimized localStorage sync — only persist notes + settings
useNotesStore.subscribe(
  (s) => ({ notes: s.notes, settings: s.settings }),
  (state) => persistToStorage(state),
  { equalityFn: (a, b) => JSON.stringify(a) === JSON.stringify(b) }
)

export default useNotesStore
