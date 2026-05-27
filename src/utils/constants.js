export const STORAGE_KEY = 'flownotes-app-v1'

export const NOTE_COLORS = [
  { id: 'yellow', label: 'Yellow', light: 'bg-note-yellow', dark: 'dark:bg-note-yellow-dark' },
  { id: 'blue', label: 'Blue', light: 'bg-note-blue', dark: 'dark:bg-note-blue-dark' },
  { id: 'green', label: 'Green', light: 'bg-note-green', dark: 'dark:bg-note-green-dark' },
  { id: 'purple', label: 'Purple', light: 'bg-note-purple', dark: 'dark:bg-note-purple-dark' },
  { id: 'pink', label: 'Pink', light: 'bg-note-pink', dark: 'dark:bg-note-pink-dark' },
  { id: 'orange', label: 'Orange', light: 'bg-note-orange', dark: 'dark:bg-note-orange-dark' },
  { id: 'gray', label: 'Gray', light: 'bg-note-gray', dark: 'dark:bg-note-gray-dark' },
]

export const COLOR_MAP = Object.fromEntries(
  NOTE_COLORS.map((c) => [c.id, c])
)

export const SORT_OPTIONS = [
  { id: 'updated-desc', label: 'Recently edited' },
  { id: 'updated-asc', label: 'Oldest edited' },
  { id: 'created-desc', label: 'Newest created' },
  { id: 'title-asc', label: 'Title A–Z' },
]

export const VIEWS = {
  ALL: 'all',
  PINNED: 'pinned',
  RECENT: 'recent',
  SETTINGS: 'settings',
}

export const DEFAULT_SETTINGS = {
  darkMode: false,
  sortBy: 'updated-desc',
}
