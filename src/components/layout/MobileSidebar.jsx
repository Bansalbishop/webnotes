import { X, StickyNote, Pin, Clock, Settings } from 'lucide-react'
import { VIEWS } from '../../utils/constants'
import useNotesStore from '../../store/useNotesStore'

const navItems = [
  { id: VIEWS.ALL, label: 'All Notes', icon: StickyNote },
  { id: VIEWS.PINNED, label: 'Pinned Notes', icon: Pin },
  { id: VIEWS.RECENT, label: 'Recent', icon: Clock },
  { id: VIEWS.SETTINGS, label: 'Settings', icon: Settings },
]

export default function MobileSidebar() {
  const sidebarOpen = useNotesStore((s) => s.sidebarOpen)
  const setSidebarOpen = useNotesStore((s) => s.setSidebarOpen)
  const activeView = useNotesStore((s) => s.activeView)
  const setActiveView = useNotesStore((s) => s.setActiveView)

  if (!sidebarOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in lg:hidden"
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col glass shadow-2xl animate-slide-in lg:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-base font-bold text-gray-900 dark:text-white">Menu</span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-2 text-gray-500 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveView(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                activeView === id
                  ? 'bg-violet-100/80 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}
