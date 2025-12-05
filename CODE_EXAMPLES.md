# 💻 Code Examples & Quick Reference

## Using the Authentication Context

### Basic Usage
```jsx
import { useAuth } from './context/AuthContext';

export default function MyComponent() {
  const { user, logout, theme, toggleTheme } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Accessing User Data
```jsx
const { user } = useAuth();

// Available properties:
user.name              // "Surya Gayatri"
user.email             // "surya@freelancer.com"
user.role              // "freelancer"
user.avatar            // "SG"
user.title             // "Senior Frontend Developer"
user.rating            // 4.8
user.isAuthenticated   // true
```

### Theme Management
```jsx
const { theme, toggleTheme } = useAuth();

return (
  <div>
    <p>Current theme: {theme}</p>
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  </div>
);
```

---

## Navigation & Routing

### Adding a New Route
```jsx
// In App.jsx
import NewPage from './pages/NewPage';

<Route path='/' element={<FreelancerLayout />}>
  <Route index element={<FreelancerDashboard />} />
  <Route path='projects' element={<Projects />} />
  <Route path='proposals' element={<Proposals />} />
  <Route path='contracts' element={<Contracts />} />
  <Route path='new-page' element={<NewPage />} />  // Add new route
</Route>
```

### Adding Navigation Link
```jsx
// In Sidebar.jsx
const navigationItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/projects', label: 'Projects', icon: '📁' },
  { path: '/proposals', label: 'Proposals', icon: '💼' },
  { path: '/contracts', label: 'Contracts', icon: '📋' },
  { path: '/new-page', label: 'New Page', icon: '🆕' },  // Add link
];
```

### Using Navigation in Components
```jsx
import { useNavigate } from 'react-router-dom';

export default function MyComponent() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/projects')}>
      Go to Projects
    </button>
  );
}
```

### Check Current Route
```jsx
import { useLocation } from 'react-router-dom';

export default function MyComponent() {
  const location = useLocation();
  
  if (location.pathname === '/projects') {
    return <div>You're on Projects page</div>;
  }
}
```

---

## Working with Data

### Project Data Structure
```javascript
const project = {
  id: 'P-101',
  title: 'React + Tailwind Website',
  client: 'BrightStart Co.',
  budget: 1200,
  status: 'In Progress',
  progress: 65,
  due: 'Dec 05, 2025',
};
```

### Proposal Data Structure
```javascript
const proposal = {
  id: 'PROP-201',
  title: 'AI-Powered Analytics Dashboard',
  client: 'DataViz Inc.',
  amount: 3500,
  status: 'Under Review',
  submittedOn: 'Dec 03, 2025',
  deadline: 'Dec 10, 2025',
};
```

### Contract Data Structure
```javascript
const contract = {
  id: 'C-301',
  title: 'Long-term UI/UX Design Services',
  client: 'DesignHub Pro',
  value: 25000,
  status: 'Active',
  startDate: 'Nov 01, 2025',
  endDate: 'May 31, 2026',
  milestones: 6,
  completedMilestones: 2,
};
```

### Mapping Over Data
```jsx
const projects = [...];

