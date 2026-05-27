import { Keyboard, Database, Palette, ArrowUpDown } from 'lucide-react'
import { SORT_OPTIONS } from '../../utils/constants'
import useNotesStore from '../../store/useNotesStore'

export default function SettingsPanel() {
  const settings = useNotesStore((s) => s.settings)
  const setSortBy = useNotesStore((s) => s.setSortBy)
  const toggleDarkMode = useNotesStore((s) => s.toggleDarkMode)
  const notesCount = useNotesStore((s) => s.notes.length)
  const pinnedCount = useNotesStore((s) => s.notes.filter((n) => n.pinned).length)

  const shortcuts = [
    { keys: '⌘/Ctrl + N', action: 'Create new note' },
    { keys: '⌘/Ctrl + K', action: 'Focus search' },
    { keys: 'Escape', action: 'Close editor or sidebar' },
  ]

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customize your FlowNotes experience
        </p>
      </div>

      <section className="rounded-2xl border border-black/5 bg-white/50 p-6 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/5">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="h-4 w-4 text-violet-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Appearance</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark mode</p>
            <p className="text-xs text-gray-500">Toggle between light and dark themes</p>
          </div>
          <button
            type="button"
            onClick={toggleDarkMode}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              settings.darkMode ? 'bg-violet-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            role="switch"
            aria-checked={settings.darkMode}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                settings.darkMode ? 'translate-x-5' : ''
              }`}
            />
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-white/50 p-6 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/5">
        <div className="mb-4 flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-violet-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Default sort</h3>
        </div>
        <select
          value={settings.sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full rounded-xl border border-black/8 bg-white/60 px-4 py-2.5 text-sm focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </section>

      <section className="rounded-2xl border border-black/5 bg-white/50 p-6 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/5">
        <div className="mb-4 flex items-center gap-2">
          <Keyboard className="h-4 w-4 text-violet-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Keyboard shortcuts</h3>
        </div>
        <ul className="space-y-3">
          {shortcuts.map((s) => (
            <li key={s.keys} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{s.action}</span>
              <kbd className="rounded-lg border border-black/10 bg-black/5 px-2.5 py-1 font-mono text-xs text-gray-700 dark:border-white/10 dark:bg-white/10 dark:text-gray-300">
                {s.keys}
              </kbd>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-black/5 bg-white/50 p-6 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/5">
        <div className="mb-4 flex items-center gap-2">
          <Database className="h-4 w-4 text-violet-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Storage</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          All data is stored locally in your browser. Notes persist across sessions with
          optimized debounced saves.
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <div className="rounded-xl bg-violet-50 px-4 py-3 dark:bg-violet-900/30">
            <span className="block text-2xl font-bold text-violet-600 dark:text-violet-400">
              {notesCount}
            </span>
            <span className="text-xs text-gray-500">Total notes</span>
          </div>
          <div className="rounded-xl bg-amber-50 px-4 py-3 dark:bg-amber-900/30">
            <span className="block text-2xl font-bold text-amber-600 dark:text-amber-400">
              {pinnedCount}
            </span>
            <span className="text-xs text-gray-500">Pinned</span>
          </div>
        </div>
      </section>
    </div>
  )
}
