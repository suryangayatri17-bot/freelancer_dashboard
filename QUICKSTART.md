# 🚀 Quick Start Guide

## Installation & Setup (One-time)

### 1. Navigate to Project Directory
```powershell
cd c:\Users\surya\freelancer_dashboard
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Start Development Server
```powershell
npm run dev
```

The application will be available at **http://localhost:5175**

---

## 📍 What You Have

✅ **Complete React Application** with:
- Role-based authentication
- Navigation with React Router
- State management with Context API
- Tailwind CSS styling
- 4 functional pages
- Mock data for testing

---

## 🗺️ Navigate the Application

### Available Pages
1. **Dashboard** (`/`) - Main overview
2. **Projects** (`/projects`) - All projects
3. **Proposals** (`/proposals`) - Sent proposals
4. **Contracts** (`/contracts`) - Active contracts

Click navigation items in the sidebar to switch pages.

---

## 👤 Current User

**Logged in as:**
- **Name:** Surya Gayatri
- **Email:** surya@freelancer.com
- **Role:** Freelancer
- **Title:** Senior Frontend Developer

Click the user avatar (SG) in the top-right to see user menu.

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `IMPLEMENTATION_GUIDE.md` | Complete architecture & setup |
| `PROJECT_SUMMARY.md` | Feature overview |
| `IMPLEMENTATION_CHECKLIST.md` | All completed features |
| `VISUAL_GUIDE.md` | UI/UX layout guide |
| `CODE_EXAMPLES.md` | Code snippets & patterns |
| `README.md` | Original project info |

---

## 🔧 Making Changes

### Edit Components
All components are in `src/`:
- `components/` - Navbar, Sidebar
- `pages/` - Dashboard, Projects, Proposals, Contracts
- `layouts/` - FreelancerLayout
- `context/` - AuthContext

Changes auto-reload in the browser.

### Edit Styles
Styles use Tailwind CSS classes - no separate CSS files needed.

### Add New Page
1. Create component in `src/pages/`
2. Add route to `App.jsx`
3. Add navigation link to `Sidebar.jsx`

---

## 🔌 API Integration (Next Step)

To use real data instead of mock data:

### 1. Create API Service
Create `src/services/api.js`:
```javascript
export const fetchProjects = async (userId) => {
  const response = await fetch(`/api/users/${userId}/projects`);
  return response.json();
};
```

### 2. Update Components
Replace mock data in pages with API calls:
```jsx
useEffect(() => {
  fetchProjects(user.id).then(setProjects);
}, [user.id]);
```

### 3. Add Loading States
```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

---

## 🎨 Customization

### Change Colors
Update Tailwind classes in components. Example:
```jsx
// Change from indigo to purple
className="bg-purple-600"  // instead of bg-indigo-600
```

### Change User Data
Edit `src/context/AuthContext.jsx`:
```jsx
const [user, setUser] = useState({
  name: 'Your Name',
  email: 'your@email.com',
  // ... other fields
});
```

### Change Navigation Items
Edit `src/components/Sidebar.jsx`:
```jsx
const navigationItems = [
  { path: '/new-page', label: 'New Page', icon: '🆕' },
];
```

---

## 🐛 Troubleshooting

### Server won't start
```powershell
# Kill existing process
Get-Process node | Stop-Process -Force

# Try different port
npm run dev -- --port 5176
```

### Module not found
```powershell
# Reinstall dependencies
rm node_modules
npm install
```

### Tailwind styles not showing
- Ensure `index.css` has Tailwind imports
- Restart dev server
- Check `tailwind.config.cjs`

### Context not working
- Ensure `AuthProvider` wraps app in `App.jsx`
- Check `useAuth()` is called in components

---

## 📦 Build for Production

### Create Optimized Build
```powershell
npm run build
```

This creates `dist/` folder with production files.

### Preview Production Build
```powershell
npm run preview
```

---

## 📱 File Locations

```
Project Root
├── src/
│   ├── App.jsx                  ← Main app (routes)
│   ├── main.jsx                 ← Entry point
│   ├── index.css                ← Tailwind setup
│   ├── context/
│   │   └── AuthContext.jsx      ← State management
│   ├── components/
│   │   ├── Navbar.jsx           ← Top bar
│   │   └── Sidebar.jsx          ← Side menu
│   ├── layouts/
│   │   └── FreelancerLayout.jsx ← Page layout
│   └── pages/
│       ├── FreelancerDashboard.jsx
│       ├── Projects.jsx
│       ├── Proposals.jsx
│       └── Contracts.jsx
├── package.json                 ← Dependencies
├── tailwind.config.cjs          ← Tailwind config
└── index.html                   ← HTML template
```

---

## 🎯 Next Steps

1. **Add Backend** - Connect to real API
2. **User Auth** - Implement login system
3. **Database** - Store real data
4. **Testing** - Add unit & integration tests
5. **Deployment** - Deploy to hosting
6. **Features** - Add messaging, payments, etc.

---

## 💡 Tips

- Use **Ctrl+Shift+K** in VS Code to toggle terminal
- Use **F5** or **Ctrl+F5** to hard refresh browser
- Check browser console (F12) for errors
- Keep dev server running while editing
- All changes auto-reload in browser

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Start dev | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |
| Install deps | `npm install` |
| Clean install | `rm node_modules && npm install` |

---

## ✨ Features Ready to Use

✅ Navigate between pages  
✅ View user profile  
✅ See mock project data  
✅ View mock proposals  
✅ View mock contracts  
✅ Search functionality  
✅ Theme toggle  
✅ User logout  
✅ Responsive design  
✅ Status badges  

---

**Server Status:** ✅ Running on http://localhost:5175

**Ready to code!** 🎉
