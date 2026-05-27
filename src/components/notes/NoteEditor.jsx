import { useEffect, useRef, useCallback } from "react";
import { X, Pin, Plus, Trash2, Check, GripVertical } from "lucide-react";
import useNotesStore from "../../store/useNotesStore";
import { useEditingNote } from "../../hooks/useEditingNote";
import ColorPicker from "../ui/ColorPicker";
import { formatFullDate } from "../../utils/date";
import { getColorClasses } from "../../utils/helpers";

export default function NoteEditor() {
  const note = useEditingNote();
  const closeEditor = useNotesStore((s) => s.closeEditor);
  const updateNote = useNotesStore((s) => s.updateNote);
  const togglePin = useNotesStore((s) => s.togglePin);
  const isNewNote = useNotesStore((s) => s.isNewNote);
  const addChecklistItem = useNotesStore((s) => s.addChecklistItem);
  const updateChecklistItem = useNotesStore((s) => s.updateChecklistItem);
  const removeChecklistItem = useNotesStore((s) => s.removeChecklistItem);
  const toggleChecklistItem = useNotesStore((s) => s.toggleChecklistItem);

  const titleRef = useRef(null);
  const newItemRef = useRef(null);
  const saveTimerRef = useRef(null);

  // Auto-focus title on new notes
  useEffect(() => {
    if (isNewNote && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isNewNote, note?.id]);

  // Debounced auto-save indicator
  const autoSave = useCallback(
    (id, updates) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        updateNote(id, updates);
      }, 150);
    },
    [updateNote],
  );

  if (!note) return null;

  const handleTitleChange = (e) => {
    autoSave(note.id, { title: e.target.value });
  };

  const handleContentChange = (e) => {
    autoSave(note.id, { content: e.target.value });
  };

  const handleColorChange = (color) => {
    updateNote(note.id, { color });
  };

  const handleAddChecklistItem = () => {
    const text = newItemRef.current?.value?.trim();
    if (!text) return;
    addChecklistItem(note.id, text);
    newItemRef.current.value = "";
    newItemRef.current.focus();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm animate-fade-in"
        onClick={closeEditor}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col shadow-2xl animate-slide-in sm:max-w-xl">
        <div
          className={`flex h-full flex-col glass border-l border-black/5 dark:border-white/5 ${getColorClasses(note.color)}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-4 dark:border-white/5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => togglePin(note.id)}
                className={`rounded-xl p-2 transition-all hover:bg-black/10 dark:hover:bg-white/10 ${
                  note.pinned ? "text-amber-600" : "text-gray-500"
                }`}
                aria-label={note.pinned ? "Unpin" : "Pin"}
              >
                <Pin
                  className={`h-4 w-4 ${note.pinned ? "fill-current" : ""}`}
                />
              </button>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatFullDate(note.updatedAt)} · Auto-saved
              </span>
            </div>
            <button
              type="button"
              onClick={closeEditor}
              className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
              aria-label="Close editor"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <input
              key={`title-${note.id}`}
              ref={titleRef}
              type="text"
              defaultValue={note.title}
              onChange={handleTitleChange}
              placeholder="Note title"
              className="mb-4 w-full bg-transparent text-2xl font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-gray-500"
            />

            <div className="mb-6">
              <label className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Colorsg
              </label>
              <ColorPicker value={note.color} onChange={handleColorChange} />
            </div>

            <textarea
              key={`content-${note.id}`}
              defaultValue={note.content}
              onChange={handleContentChange}
              placeholder="Start noting down your thoughts..."
              rows={8}
              className="mb-6 w-full resize-none rounded-xl border border-black/8 bg-white/50 p-4 text-sm leading-relaxed text-gray-800 placeholder:text-gray-400 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:placeholder:text-gray-500"
            />

            {/* Checklist */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Checklist
              </h3>
              <ul className="mb-3 space-y-2">
                {note.checklist.map((item) => (
                  <li
                    key={item.id}
                    className="group flex items-center gap-2 rounded-xl bg-white/40 px-3 py-2 transition-colors dark:bg-white/5"
                  >
                    <GripVertical className="h-3.5 w-3.5 shrink-0 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100" />
                    <button
                      type="button"
                      onClick={() => toggleChecklistItem(note.id, item.id)}
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                        item.completed
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-gray-300 hover:border-violet-400 dark:border-gray-600"
                      }`}
                      aria-label={
                        item.completed ? "Mark incomplete" : "Mark complete"
                      }
                    >
                      {item.completed && <Check className="h-3 w-3" />}
                    </button>
                    <input
                      type="text"
                      defaultValue={item.text}
                      onChange={(e) =>
                        updateChecklistItem(note.id, item.id, {
                          text: e.target.value,
                        })
                      }
                      className={`flex-1 bg-transparent text-sm focus:outline-none ${
                        item.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => removeChecklistItem(note.id, item.id)}
                      className="rounded-lg p-1 text-gray-400 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <input
                  ref={newItemRef}
                  type="text"
                  placeholder="Add checklist item…"
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleAddChecklistItem()
                  }
                  className="flex-1 rounded-xl border border-black/8 bg-white/50 px-3 py-2 text-sm focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                />
                <button
                  type="button"
                  onClick={handleAddChecklistItem}
                  className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-violet-700 active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
