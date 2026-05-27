import {
  StickyNote,
  Pin,
  Clock,
  Settings,
  Moon,
  Sun,
  Sparkles,
} from "lucide-react";
import { VIEWS } from "../../utils/constants";
import useNotesStore from "../../store/useNotesStore";

const navItems = [
  { id: VIEWS.ALL, label: "All Notes", icon: StickyNote },
  { id: VIEWS.PINNED, label: "Pinned Notes", icon: Pin },
  { id: VIEWS.RECENT, label: "Recent", icon: Clock },
  { id: VIEWS.SETTINGS, label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const activeView = useNotesStore((s) => s.activeView);
  const setActiveView = useNotesStore((s) => s.setActiveView);
  const pinnedCount = useNotesStore(
    (s) => s.notes.filter((n) => n.pinned).length,
  );
  const notesCount = useNotesStore((s) => s.notes.length);
  const darkMode = useNotesStore((s) => s.settings.darkMode);
  const toggleDarkMode = useNotesStore((s) => s.toggleDarkMode);

  return (
    <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-black/5 glass dark:border-white/5 lg:flex">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
            WebNotes
          </h1>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            Keep your thoughts organized and accessible.
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activeView === id;
          const badge =
            id === VIEWS.PINNED
              ? pinnedCount
              : id === VIEWS.ALL
                ? notesCount
                : null;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveView(id)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-violet-100/80 text-violet-700 shadow-sm dark:bg-violet-900/40 dark:text-violet-300"
                  : "text-gray-600 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/5"
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                  active ? "text-violet-600 dark:text-violet-400" : ""
                }`}
              />
              <span className="flex-1 text-left">{label}</span>
              {badge != null && badge > 0 && (
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-semibold text-gray-500 dark:bg-white/10 dark:text-gray-400">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-black/5 p-4 dark:border-white/5">
        <button
          type="button"
          onClick={toggleDarkMode}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/5"
        >
          {darkMode ? (
            <Sun className="h-4 w-4 text-amber-500" />
          ) : (
            <Moon className="h-4 w-4 text-indigo-500" />
          )}
          {darkMode ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </aside>
  );
}
