# System Architecture Diagram

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER BROWSER (localhost:5173)               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    REACT APPLICATION                     │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │  App.jsx                                        │   │  │
│  │  │  • Route Definition                             │   │  │
│  │  │  • AuthProvider Wrapper                         │   │  │
│  │  │  • Protected Routes                             │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │              ↓                        ↓                 │  │
│  │  ┌──────────────────┐    ┌──────────────────────┐     │  │
│  │  │  Login Page      │    │ Layout Component     │     │  │
│  │  │  • Form          │    │ • Navbar             │     │  │
│  │  │  • Auth Call     │    │ • Sidebar            │     │  │
│  │  └──────────────────┘    │ • Outlet (Pages)     │     │  │
│  │                          └──────────────────────┘     │  │
│  │                                    ↓                   │  │
│  │                          ┌──────────────────────┐     │  │
│  │                          │ Dashboard Pages      │     │  │
│  │                          │ • Projects           │     │  │
│  │                          │ • Proposals          │     │  │
│  │                          │ • Contracts          │     │  │
│  │                          └──────────────────────┘     │  │
│  │                                                       │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │           CONTEXT API & STATE MANAGEMENT             │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │        AuthContext.jsx                         │  │  │
│  │  │  • user (state)                                │  │  │
│  │  │  • login() function                            │  │  │
│  │  │  • logout() function                           │  │  │
│  │  │  • refreshToken() function                     │  │  │
│  │  │  • loading, error states                       │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │            API SERVICE LAYER                         │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  api.js Service                               │  │  │
│  │  │  • projectsApi (list, create, get, etc)       │  │  │
│  │  │  • proposalsApi (list, create, accept, etc)   │  │  │
│  │  │  • contractsApi (list, update, etc)           │  │  │
│  │  │  • profilesApi (getMe, updateProfile)         │  │  │
│  │  │  • getAuthHeaders() - JWT token management    │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  localStorage                                        │  │
│  │  • access_token                                      │  │
│  │  • refresh_token                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                HTTP/HTTPS  │
              (CORS Enabled)│
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│               DJANGO API SERVER (localhost:8000)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  URL ROUTING (urls.py)                   │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  /api/token/              →  TokenObtainPairView       │  │
│  │  /api/token/refresh/      →  TokenRefreshView          │  │
│  │  /api/profiles/           →  UserProfileViewSet        │  │
│  │  /api/projects/           →  ProjectViewSet            │  │
│  │  /api/proposals/          →  ProposalViewSet           │  │
│  │  /api/contracts/          →  ContractViewSet           │  │
│  │                                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              VIEWSETS (views.py)                         │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  UserProfileViewSet                             │  │  │
│  │  │  • GET /me/ - Get current user profile          │  │  │
│  │  │  • PUT /update_profile/ - Update profile        │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  ProjectViewSet                                 │  │  │
│  │  │  • GET / - List projects (filtered by role)     │  │  │
│  │  │  • POST / - Create project (clients only)       │  │  │
│  │  │  • POST /assign_freelancer/ - Assign freelancer│  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  ProposalViewSet                                │  │  │
│  │  │  • GET / - List proposals (filtered)            │  │  │
│  │  │  • POST / - Create proposal (freelancers only)  │  │  │
│  │  │  • POST /{id}/accept/ - Accept proposal         │  │  │
│  │  │  • POST /{id}/reject/ - Reject proposal         │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  ContractViewSet                                │  │  │
│  │  │  • GET / - List contracts                       │  │  │
│  │  │  • POST /{id}/update_milestone/ - Update        │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                            ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              PERMISSIONS (permissions.py)               │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  • IsFreelancer - Only freelancer role                   │  │
│  │  • IsClient - Only client role                           │  │
│  │  • IsOwner - Only owner of object                        │  │
│  │  • IsFreelancerOrClient - Either role                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          SERIALIZERS (serializers.py)                    │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  • UserSerializer - User data                            │  │
│  │  • UserProfileSerializer - Profile with nested user     │  │
│  │  • ProjectSerializer - Project with client/freelancer   │  │
│  │  • ProposalSerializer - Proposal with project details   │  │
│  │  • ContractSerializer - Contract with all relations     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            MODELS (models.py)                            │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  User (Django built-in)                                 │  │
│  │    ├─ username                                          │  │
│  │    ├─ email                                             │  │
│  │    ├─ first_name                                        │  │
│  │    └─ last_name                                         │  │
│  │          ↓ OneToOne                                     │  │
│  │  UserProfile                                            │  │
│  │    ├─ user                                              │  │
│  │    ├─ role (freelancer/client/admin)                    │  │
│  │    ├─ title                                             │  │
│  │    ├─ bio                                               │  │
│  │    └─ rating                                            │  │
│  │                                                         │  │
│  │  Project                                                │  │
│  │    ├─ title                                             │  │
│  │    ├─ description                                       │  │
│  │    ├─ client (FK to User)                               │  │
│  │    ├─ freelancer (FK to User, nullable)                 │  │
│  │    ├─ budget                                            │  │
│  │    ├─ status (open/active/completed)                    │  │
│  │    ├─ progress (0-100%)                                 │  │
│  │    └─ due_date                                          │  │
│  │                                                         │  │
│  │  Proposal                                               │  │
│  │    ├─ project (FK)                                      │  │
│  │    ├─ freelancer (FK to User)                           │  │
│  │    ├─ cover_letter                                      │  │
│  │    ├─ proposed_amount                                   │  │
│  │    ├─ timeline_days                                     │  │
│  │    └─ status (pending/accepted/rejected)                │  │
│  │                                                         │  │
│  │  Contract                                               │  │
│  │    ├─ project (OneToOne)                                │  │
│  │    ├─ proposal (OneToOne)                               │  │
│  │    ├─ client (FK to User)                               │  │
│  │    ├─ freelancer (FK to User)                           │  │
│  │    ├─ contract_value                                    │  │
│  │    ├─ start_date                                        │  │
│  │    ├─ end_date                                          │  │
│  │    └─ milestones (JSON)                                 │  │
│  │                                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  DATABASE                                │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  SQLite (Development)                                    │  │
│  │  PostgreSQL (Production)                                 │  │
│  │                                                          │  │
│  │  Tables:                                                 │  │
│  │  • auth_user                                             │  │
│  │  • freelancer_userprofile                                │  │
│  │  • freelancer_project                                    │  │
│  │  • freelancer_proposal                                   │  │
│  │  • freelancer_contract                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
┌─────────────────┐
│  Login Page     │
│  username/pwd   │
└────────┬────────┘
         │
         ↓
    POST /api/token/
         │
         ↓
    ┌────────────────────────────────────────┐
    │ TokenObtainPairView (djangorestframework)
    │ • Validate credentials                  │
    │ • Generate JWT tokens                   │
    └────────┬───────────────────────────────┘
             │
             ↓
    ┌──────────────────────────────────┐
    │  Response:                       │
    │  {                               │
    │    "access": "<access_token>",   │
    │    "refresh": "<refresh_token>"  │
    │  }                               │
    └──────────┬───────────────────────┘
               │
               ↓
    ┌──────────────────────────────────────┐
    │ Store in localStorage:               │
    │ • localStorage.access_token          │
    │ • localStorage.refresh_token         │
    └──────────┬──────────────────────────┘
               │
               ↓
    ┌──────────────────────────────────────────┐
    │  GET /api/profiles/me/                   │
    │  Headers: Authorization: Bearer <token>  │
    └──────────┬───────────────────────────────┘
               │
               ↓
    ┌──────────────────────────────────────┐
    │ UserProfileViewSet.me_action()       │
    │ • Verify token                       │
    │ • Fetch user profile                 │
    │ • Return user data                   │
    └──────────┬──────────────────────────┘
               │
               ↓
    ┌──────────────────────────────────────┐
    │ Set AuthContext user state           │
    │ Update Navbar with user info         │
    │ Redirect to dashboard                │
    └──────────────────────────────────────┘
