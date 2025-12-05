# 📸 Visual Guide - Freelancer Dashboard

## Dashboard Layout Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  ☰  Freelancer Dashboard             🔍 Search...  🌙  🔔  [SG]  │
│     Welcome, Surya Gayatri • Freelancer                         │
└─────────────────────────────────────────────────────────────────┘
                              
┌──────────────────────────┬──────────────────────────────────────┐
│                          │                                      │
│  📊 NAVIGATION           │  Main Content Area                   │
│  ───────────────         │  ──────────────────                  │
│  📊 Dashboard            │                                      │
│  📁 Projects             │  Displays active page:               │
│  💼 Proposals            │  • Dashboard                         │
│  📋 Contracts            │  • Projects                          │
│                          │  • Proposals                         │
│  QUICK ACTIONS           │  • Contracts                         │
│  ───────────────         │                                      │
│  + New Proposal          │  (Content changes based on route)    │
│  📄 Create Invoice       │                                      │
│  💬 Message Client       │                                      │
│                          │                                      │
│  RECENT ACTIVITY         │                                      │
│  ───────────────         │                                      │
│  ✅ Proposal accepted    │                                      │
│  💰 Payment received     │                                      │
│  ⭐ Review posted        │                                      │
│                          │                                      │
└──────────────────────────┴──────────────────────────────────────┘
```

---

## Navbar Components

```
┌──────────────────────────────────────────────────────────────────┐
│ ☰  Logo & Title          Search    Theme  Notifications  [User] │
│     Subtitle             [_____]    🌙      🔔(red dot)   [SG]▼ │
└──────────────────────────────────────────────────────────────────┘

User Dropdown Menu (when clicked):
┌─────────────────────┐
│ Surya Gayatri       │
│ surya@freelancer... │
│ Senior Frontend Dev │
├─────────────────────┤
│ 👤 Profile Settings │
│ ⚙️ Account Settings │
│ 📊 Analytics        │
├─────────────────────┤
│ 🚪 Logout          │
└─────────────────────┘
```

---

## Sidebar Structure

```
┌─────────────────────────────┐
│ PROFILE CARD                │
│                             │
│  ┌───────────┐  Surya       │
│  │     SG    │  Gayatri     │
│  │  (indigo) │  Senior...   │
│  └───────────┘              │
│                             │
│  Earnings: $4,362           │
│  Projects: 4                │
│  Rating: 4.8★              │
└─────────────────────────────┘

NAVIGATION
┌─────────────────────────────┐
│ 📊 Dashboard    ← Active    │
│ 📁 Projects                 │
│ 💼 Proposals                │
│ 📋 Contracts                │
└─────────────────────────────┘

QUICK ACTIONS
┌─────────────────────────────┐
│ + New Proposal              │
│ 📄 Create Invoice           │
│ 💬 Message Client           │
└─────────────────────────────┘

RECENT ACTIVITY
┌─────────────────────────────┐
│ ✅ Proposal accepted        │
│    BrightStart Co. • 2h ago │
│                             │
│ 💰 Payment received         │
│    $1,200 from GreenLeaf    │
│    1d ago                   │
│                             │
│ ⭐ Review posted            │
│    FitLab (5★ rating)       │
│    3d ago                   │
└─────────────────────────────┘

ROLE BADGE
┌─────────────────────────────┐
│     Your Role               │
│   Freelancer                │
└─────────────────────────────┘
```

---

## Projects Page Card Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ React + Tailwind Website                        [In Progress]    │
│ BrightStart Co.                                                  │
│                                                                  │
│ Progress: 65%                                                    │
│ ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     │
│                                                                  │
│ Budget: $1,200    Due Date: Dec 05, 2025    View Details →      │
└──────────────────────────────────────────────────────────────────┘

Status Badge Colors:
┌────────────────────────────────────────────────────────┐
│ [In Progress] - Blue background    bg-blue-100         │
│ [Completed] - Green background     bg-green-100        │
│ [Awaiting Feedback] - Yellow bg    bg-yellow-100       │
│ [Pending] - Gray background        bg-gray-100         │
└────────────────────────────────────────────────────────┘
```

---

## Proposals Page Card Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ AI-Powered Analytics Dashboard              [Under Review]       │
│ DataViz Inc.                                                     │
│                                                                  │
│ Bid Amount: $3,500    Submitted: Dec 03, 2025                   │
│ Response Deadline: Dec 10, 2025             View Details →       │
└──────────────────────────────────────────────────────────────────┘

