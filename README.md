# Freelancer Dashboard - Full Stack Application

A complete full-stack application for managing freelancer projects, proposals, and contracts. Built with React + Django REST Framework with JWT authentication and role-based access control.

## 🎯 Project Overview

**Freelancer Dashboard** is a web application that connects clients with freelancers to:
- Create and manage projects
- Submit and review proposals
- Track contracts and milestones
- Manage user profiles and ratings

### Key Features

✅ **Authentication**
- JWT-based authentication (access + refresh tokens)
- Secure login/logout with token storage
- Auto-login on page refresh
- Protected routes

✅ **User Management**
- Role-based access (Freelancer, Client, Admin)
- User profiles with ratings
- Profile customization (bio, title, avatar)
- User-specific dashboards

✅ **Project Management**
- Create projects with budget and timeline
- Assign freelancers to projects
- Track project progress
- Filter by status and client

✅ **Proposal System**
- Submit proposals with cover letters
- Accept/reject proposals
- Automatic contract creation on acceptance
- Proposal tracking

✅ **Contract Management**
- Milestone tracking with progress updates
- Contract value and timeline management
- Client-freelancer collaboration
- Contract history

---

## 🏗️ Architecture

### Frontend Stack
- **React 18.2.0** - UI framework
- **React Router 6.18.0** - Client-side routing
- **Context API** - State management
- **Tailwind CSS 3.3.0** - Styling
- **Vite 5.0** - Build tool

### Backend Stack
- **Django 4.2.7** - Web framework
- **Django REST Framework 3.14.0** - REST APIs
- **djangorestframework-simplejwt 5.3.2** - JWT authentication
- **django-cors-headers 4.3.1** - CORS support
- **PostgreSQL** - Database (SQLite for dev)

---

## 📁 Project Structure

```
freelancer_dashboard/                # React Frontend
├── src/
│   ├── App.jsx                      # Main app with routes
│   ├── index.css                    # Tailwind styles
│   ├── main.jsx                     # Entry point
│   ├── context/
│   │   └── AuthContext.jsx          # Auth state & JWT logic
│   ├── services/
│   │   └── api.js                   # API client
│   ├── pages/
│   │   ├── Login.jsx                # Login page
│   │   ├── FreelancerDashboard.jsx  # Main dashboard
│   │   ├── Projects.jsx             # Projects page
│   │   ├── Proposals.jsx            # Proposals page
│   │   └── Contracts.jsx            # Contracts page
│   ├── components/
│   │   ├── Navbar.jsx               # Top navigation
│   │   └── Sidebar.jsx              # Left sidebar
│   └── layouts/
│       └── FreelancerLayout.jsx     # Main layout
├── INTEGRATION.md                   # Integration guide
├── QUICK_START.md                   # Quick start guide
├── package.json
└── tailwind.config.cjs

freelancer_backend/                 # Django Backend
├── config/
│   ├── settings.py                  # Django settings
│   ├── urls.py                      # URL routing
│   ├── wsgi.py                      # WSGI application
│   ├── asgi.py                      # ASGI application
│   └── __init__.py
├── freelancer/
│   ├── models.py                    # Data models
│   ├── serializers.py               # DRF serializers
│   ├── views.py                     # API viewsets
│   ├── permissions.py               # Custom permissions
│   ├── urls.py                      # API routes
│   ├── signals.py                   # Django signals
│   ├── apps.py                      # App config
│   ├── admin.py                     # Admin interface
│   ├── tests.py                     # Unit tests
│   └── __init__.py
├── manage.py                        # Django management
├── requirements.txt                 # Python dependencies
├── populate_data.py                 # Sample data script
├── API_TESTING.md                   # API test guide
├── README.md                        # Backend docs
└── .env.example                     # Environment template
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn

### Setup Backend

```bash
cd c:\Users\surya\freelancer_backend

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Load sample data
python manage.py shell < populate_data.py

# Start server
python manage.py runserver
```

Backend runs on: **http://localhost:8000**

### Setup Frontend

```bash
cd c:\Users\surya\freelancer_dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 🔑 Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Freelancer | `freelancer1` | `pass123` |
| Freelancer | `freelancer2` | `pass123` |
| Client | `client1` | `pass123` |
| Client | `client2` | `pass123` |

---

## 📚 Documentation

- **[INTEGRATION.md](./INTEGRATION.md)** - Frontend-Backend integration guide
- **[QUICK_START.md](./QUICK_START.md)** - Quick setup instructions
- **[Backend README](../freelancer_backend/README.md)** - Backend API documentation
- **[API Testing Guide](../freelancer_backend/API_TESTING.md)** - API testing examples

---

## 🔐 Authentication Flow

### Login Process
```
1. User enters credentials on Login page
   ↓
2. POST /api/token/ with username + password
   ↓
3. Backend returns access_token + refresh_token
   ↓
4. Tokens stored in localStorage
   ↓
5. Fetch user profile with access token
   ↓
6. Redirect to dashboard
```

### API Requests
```
Every API request includes:
Authorization: Bearer <access_token>
Content-Type: application/json

If token expired:
1. Refresh endpoint called: POST /api/token/refresh/
2. New access_token obtained
3. Request retried with new token
```