```

---

## Request/Response Cycle

```
┌──────────────────┐
│ React Component  │
└────────┬─────────┘
         │
         ↓
   calls api.projectsApi.list()
         │
         ↓
┌──────────────────────────────────────────┐
│  GET /api/projects/                      │
│  Headers:                                │
│    Authorization: Bearer <access_token>  │
│    Content-Type: application/json        │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ Django DRF Router                        │
│ Matches route to ProjectViewSet.list()   │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ Permission Check                         │
│ • Verify JWT token valid                 │
│ • Check user role (IsFreelancer/IsClient)
│ • Check object-level permissions         │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ Viewset Logic                            │
│ • Filter projects by user role           │
│ • Apply search/filter/ordering           │
│ • Get queryset from database             │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ Serializer                               │
│ • Convert model instances to JSON        │
│ • Include related fields (client, FL)    │
│ • Handle pagination                      │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ HTTP Response 200 OK                     │
│ {                                        │
│   "count": 5,                            │
│   "next": null,                          │
│   "previous": null,                      │
│   "results": [                           │
│     {...project1...},                    │
│     {...project2...},                    │
│     ...                                  │
│   ]                                      │
│ }                                        │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ React Component                          │
│ • Update state with results              │
│ • Re-render with projects list           │
│ • Display on page                        │
└──────────────────────────────────────────┘
```

---

## Role-Based Access Examples

### Example 1: Freelancer Viewing Projects
```
Freelancer logs in
    ↓