Status Options:
┌────────────────────────────────────────────────────────┐
│ [Under Review] - Blue                                  │
│ [Accepted] - Green                                     │
│ [Rejected] - Red                                       │
│ [Waiting for Client Response] - Yellow                 │
└────────────────────────────────────────────────────────┘
```

---

## Contracts Page Card Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ Long-term UI/UX Design Services                      [Active]    │
│ DesignHub Pro                                                    │
│                                                                  │
│ Contract Value: $25,000    Start: Nov 01, 2025                  │
│ End: May 31, 2026                           View Details →       │
│                                                                  │
│ Milestones Progress: 2 / 6                                       │
│ ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     │
└──────────────────────────────────────────────────────────────────┘

Contract Status:
┌────────────────────────────────────────────────────────┐
│ [Active] - Green                                       │
│ [Completed] - Blue                                     │
│ [On Hold] - Yellow                                     │
│ [Terminated] - Red                                     │
└────────────────────────────────────────────────────────┘
```

---

## Color Scheme

### Primary Colors
```
Indigo (Primary):
- indigo-600: #4f46e5 - Main buttons & active states
- indigo-500: #6366f1 - Lighter indigo
- indigo-100: #e0e7ff - Light background

Gray (Neutral):
- gray-100: #f3f4f6 - Background
- gray-600: #4b5563 - Text
- gray-500: #6b7280 - Muted text
```

### Status Colors
```
Success:      bg-green-100 text-green-800     ✅
In Progress:  bg-blue-100 text-blue-800      🔵
Pending:      bg-yellow-100 text-yellow-800  🟡
Rejected:     bg-red-100 text-red-800        ❌
Neutral:      bg-gray-100 text-gray-800      ⚪
```

---

## Typography Hierarchy

```
Page Title
├─ text-3xl font-bold

Section Title
├─ text-xl font-semibold

Card Title
├─ text-lg font-semibold

Subtitle/Meta
├─ text-sm text-gray-600

Body Text
├─ text-base text-gray-700

Small Text/Helper
├─ text-xs text-gray-500
```

---

## Responsive Behavior

### Desktop (Current)
```
Navbar: Full width, sticky
Layout: 3 cols (sidebar) + 9 cols (content)
Cards: Side by side in grid
```

### Mobile (Future Enhancement)
```
Navbar: Hamburger menu (to be implemented)
Layout: 1 col (full width)
Sidebar: Collapsible/drawer
Cards: Stack vertically
```

---

## Interactive Elements

### Buttons
```
Primary (Main Actions):
bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700

Secondary (Links):
text-indigo-600 hover:text-indigo-800 font-medium

Ghost (Text Buttons):
text-gray-700 hover:bg-gray-50 px-3 py-2 rounded
```

### Form Elements
```
Input:
border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500

Search:
w-64 border rounded-md px-3 py-2

Clear Button (✕):
Appears inside input on right when has text
```

### Hover Effects
```
Cards:     hover:shadow-lg transition
Links:     hover:text-indigo-800 / hover:bg-gray-50
Buttons:   hover:bg-indigo-700
Navigation: hover:bg-gray-100 p-2 rounded
```

---

## Animation & Transitions

```
Progress Bars:  transition-all duration-300
Card Shadows:   transition
Links/Buttons:  transition
Colors:         Smooth transitions
```

---

## Icons Used

```
Navigation:
🏠 → Not used (📊 Dashboard)
📁 → Projects
💼 → Proposals
📋 → Contracts

Actions:
➕ → Add/New
🔍 → Search
🌙 → Dark mode
☀️ → Light mode
🔔 → Notifications
👤 → Profile
⚙️ → Settings
📊 → Analytics
🚪 → Logout

Status:
✅ → Success/Completed
🔵 → In Progress
🟡 → Pending
❌ → Rejected/Failed
```

---

## Spacing & Layout

```
Container: max-w-7xl mx-auto
Gap between sections: gap-6
Card padding: p-4 or p-6
Element padding: px-3 py-2 or px-4 py-3
Border radius: rounded-lg, rounded-full
```

---

**Note:** This is a visual reference guide. Actual colors and dimensions are implemented using Tailwind CSS utility classes.
