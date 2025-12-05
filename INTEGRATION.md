# Frontend-Backend Integration Guide

## Overview
This guide explains how the React frontend connects to the Django REST Framework backend using JWT authentication.

## Architecture

```
┌─────────────────┐                          ┌──────────────────┐
│  React Frontend │                          │  Django Backend  │
│ localhost:5173  │ ◄────────API Calls─────► │ localhost:8000   │
│                 │         (JWT Auth)       │                  │
└─────────────────┘                          └──────────────────┘
```

## Setup Instructions

### 1. Start Django Backend
```bash
cd c:\Users\surya\freelancer_backend

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Run migrations (if not done already)
python manage.py migrate

# Create superuser (if not done already)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

The backend will run at **http://localhost:8000**

### 2. Start React Frontend
```bash
cd c:\Users\surya\freelancer_dashboard

# Install dependencies (if not done already)
npm install

# Start development server
npm run dev
```

The frontend will run at **http://localhost:5173**

### 3. Create Test Users in Django Admin

1. Go to http://localhost:8000/admin
2. Login with your superuser credentials
3. Click on "Users" and add:

**Freelancer User:**
- Username: `freelancer1`
- Email: `freelancer1@example.com`
- Password: `pass123`
- Permissions: Check "Staff status"

**Client User:**
- Username: `client1`
- Email: `client1@example.com`
- Password: `pass123`
- Permissions: Check "Staff status"

4. Then go to "User Profiles" and set their roles:
   - freelancer1: Role = "freelancer"
   - client1: Role = "client"

## Frontend Integration Details

### Authentication Flow

#### 1. Login Process
```jsx
// User enters credentials on Login page
const handleSubmit = async (e) => {
  e.preventDefault();
  await login(username, password);  // Defined in AuthContext
};

// In AuthContext.jsx - login() function:
const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/token/`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  
  const { access, refresh } = await response.json();
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  
  // Fetch and set user profile
};
```

#### 2. Token Storage
- **Access Token**: Stored in `localStorage` (expires in 60 minutes)
- **Refresh Token**: Stored in `localStorage` (expires in 24 hours)

#### 3. API Requests
All API requests include the JWT token:
```javascript
// In api.js service
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};
```

#### 4. Logout Process
```jsx
const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  setUser(null);
  // User redirected to /login
};
```

### API Integration Examples

#### Fetching Projects
```jsx
// In Projects.jsx
import { projectsApi } from '../services/api';

const [projects, setProjects] = useState([]);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const data = await projectsApi.list();
      setProjects(data.results);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };
  fetchProjects();
}, []);

return projects.map(project => (
  <div key={project.id}>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <p>Budget: ${project.budget}</p>
  </div>
));
```

#### Creating a Proposal
```jsx
// In Projects.jsx or Proposals.jsx
const handleCreateProposal = async (projectId, proposalData) => {
  try {
    const response = await proposalsApi.create({
      project: projectId,
      cover_letter: proposalData.coverLetter,
      proposed_amount: proposalData.amount,
      timeline_days: proposalData.days,
    });
    console.log('Proposal created:', response);
  } catch (err) {
    console.error('Failed to create proposal:', err);
  }
};
```

#### Accepting a Proposal (Client Only)
```jsx
// In Proposals.jsx - Client action
const handleAcceptProposal = async (proposalId) => {
  try {
    const response = await proposalsApi.accept(proposalId);
    // Contract is auto-created by backend
    console.log('Proposal accepted:', response);
  } catch (err) {
    console.error('Failed to accept proposal:', err);
  }
};
```

## Files Changed

### Frontend
- ✅ `src/context/AuthContext.jsx` - Added JWT login, token refresh, profile fetching
- ✅ `src/pages/Login.jsx` - New login page
- ✅ `src/App.jsx` - Added route protection and login redirect
- ✅ `src/components/Navbar.jsx` - Updated logout to redirect to login
- ✅ `src/services/api.js` - New API service layer

### Backend (Already Complete)
- ✅ JWT Authentication configured
- ✅ CORS enabled for React frontend
- ✅ All models and serializers created
- ✅ Viewsets with custom actions ready

## Testing the Integration

### Test 1: Login Flow
1. Open http://localhost:5173/login
2. Enter: `freelancer1` / `pass123`
3. Should redirect to dashboard with user data

### Test 2: Fetch Projects
1. Login as client1
2. Should see projects list (empty initially)

### Test 3: Create Project
1. Navigate to Projects page as client1
2. Click "Create Project" (UI needs implementation)
3. Submit form - should call `projectsApi.create()`

### Test 4: Create Proposal
1. Login as freelancer1
2. Create proposal on a project - should call `proposalsApi.create()`

### Test 5: Accept Proposal
1. Login as client1
2. Accept a proposal - should call `proposalsApi.accept()`
3. Contract should be auto-created

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| CORS Error | Ensure backend is running and CORS is configured for `localhost:5173` |
| 401 Unauthorized | Token expired; user needs to login again |
| Backend connection failed | Check if Django server is running on `localhost:8000` |
| Mock data still showing | Update page components to use API service instead of mock data |

## Next Steps

1. **Update Pages with Real Data**
   - Replace mock data in `Projects.jsx`, `Proposals.jsx`, `Contracts.jsx`
   - Use the API service to fetch real data

2. **Add Create/Edit Forms**
   - Create forms to add projects, proposals, contracts
   - Handle form submission with API calls

3. **Error Handling**
   - Add error boundaries
   - Show user-friendly error messages

4. **Loading States**
   - Add loading indicators while fetching data
   - Show skeleton loaders for better UX

5. **Token Refresh**
   - Implement automatic token refresh before expiration
   - Handle refresh token flow

## API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/token/` | POST | Login (get access + refresh tokens) |
| `/api/token/refresh/` | POST | Refresh access token |
| `/api/profiles/me/` | GET | Get current user profile |
| `/api/profiles/update_profile/` | PUT | Update user profile |
| `/api/projects/` | GET/POST | List/Create projects |
| `/api/projects/{id}/` | GET/PUT/DELETE | Project CRUD |
| `/api/projects/{id}/assign_freelancer/` | POST | Assign freelancer to project |
| `/api/proposals/` | GET/POST | List/Create proposals |
| `/api/proposals/{id}/accept/` | POST | Accept proposal |
| `/api/proposals/{id}/reject/` | POST | Reject proposal |
| `/api/contracts/` | GET | List contracts |
| `/api/contracts/{id}/update_milestone/` | POST | Update milestone progress |

---

**Status:** ✅ Frontend-Backend Integration Ready

To start using the integrated system:
1. Start Django backend: `python manage.py runserver`
2. Start React frontend: `npm run dev`
3. Create test users in Django admin
4. Login at http://localhost:5173/login
