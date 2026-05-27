import { forwardRef } from 'react'
import { Search, X } from 'lucide-react'

const SearchBar = forwardRef(function SearchBar({ value, onChange }, ref) {
  return (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes… (⌘K)"
        className="w-full rounded-xl border border-black/8 bg-white/60 py-2.5 pl-10 pr-10 text-sm text-gray-900 shadow-sm backdrop-blur-md transition-all placeholder:text-gray-400 focus:border-violet-500/50 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-violet-400/50 dark:focus:bg-white/10"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
})

export default SearchBar
