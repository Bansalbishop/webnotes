import { COLOR_MAP } from './constants'

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function getColorClasses(colorId) {
  const color = COLOR_MAP[colorId] || COLOR_MAP.gray
  return `${color.light} ${color.dark}`
}

export function truncate(text, max = 120) {
  if (!text) return ''
  const trimmed = text.trim()
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max)}…`
}

export function sortNotes(notes, sortBy) {
  const sorted = [...notes]
  switch (sortBy) {
    case 'updated-asc':
      return sorted.sort((a, b) => a.updatedAt - b.updatedAt)
    case 'created-desc':
      return sorted.sort((a, b) => b.createdAt - a.createdAt)
    case 'title-asc':
      return sorted.sort((a, b) =>
        (a.title || 'Untitled').localeCompare(b.title || 'Untitled')
      )
    case 'updated-desc':
    default:
      return sorted.sort((a, b) => b.updatedAt - a.updatedAt)
  }
}

export function filterNotes(notes, { searchQuery, filterColor, view }) {
  let result = notes

  if (view === 'pinned') {
    result = result.filter((n) => n.pinned)
  }

  if (filterColor) {
    result = result.filter((n) => n.color === filterColor)
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase()
    result = result.filter(
      (n) =>
        (n.title || '').toLowerCase().includes(q) ||
        (n.content || '').toLowerCase().includes(q) ||
        n.checklist.some((item) => item.text.toLowerCase().includes(q))
    )
  }

  return result
}
