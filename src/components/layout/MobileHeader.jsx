import { Menu, Sparkles, Moon, Sun } from 'lucide-react'
import useNotesStore from '../../store/useNotesStore'

export default function MobileHeader() {
  const setSidebarOpen = useNotesStore((s) => s.setSidebarOpen)
  const darkMode = useNotesStore((s) => s.settings.darkMode)
  const toggleDarkMode = useNotesStore((s) => s.toggleDarkMode)

  return (
    <header className="flex items-center justify-between border-b border-black/5 px-4 py-3 glass dark:border-white/5 lg:hidden">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="rounded-xl p-2 text-gray-600 transition-colors hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/10"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-gray-900 dark:text-white">FlowNotes</span>
      </div>

      <button
        type="button"
        onClick={toggleDarkMode}
        className="rounded-xl p-2 text-gray-600 transition-colors hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/10"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </header>
  )
}
