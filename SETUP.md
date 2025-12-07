# Freelancer Dashboard - Complete Setup Guide

## ✅ Project Overview
A full-stack web application with:
- **Frontend:** React 18 + Vite + Tailwind CSS (runs on port 5173)
- **Backend:** Django REST Framework (runs on port 8000)
- **Database:** SQLite with sample data

---

## 🚀 Quick Start

### Terminal 1: Start Backend Server
```powershell
cd C:\Users\surya\freelancer_backend
.\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```

Expected output:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### Terminal 2: Start Frontend Server
```powershell
cd C:\Users\surya\freelancer_dashboard
npm run dev
```

Expected output:
```
VITE v5.4.21 ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Terminal 3: Open in Browser
```
http://localhost:5173
```

---

## 📊 What You'll See

**Dashboard displays:**
- ✅ User profile (Freelancer1, Jane Developer)
- ✅ Project list with status and progress
- ✅ Proposals received
- ✅ Active contracts
- ✅ Earnings and ratings
- ✅ Sidebar with navigation
- ✅ Navbar with user menu

---

## 🔧 Backend - Django Setup

### Check Status
```powershell
cd C:\Users\surya\freelancer_backend
.\venv\Scripts\python.exe manage.py check
```

### Run Migrations (if needed)
```powershell
.\venv\Scripts\python.exe manage.py migrate
```

### Populate Sample Data
```powershell
.\venv\Scripts\python.exe manage.py shell -c "exec(open('populate_data.py').read())"
```

### Django Admin
```
http://127.0.0.1:8000/admin
Username: admin
Password: admin123
```

---

## 🎨 Frontend - React Setup

### Install Dependencies
```powershell
cd C:\Users\surya\freelancer_dashboard
npm install
```

### Build for Production
```powershell
npm run build
```

### Preview Production Build
```powershell
npm run preview
```

---

## 🔐 Sample Credentials

All users have password: `pass123`

### Freelancer Accounts
- Username: `freelancer1` (Jane Developer)
- Username: `freelancer2` (Mike Designer)

### Client Accounts
- Username: `client1` (John Client)
- Username: `client2` (Sarah Entrepreneur)

---

## 📡 API Endpoints

Base URL: `http://127.0.0.1:8000/api`

### Authentication
- `POST /token/` - Get JWT tokens
- `POST /token/refresh/` - Refresh access token

### Data Endpoints (Require JWT Token)
- `GET /profiles/me/` - Current user profile
- `GET /profiles/` - List all profiles
- `GET /projects/` - List projects
- `GET /proposals/` - List proposals
- `GET /contracts/` - List contracts

---

## 🗂️ Project Structure

```
freelancer_dashboard/
├── src/
│   ├── components/       # Navbar, Sidebar
│   ├── pages/           # FreelancerDashboard, Projects, Proposals, Contracts
│   ├── layouts/         # FreelancerLayout
│   ├── context/         # AuthContext (state management)
│   ├── services/        # API client (api.js)
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── package.json
├── vite.config.js
└── tailwind.config.cjs

freelancer_backend/
├── config/              # Django settings, urls
├── freelancer/          # Main app
│   ├── models.py        # Data models
│   ├── views.py         # API views
│   ├── serializers.py   # Data validation
│   ├── permissions.py   # Access control
│   ├── signals.py       # Auto-create profiles
│   └── urls.py          # API routes
├── venv/                # Python virtual environment
├── manage.py
├── db.sqlite3           # Database
└── populate_data.py     # Sample data script
```

---

## ✨ Features

✅ Role-based dashboard (Freelancer/Client)
✅ JWT authentication with refresh tokens
✅ Project management
✅ Proposal tracking
✅ Contract management
✅ User profiles with ratings
✅ Responsive UI with Tailwind CSS
✅ Real-time data fetching
✅ CORS enabled
✅ Sample data pre-loaded

---

## 🐛 Troubleshooting

### Frontend shows blank page
1. Open browser console (F12)
2. Check for errors
3. Verify backend is running on 8000
4. Check Network tab to see if API calls succeed

### Backend won't start
```powershell
cd C:\Users\surya\freelancer_backend
.\venv\Scripts\python.exe -m pip install --upgrade pip
.\venv\Scripts\pip install -r requirements.txt
```

### Ports already in use
- Kill process: `netstat -ano | findstr 5173` or `8000`
- Stop with: `Stop-Process -Id <PID> -Force`

### Database issues
```powershell
cd C:\Users\surya\freelancer_backend
Remove-Item db.sqlite3
.\venv\Scripts\python.exe manage.py migrate
.\venv\Scripts\python.exe manage.py shell -c "exec(open('populate_data.py').read())"
```

---

## 📝 Next Steps

1. ✅ Start both servers (see Quick Start above)
2. ✅ Open http://localhost:5173 in browser
3. ✅ Explore the dashboard
4. ✅ Test different user roles
5. ✅ Check API endpoints with Postman or curl

---

## 🎯 Version Info

- Node.js: Latest LTS
- Python: 3.12+
- React: 18.2.0
- Django: 6.0
- Vite: 5.0
