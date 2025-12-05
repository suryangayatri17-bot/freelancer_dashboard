# Quick Start Guide - Full Stack Setup

## 🚀 Start Everything in 2 Minutes

### Terminal 1: Start Django Backend

```powershell
cd c:\Users\surya\freelancer_backend
.\venv\Scripts\Activate.ps1
python manage.py migrate
python manage.py shell < populate_data.py
python manage.py runserver
```

Expected output:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
✅ Sample data created successfully!
```

### Terminal 2: Start React Frontend

```powershell
cd c:\Users\surya\freelancer_dashboard
npm install
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 🔑 Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Freelancer | `freelancer1` | `pass123` |
| Freelancer | `freelancer2` | `pass123` |
| Client | `client1` | `pass123` |
| Client | `client2` | `pass123` |
| Admin | `admin` | `password` |

---

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:5173
- [ ] Can access http://localhost:8000/admin (Django admin)
- [ ] Can login with freelancer1/pass123
- [ ] Can see dashboard with user info
- [ ] Can logout and login with different user

---

## 📁 Project Structure

```
c:\Users\surya\
├── freelancer_dashboard/          # React Frontend
│   ├── src/
│   │   ├── App.jsx               # Main app with routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # JWT auth + user state
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── FreelancerDashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Proposals.jsx
│   │   │   └── Contracts.jsx
│   │   └── components/
│   │       ├── Navbar.jsx
│   │       └── Sidebar.jsx
│   ├── INTEGRATION.md            # Frontend-Backend guide
│   └── package.json
│
└── freelancer_backend/            # Django Backend
    ├── config/
    │   ├── settings.py           # JWT, CORS config
    │   ├── urls.py
    │   └── wsgi.py
    ├── freelancer/
    │   ├── models.py             # User, Project, Proposal, Contract
    │   ├── serializers.py        # DRF serializers
    │   ├── views.py              # Viewsets with custom actions
    │   ├── permissions.py        # Role-based permissions
    │   ├── urls.py               # API routing
    │   └── signals.py            # Auto-create UserProfile
    ├── manage.py
    ├── requirements.txt
    ├── populate_data.py          # Sample data script
    ├── API_TESTING.md            # API test examples
    └── README.md                 # Backend setup guide
```

---

## 🔄 Complete User Journey

### 1. Freelancer Flow
```
Login (freelancer1) → View Dashboard → Browse Projects 
→ Submit Proposal → Wait for acceptance → View Contract 
→ Update milestones → Logout
```

### 2. Client Flow
```
Login (client1) → Create Project → View Proposals 
→ Accept proposal → Contract created → Track progress 
→ Logout
```

---

## 🐛 Debugging Tips

### Backend issues
```powershell
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Clear database and start fresh
rm db.sqlite3
python manage.py migrate
python manage.py shell < populate_data.py

# Check migrations
python manage.py showmigrations
```

### Frontend issues
```powershell
# Clear node_modules and reinstall
rm -r node_modules
npm install

# Clear cache
npm run build --reset-cache

# Check if port 5173 is in use
netstat -ano | findstr :5173
```

### CORS issues
- Ensure backend is running first
- Check `CORS_ALLOWED_ORIGINS` in `config/settings.py`
- Frontend URL must be exactly `http://localhost:5173`

---

## 📊 Next Steps

### Phase 1: Verify Integration (Done ✅)
- [x] Backend API created
- [x] Frontend connected to backend
- [x] JWT authentication working
- [x] Sample data created

### Phase 2: Test All Features (In Progress)
- [ ] Test login with both freelancer and client
- [ ] Test creating/viewing projects
- [ ] Test submitting/accepting proposals
- [ ] Test contract milestone tracking

### Phase 3: Enhance UI (TODO)
- [ ] Add create/edit forms for projects
- [ ] Add proposal submission form
- [ ] Add real-time notifications
- [ ] Add profile editing

### Phase 4: Deploy (TODO)
- [ ] Setup PostgreSQL for production
- [ ] Deploy backend to Heroku/AWS
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Setup environment variables

---

## 📚 Documentation Files

1. **INTEGRATION.md** (Frontend)
   - Frontend-backend architecture
   - API integration examples
   - Token refresh flow
   - Testing scenarios

2. **README.md** (Backend)
   - Django setup instructions
   - Models explanation
   - API endpoints reference
   - Authentication flow

3. **API_TESTING.md** (Backend)
   - cURL examples
   - Postman collection
   - Step-by-step test scenario

4. **QUICK_START.md** (This file)
   - Quick setup instructions
   - Login credentials
   - Debugging tips

---

## 🎯 Key Features Implemented

✅ **Authentication**
- JWT tokens (access + refresh)
- Login/logout
- Protected routes
- Auto-login on page refresh

✅ **User Management**
- User profiles with roles (freelancer, client, admin)
- Profile ratings and reviews
- Bio and title fields

✅ **Projects**
- Create projects (clients)
- Assign freelancers
- Track progress
- Set budgets and deadlines

✅ **Proposals**
- Submit proposals (freelancers)
- Review proposals (clients)
- Accept/reject proposals
- Automatic contract creation

✅ **Contracts**
- Milestone tracking
- Progress updates
- Contract value tracking

---

## 💡 Pro Tips

1. **For testing multiple users:**
   - Open one browser window for freelancer
   - Open incognito window for client
   - Compare their different views

2. **For API testing:**
   - Use Postman to test endpoints
   - Import the collection from API_TESTING.md
   - Test with different user tokens

3. **For database inspection:**
   - Go to http://localhost:8000/admin
   - Create superuser: `python manage.py createsuperuser`
   - Browse models and data

4. **For debugging React:**
   - Open DevTools (F12)
   - Check Network tab for API calls
   - Check Console for errors
   - Check LocalStorage for tokens

---

**Status:** ✅ Full Stack Application Ready

**Next Action:** Run the commands in Terminal 1 and Terminal 2 above to start the application!
