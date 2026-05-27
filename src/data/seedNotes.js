const now = Date.now()
const hour = 60 * 60 * 1000
const day = 24 * hour

export const SEED_NOTES = [
  {
    id: 'seed-1',
    title: 'Welcome to FlowNotes',
    content:
      'Your personal productivity space. Create notes, add checklists, pin what matters, and everything saves automatically.',
    color: 'yellow',
    pinned: true,
    checklist: [
      { id: 'c1', text: 'Explore the sidebar navigation', completed: true },
      { id: 'c2', text: 'Try pinning a note', completed: false },
      { id: 'c3', text: 'Assign a color to this note', completed: false },
    ],
    createdAt: now - 2 * day,
    updatedAt: now - 30 * 60 * 1000,
  },
  {
    id: 'seed-2',
    title: 'Q2 Product Roadmap',
    content:
      'Focus areas: performance improvements, mobile experience, and collaborative editing. Ship beta by end of quarter.',
    color: 'blue',
    pinned: true,
    checklist: [
      { id: 'c4', text: 'User research interviews', completed: true },
      { id: 'c5', text: 'Design system updates', completed: true },
      { id: 'c6', text: 'Engineering sprint planning', completed: false },
    ],
    createdAt: now - 5 * day,
    updatedAt: now - 2 * hour,
  },
  {
    id: 'seed-3',
    title: 'Grocery List',
    content: 'Weekly shopping — check off as you go.',
    color: 'green',
    pinned: false,
    checklist: [
      { id: 'c7', text: 'Avocados', completed: false },
      { id: 'c8', text: 'Sourdough bread', completed: true },
      { id: 'c9', text: 'Greek yogurt', completed: false },
      { id: 'c10', text: 'Cold brew concentrate', completed: false },
    ],
    createdAt: now - day,
    updatedAt: now - 4 * hour,
  },
  {
    id: 'seed-4',
    title: 'Design Inspiration',
    content:
      'References: Linear app navigation, Notion block editor, Google Keep card layout. Aim for glassmorphism with soft shadows.',
    color: 'purple',
    pinned: false,
    checklist: [],
    createdAt: now - 3 * day,
    updatedAt: now - day,
  },
  {
    id: 'seed-5',
    title: 'Meeting Notes — Design Review',
    content:
      'Attendees: Alex, Jordan, Sam. Key decisions: adopt new color palette, simplify onboarding flow, defer dark mode polish to v2.',
    color: 'pink',
    pinned: false,
    checklist: [
      { id: 'c11', text: 'Send recap email', completed: false },
      { id: 'c12', text: 'Update Figma files', completed: false },
    ],
    createdAt: now - 6 * hour,
    updatedAt: now - hour,
  },
  {
    id: 'seed-6',
    title: 'Weekend Trip Ideas',
    content: 'Mountain cabin retreat or coastal drive. Budget under $500 for the weekend.',
    color: 'orange',
    pinned: false,
    checklist: [
      { id: 'c13', text: 'Check weather forecast', completed: true },
      { id: 'c14', text: 'Book accommodation', completed: false },
    ],
    createdAt: now - 4 * day,
    updatedAt: now - 3 * day,
  },
]
