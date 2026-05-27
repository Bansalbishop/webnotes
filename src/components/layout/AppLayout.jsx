import { useRef, useEffect } from 'react'
import Sidebar from './Sidebar'
import MobileHeader from './MobileHeader'
import MobileSidebar from './MobileSidebar'
import SearchBar from '../ui/SearchBar'
import FilterBar from '../ui/FilterBar'
import FloatingAddButton from '../ui/FloatingAddButton'
import ToastContainer from '../ui/Toast'
import SkeletonGrid from '../ui/SkeletonGrid'
import NotesGrid from '../notes/NotesGrid'
import RecentSection from '../notes/RecentSection'
import NoteEditor from '../notes/NoteEditor'
import SettingsPanel from '../settings/SettingsPanel'
import RecentView from '../notes/RecentView'
import useNotesStore from '../../store/useNotesStore'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { VIEWS } from '../../utils/constants'

export default function AppLayout() {
  const searchRef = useRef(null)
  const init = useNotesStore((s) => s.init)
  const isLoading = useNotesStore((s) => s.isLoading)
  const activeView = useNotesStore((s) => s.activeView)
  const searchQuery = useNotesStore((s) => s.searchQuery)
  const setSearchQuery = useNotesStore((s) => s.setSearchQuery)
  const editingNoteId = useNotesStore((s) => s.editingNoteId)

  useEffect(() => {
    init()
  }, [init])

  useKeyboardShortcuts(searchRef)

  const viewTitles = {
    [VIEWS.ALL]: 'All Notes',
    [VIEWS.PINNED]: 'Pinned Notes',
    [VIEWS.RECENT]: 'Recent',
    [VIEWS.SETTINGS]: 'Settings',
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-violet-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950/20">
      <Sidebar />
      <MobileSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {activeView !== VIEWS.SETTINGS && (
              <>
                <div className="mb-6">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white lg:text-2xl">
                    {viewTitles[activeView]}
                  </h2>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <SearchBar
                      ref={searchRef}
                      value={searchQuery}
                      onChange={setSearchQuery}
                    />
                    <FilterBar />
                  </div>
                </div>

                {isLoading ? (
                  <SkeletonGrid />
                ) : activeView === VIEWS.RECENT ? (
                  <RecentView />
                ) : (
                  <NotesGrid />
                )}
              </>
            )}

            {activeView === VIEWS.SETTINGS && <SettingsPanel />}
          </div>
        </main>
      </div>

      {activeView !== VIEWS.SETTINGS && <FloatingAddButton />}
      {editingNoteId && <NoteEditor />}
      <ToastContainer />
    </div>
  )
}