return (
  <div className="grid gap-4">
    {projects.map((project) => (
      <div key={project.id} className="bg-white rounded-lg shadow p-6">
        <h3>{project.title}</h3>
        <p>{project.client}</p>
        <span>{project.status}</span>
      </div>
    ))}
  </div>
);
```

---

## Styling Patterns

### Status Badge
```jsx
const getStatusColor = (status) => {
  switch (status) {
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

<span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
  {status}
</span>
```

### Progress Bar
```jsx
<div className="w-full bg-gray-200 rounded-full h-2">
  <div
    className="bg-indigo-600 h-2 rounded-full transition-all"
    style={{ width: `${progress}%` }}
  ></div>
</div>
```

### Card Container
```jsx
<div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
  {/* Content */}
</div>
```

### Responsive Grid
```jsx
<div className="grid gap-4">
  {/* 1 column by default, adjusts with media queries */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

### Flex Layout
```jsx
<div className="flex items-center justify-between gap-4">
  {/* Left content */}
  <div>{/* Right content */}</div>
</div>
```

---

## Common Component Patterns

### User Profile Card
```jsx
<div className="bg-white rounded-lg shadow p-4">
  <div className="flex items-center gap-4">
    <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center">
      {user.avatar}
    </div>
    <div>
      <div className="font-semibold">{user.name}</div>
      <div className="text-sm text-gray-500">{user.title}</div>
    </div>
  </div>
</div>
```

### Search Input with Clear
```jsx
const [query, setQuery] = useState('');

return (
  <div className="relative">
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border rounded-md px-3 py-2 w-64"
      placeholder="Search..."
    />
    {query && (
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={() => setQuery('')}
      >
        ✕
      </button>
    )}
  </div>
);
```

### Dropdown Menu
```jsx
const [showMenu, setShowMenu] = useState(false);

return (
  <div className="relative">
    <button onClick={() => setShowMenu(!showMenu)}>
      Menu
    </button>
    {showMenu && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
        <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
          Option 1
        </button>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
          Option 2
        </button>
      </div>
    )}
  </div>
);
```

### Tab Navigation
```jsx
const [activeTab, setActiveTab] = useState('all');

return (
  <div className="flex gap-4 border-b mb-4">
    <button
      onClick={() => setActiveTab('all')}
      className={`pb-2 font-medium border-b-2 transition ${
        activeTab === 'all'
          ? 'border-indigo-600 text-indigo-600'
          : 'border-transparent text-gray-500'
      }`}
    >
      All
    </button>
    <button
      onClick={() => setActiveTab('active')}
      className={`pb-2 font-medium border-b-2 transition ${
        activeTab === 'active'
          ? 'border-indigo-600 text-indigo-600'
          : 'border-transparent text-gray-500'
      }`}
    >
      Active
    </button>
  </div>
);
```

---

## API Integration Examples

### Fetching User Data
```jsx
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user.isAuthenticated) {
      fetchProjects();
    }
  }, [user.id, user.isAuthenticated]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

### Updating User Profile
```jsx
const updateProfile = async (updates) => {
  try {
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (response.ok) {
      const updatedUser = await response.json();
      // Update context with new user data
    }
  } catch (error) {
    console.error('Update failed:', error);
  }
};
```

---

## Debugging Tips

### Check User Context
```jsx
const { user } = useAuth();
console.log('Current user:', user);
console.log('User role:', user.role);
```

### Check Current Route
```jsx
const location = useLocation();
console.log('Current path:', location.pathname);
```

### Check Theme
```jsx
const { theme } = useAuth();
console.log('Current theme:', theme);
```

### Monitor State Changes
```jsx
useEffect(() => {
  console.log('User updated:', user);
}, [user]);
```

---

## Performance Optimization

### Memoizing Components
```jsx
import { memo } from 'react';

const ProjectCard = memo(({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {project.title}
    </div>
  );
});

export default ProjectCard;
```

### Using useCallback
```jsx
import { useCallback } from 'react';

export default function Component() {
  const handleClick = useCallback(() => {
    // Handle click
  }, []);

  return <button onClick={handleClick}>Click me</button>;
}
```

---

## Common Tailwind Classes

```
Spacing:
- p-4 (padding all sides)
- px-4 (horizontal padding)
- py-2 (vertical padding)
- gap-4 (gap between flex/grid items)
- mb-4 (margin bottom)
- mt-2 (margin top)

Colors:
- bg-indigo-600 (background)
- text-gray-700 (text color)
- border-gray-300 (border)

Sizing:
- w-16 (width)
- h-16 (height)
- rounded-lg (border radius)
- shadow (box shadow)

Layout:
- flex (flexbox)
- grid (grid layout)
- grid-cols-3 (3 columns)
- items-center (center items)
- justify-between (space between)

Typography:
- font-semibold (semi-bold)
- text-sm (small text)
- text-3xl (large text)

States:
- hover:bg-gray-50 (hover state)
- focus:ring-2 (focus state)
- transition (smooth transition)
```

---

**Quick Commands:**

```bash
# Start dev server
npm run dev

# Build for production
npm build

# Preview production build
npm run preview

# Install dependencies
npm install
```

**Running on:** http://localhost:5175