### Logout Process
```
1. Clear tokens from localStorage
2. Clear user state
3. Redirect to login page
```

---

## 🔑 Key API Endpoints

### Authentication
- `POST /api/token/` - Login
- `POST /api/token/refresh/` - Refresh token

### Profiles
- `GET /api/profiles/me/` - Current user profile
- `PUT /api/profiles/update_profile/` - Update profile

### Projects
- `GET /api/projects/` - List projects
- `POST /api/projects/` - Create project
- `GET /api/projects/{id}/` - Project detail
- `PUT /api/projects/{id}/` - Update project
- `POST /api/projects/{id}/assign_freelancer/` - Assign freelancer

### Proposals
- `GET /api/proposals/` - List proposals
- `POST /api/proposals/` - Create proposal
- `GET /api/proposals/{id}/` - Proposal detail
- `POST /api/proposals/{id}/accept/` - Accept proposal
- `POST /api/proposals/{id}/reject/` - Reject proposal

### Contracts
- `GET /api/contracts/` - List contracts
- `GET /api/contracts/{id}/` - Contract detail
- `POST /api/contracts/{id}/update_milestone/` - Update milestone

---

## 🛠️ Development

### Running Tests

**Backend:**
```bash
cd freelancer_backend
python manage.py test
```

**Frontend:**
```bash
cd freelancer_dashboard
npm test
```

### Building for Production

**Backend:**
```bash
# Using Gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

**Frontend:**
```bash
npm run build
# Output in dist/ directory
```

---

## 📊 Database Models

### User (Django)
- username, email, password (Django built-in)
- first_name, last_name

### UserProfile
- user (OneToOneField)
- role (freelancer/client/admin)
- title, bio, rating
- created_at, updated_at

### Project
- title, description
- client (ForeignKey → User)
- freelancer (ForeignKey → User, nullable)
- budget, status, progress
- due_date
- created_at, updated_at

### Proposal
- project (ForeignKey)
- freelancer (ForeignKey → User)
- cover_letter
- proposed_amount
- timeline_days
- status (pending/accepted/rejected)
- created_at, updated_at

### Contract
- project (OneToOneField)
- proposal (OneToOneField)
- client, freelancer (ForeignKeys)
- contract_value
- start_date, end_date
- milestones (JSON array)
- created_at, updated_at

---

## 🔒 Role-Based Access Control

| Feature | Freelancer | Client | Admin |
|---------|-----------|--------|-------|
| View Dashboard | ✅ | ✅ | ✅ |
| Create Project | ❌ | ✅ | ✅ |
| View Projects | ✅ (assigned) | ✅ (own) | ✅ (all) |
| Submit Proposal | ✅ | ❌ | ✅ |
| Accept Proposal | ❌ | ✅ (own) | ✅ |
| View Contracts | ✅ | ✅ | ✅ |
| Update Milestone | ✅ | ✅ | ✅ |

---

## 🚨 Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid/expired token | Login again |
| 403 Forbidden | Insufficient permissions | Use correct role |
| 404 Not Found | Resource doesn't exist | Check ID |
| CORS Error | Backend not running | Start Django server |
| Connection refused | Backend unreachable | Check localhost:8000 |

---

## 🐛 Debugging

### Backend
```bash
# Check migrations
python manage.py showmigrations

# Django shell
python manage.py shell

# Create test data
python manage.py shell < populate_data.py
```

### Frontend
- DevTools Console (F12)
- Network tab for API calls
- Redux DevTools for state
- React DevTools for components

---

## 📈 Performance Considerations

- **Frontend**: Vite provides fast development and production builds
- **Backend**: DRF includes pagination, filtering, and search
- **Database**: Indexes on commonly queried fields
- **Caching**: Consider Redis for token caching
- **CORS**: Configured for specific origins only

---

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push to origin
git push -u origin feature/your-feature

# Create Pull Request
# Go to GitHub and create PR to main branch
```

---

## 📝 Environment Variables

### Frontend (.env in root)
```
VITE_API_URL=http://localhost:8000/api
```

### Backend (.env in freelancer_backend)
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60
JWT_REFRESH_TOKEN_EXPIRE_DAYS=1
```

---

## 🌐 Deployment

### Backend Deployment (Heroku example)
```bash
# Create Procfile
echo "web: gunicorn config.wsgi" > Procfile

# Create .env for production
cp .env.example .env
# Update .env with production values

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel example)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Update API_BASE_URL in production build
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

For issues, questions, or suggestions:
1. Check the documentation files
2. Review API_TESTING.md for API examples
3. Check backend README.md for Django setup
4. Open an issue on GitHub

---

## ✨ Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] File uploads (portfolio, documents)
- [ ] Payment integration (Stripe)
- [ ] Review and rating system
- [ ] Messaging system
- [ ] Advanced search and filtering
- [ ] Analytics dashboard
- [ ] Email notifications

---

## 🎉 Status

✅ **Complete**
- React frontend with routing
- Django backend with REST APIs
- JWT authentication
- Role-based access control
- Sample data

🔄 **In Progress**
- Integration testing
- UI enhancements
- API testing

📋 **Planned**
- Real-time features
- Payment integration
- Advanced features

---

**Last Updated:** December 2024

**Authors:** Surya Gayatri (suryangayatri17-bot)
