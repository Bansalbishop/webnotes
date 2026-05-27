import { CheckCircle2, Info, X, AlertCircle } from 'lucide-react'
import useNotesStore from '../../store/useNotesStore'

const icons = {
  success: CheckCircle2,
  info: Info,
  error: AlertCircle,
}

const styles = {
  success: 'border-emerald-500/30 bg-emerald-50/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200',
  info: 'border-blue-500/30 bg-blue-50/90 text-blue-800 dark:bg-blue-950/80 dark:text-blue-200',
  error: 'border-red-500/30 bg-red-50/90 text-red-800 dark:bg-red-950/80 dark:text-red-200',
}

export default function ToastContainer() {
  const toasts = useNotesStore((s) => s.toasts)
  const removeToast = useNotesStore((s) => s.removeToast)

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-6 sm:translate-x-0">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || Info
        return (
          <div
            key={toast.id}
            className={`animate-toast-in flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md ${styles[toast.type] || styles.info}`}
            role="status"
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="ml-2 rounded-lg p-1 opacity-60 transition-opacity hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
