import { useRecentNotes } from '../../hooks/useRecentNotes'
import RecentSection from './RecentSection'
import EmptyState from './EmptyState'

export default function RecentView() {
  const recentNotes = useRecentNotes()

  if (!recentNotes.length) {
    return <EmptyState variant="recent" />
  }

  return <RecentSection />
}