GET /api/projects/ with freelancer token
    ↓
Backend checks permission: IsFreelancer ✓
    ↓
Filter: freelancer_id == user.id OR freelancer_id IS NULL (open projects)
    ↓
Return only projects freelancer can see
```

### Example 2: Client Creating Project
```
Client logs in
    ↓
POST /api/projects/ with client token
    {
      "title": "Build Dashboard",
      "budget": "5000",
      "description": "..."
    }
    ↓
Backend checks permission: IsClient ✓
    ↓
Create project with client_id = current_user.id
    ↓
Return 201 Created with project data
```

### Example 3: Freelancer Submitting Proposal
```
Freelancer views project details
    ↓
POST /api/proposals/ with freelancer token
    {
      "project_id": 1,
      "cover_letter": "I can do this",
      "proposed_amount": "4500"
    }
    ↓
Backend checks permission: IsFreelancer ✓
    ↓
Create proposal with freelancer_id = current_user.id
    ↓
Return 201 Created with proposal data
```

---

## Token Refresh Flow

```
Request with expired access_token
    ↓
401 Unauthorized response
    ↓
AuthContext catches error
    ↓
Call refreshToken() with refresh_token
    ↓
POST /api/token/refresh/
    {
      "refresh": "<refresh_token>"
    }
    ↓
Backend validates refresh token
    ↓
Generate new access_token
    ↓
Update localStorage with new token
    ↓
Retry original request with new token
    ↓
Success!
```

---

## Component Hierarchy

```
App
├── BrowserRouter
│   └── Routes
│       ├── /login
│       │   └── Login Page
│       │       └── loginForm
│       │
│       └── / (Protected)
│           └── FreelancerLayout
│               ├── Navbar
│               │   ├── Search Bar
│               │   ├── Theme Toggle
│               │   ├── Notifications
│               │   └── User Menu (Logout)
│               │
│               ├── Sidebar
│               │   ├── Navigation Links
│               │   ├── Profile Card
│               │   ├── Quick Actions
│               │   └── Activity Feed
│               │
│               └── Outlet (Dynamic Content)
│                   ├── /           → FreelancerDashboard
│                   ├── /projects   → Projects Page
│                   ├── /proposals  → Proposals Page
│                   └── /contracts  → Contracts Page
│
└── AuthProvider (Context)
    └── AuthContext (State)
        ├── user
        ├── loading
        ├── error
        └── functions
            ├── login()
            ├── logout()
            ├── refreshToken()
            └── updateProfile()
```

---

## Environment Setup

```
Frontend Environment (localhost:5173)
├── React 18.2.0
├── React Router 6.18.0
├── Context API
├── Tailwind CSS 3.3.0
├── Vite 5.0
└── localStorage (token storage)

Backend Environment (localhost:8000)
├── Django 4.2.7
├── DRF 3.14.0
├── djangorestframework-simplejwt
├── django-cors-headers
├── SQLite (dev) / PostgreSQL (prod)
└── Gunicorn (production)

Database
├── SQLite (Development)
│   └── db.sqlite3
│
└── PostgreSQL (Production)
    ├── auth_user table
    ├── freelancer_userprofile table
    ├── freelancer_project table
    ├── freelancer_proposal table
    └── freelancer_contract table
```

---

**Status:** ✅ Complete Architecture

**Last Updated:** December 2024
