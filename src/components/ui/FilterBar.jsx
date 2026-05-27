import { ArrowUpDown, Filter } from 'lucide-react'
import { NOTE_COLORS, SORT_OPTIONS } from '../../utils/constants'
import { getColorClasses } from '../../utils/helpers'
import useNotesStore from '../../store/useNotesStore'

export default function FilterBar() {
  const sortBy = useNotesStore((s) => s.settings.sortBy)
  const setSortBy = useNotesStore((s) => s.setSortBy)
  const filterColor = useNotesStore((s) => s.filterColor)
  const setFilterColor = useNotesStore((s) => s.setFilterColor)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 rounded-xl border border-black/8 bg-white/50 px-2 py-1 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
        <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="cursor-pointer bg-transparent py-1 pr-6 text-xs font-medium text-gray-700 focus:outline-none dark:text-gray-300"
          aria-label="Sort notes"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <Filter className="h-3.5 w-3.5 text-gray-400" />
        <button
          type="button"
          onClick={() => setFilterColor(null)}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
            !filterColor
              ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10'
          }`}
        >
          All
        </button>
        {NOTE_COLORS.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => setFilterColor(filterColor === color.id ? null : color.id)}
            title={color.label}
            className={`h-6 w-6 rounded-full transition-all hover:scale-110 ${getColorClasses(color.id)} ${
              filterColor === color.id
                ? 'ring-2 ring-violet-500 ring-offset-1 dark:ring-offset-gray-900'
                : 'opacity-70 hover:opacity-100'
            }`}
            aria-label={`Filter ${color.label}`}
          />
        ))}
      </div>
    </div>
  )
}
