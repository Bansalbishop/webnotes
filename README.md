# FlowNotes

A modern, production-grade notes web app built with React. Capture ideas, manage checklists, pin important notes, and stay productive — all with a beautiful UI inspired by Notion, Google Keep, and Linear.

![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-8-646CFF)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC)

## Features

- **Create, edit, delete** notes with instant auto-save
- **Search** notes by title, content, or checklist items
- **Pin** important notes for quick access
- **Color tags** — Yellow, Blue, Green, Purple, Pink, Orange, Gray
- **Checklists** with checkboxes and completion tracking
- **Dark / light mode** toggle
- **Keyboard shortcuts** — `⌘/Ctrl+N` new note, `⌘/Ctrl+K` search, `Escape` close
- **Sorting** — recently edited, oldest, newest, alphabetical
- **Recent edited** section
- **Toast notifications** for actions
- **Loading skeletons** and empty state illustrations
- **Responsive** sidebar with mobile drawer
- **localStorage** persistence with debounced sync

## Tech Stack

- React 19 + Vite 8
- Tailwind CSS 4
- Zustand (state management)
- Lucide React (icons)
- No backend — frontend only

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Sidebar, mobile nav, app shell
│   ├── notes/        # Cards, grid, editor, empty states
│   ├── settings/     # Settings panel
│   └── ui/           # Search, filters, toasts, skeletons
├── data/             # Seed / starter notes
├── hooks/            # Keyboard shortcuts
├── store/            # Zustand store + localStorage sync
└── utils/            # Constants, helpers, date formatting
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘/Ctrl + N` | Create new note |
| `⌘/Ctrl + K` | Focus search bar |
| `Escape` | Close editor or mobile sidebar |

## Storage

All notes and settings are saved to `localStorage` under the key `flownotes-app-v1`. Data persists across browser refreshes. Writes are debounced (300ms) to optimize performance.

## License

MIT
