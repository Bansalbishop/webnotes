import { NOTE_COLORS } from '../../utils/constants'
import { getColorClasses } from '../../utils/helpers'

export default function ColorPicker({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {NOTE_COLORS.map((color) => (
        <button
          key={color.id}
          type="button"
          onClick={() => onChange(color.id)}
          title={color.label}
          className={`h-7 w-7 rounded-full border-2 transition-all duration-200 hover:scale-110 ${getColorClasses(color.id)} ${
            value === color.id
              ? 'border-gray-800 ring-2 ring-gray-400 ring-offset-2 dark:border-white dark:ring-gray-500 dark:ring-offset-gray-900'
              : 'border-transparent opacity-80 hover:opacity-100'
          }`}
          aria-label={`Color ${color.label}`}
          aria-pressed={value === color.id}
        />
      ))}
    </div>
  )
}
