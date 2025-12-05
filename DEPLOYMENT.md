# Deployment Guide - Freelancer Dashboard

## 📦 Building for Production

### Frontend Build

The frontend has been successfully tested and builds without errors:
```
✓ 38 modules transformed
✓ built in 1.14s

Output:
- dist/index.html (0.40 kB)
- dist/assets/index-BWSLAiO8.css (15.02 kB)
- dist/assets/index-CFcp3A9p.js (190.47 kB)
```

To build manually:
```bash
cd c:\Users\surya\freelancer_dashboard
npm run build
```

Output files will be in `dist/` directory.

### Backend Production Ready

The Django backend is configured for production with:
- Gunicorn WSGI application
- PostgreSQL support
- Security settings for production
- Environment variable support

---

## 🌐 Deployment Options

### Option 1: Deploy to Heroku (Recommended for Quick Start)

#### Backend Deployment

```bash
# 1. Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# 2. Login to Heroku
heroku login

# 3. Create Heroku app
cd c:\Users\surya\freelancer_backend
heroku create freelancer-dashboard-api

# 4. Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# 5. Set environment variables
heroku config:set DEBUG=False
heroku config:set SECRET_KEY=your-secret-key-here
heroku config:set ALLOWED_HOSTS=freelancer-dashboard-api.herokuapp.com
heroku config:set CORS_ALLOWED_ORIGINS=https://freelancer-dashboard.vercel.app

# 6. Create Procfile in backend directory
echo "web: gunicorn config.wsgi" > Procfile

# 7. Deploy
git push heroku main

# 8. Run migrations
heroku run python manage.py migrate

# 9. Create superuser
heroku run python manage.py createsuperuser

# 10. View logs
heroku logs --tail
```

#### Frontend Deployment

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Build frontend
cd c:\Users\surya\freelancer_dashboard
npm run build

# 3. Deploy to Vercel
vercel

# 4. Set environment variable in Vercel dashboard
# VITE_API_URL=https://freelancer-dashboard-api.herokuapp.com/api

# 5. Redeploy to apply environment variable
vercel --prod
```

---

### Option 2: Deploy to AWS

#### Backend (EC2 + RDS)

```bash
# 1. Create EC2 instance (Ubuntu 20.04)
# 2. SSH into instance
ssh -i key.pem ubuntu@your-ec2-ip

# 3. Setup environment
sudo apt-get update
sudo apt-get install python3-pip python3-venv postgresql-client

# 4. Clone repository
git clone https://github.com/yourusername/freelancer_dashboard.git
cd freelancer_dashboard/freelancer_backend

# 5. Setup Python environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 6. Create .env file
cp .env.example .env
# Edit .env with production values

# 7. Run migrations
python manage.py migrate

# 8. Collect static files
python manage.py collectstatic --noinput

# 9. Create systemd service for Gunicorn
sudo nano /etc/systemd/system/freelancer-api.service
```

Create the service file with:
```ini
[Unit]
Description=Freelancer API
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/freelancer_dashboard/freelancer_backend
ExecStart=/home/ubuntu/freelancer_dashboard/freelancer_backend/venv/bin/gunicorn \
    --workers 4 \
    --bind 0.0.0.0:8000 \
    config.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
# 10. Start service
sudo systemctl start freelancer-api
sudo systemctl enable freelancer-api

# 11. Setup Nginx reverse proxy
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/freelancer-api
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static/ {
        alias /home/ubuntu/freelancer_dashboard/freelancer_backend/staticfiles/;
    }
}
```

```bash
# 12. Enable Nginx
sudo ln -s /etc/nginx/sites-available/freelancer-api /etc/nginx/sites-enabled/
sudo systemctl start nginx
```

#### Frontend (S3 + CloudFront)

```bash
# 1. Build frontend
npm run build

# 2. Create S3 bucket
aws s3 mb s3://freelancer-dashboard-frontend

# 3. Upload build files
aws s3 sync dist/ s3://freelancer-dashboard-frontend/

# 4. Create CloudFront distribution
# Use AWS Console to create distribution pointing to S3

# 5. Update DNS
# Point your domain to CloudFront distribution
```

---

### Option 3: Deploy to DigitalOcean

#### Backend + Frontend (App Platform)

```bash
# 1. Connect GitHub repository
# https://cloud.digitalocean.com/apps

# 2. Create new App

# 3. Configure backend service
# - Build command: pip install -r requirements.txt
# - Run command: gunicorn config.wsgi:application

# 4. Configure frontend service
# - Build command: npm run build
# - Output directory: dist

# 5. Add PostgreSQL database
# - Create managed PostgreSQL

# 6. Set environment variables
DATABASE_URL=your-database-url
DEBUG=False
SECRET_KEY=your-secret-key

# 7. Deploy
# Push to main branch and DigitalOcean will auto-deploy
```

---

## 🗄️ Database Setup for Production

### PostgreSQL Setup

```bash
# 1. Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# 2. Create database
sudo -u postgres psql
CREATE DATABASE freelancer_db;
CREATE USER freelancer_user WITH PASSWORD 'your-secure-password';
ALTER ROLE freelancer_user SET client_encoding TO 'utf8';
ALTER ROLE freelancer_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE freelancer_user SET default_transaction_deferrable TO on;
ALTER ROLE freelancer_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE freelancer_db TO freelancer_user;
\q

# 3. Update Django settings
# In .env:
DATABASE_URL=postgresql://freelancer_user:password@localhost:5432/freelancer_db
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change `DEBUG=False` in settings
- [ ] Set secure `SECRET_KEY`
- [ ] Update `ALLOWED_HOSTS`
- [ ] Configure `CORS_ALLOWED_ORIGINS`
- [ ] Use HTTPS only (SSL certificate)
- [ ] Set `SECURE_SSL_REDIRECT=True`
- [ ] Configure `SESSION_COOKIE_SECURE=True`
- [ ] Set `CSRF_COOKIE_SECURE=True`
- [ ] Update database credentials
- [ ] Use strong password for superuser
- [ ] Enable firewall rules
- [ ] Setup backup strategy
- [ ] Configure logging and monitoring

---

## 📋 Environment Variables for Production

### Backend (.env)

```env
# Django
DEBUG=False
SECRET_KEY=your-very-secret-key-with-random-characters
ALLOWED_HOSTS=yourdomain.com,api.yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/database_name

# CORS
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# JWT
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60
JWT_REFRESH_TOKEN_EXPIRE_DAYS=7

# Email (optional)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Gunicorn
WORKERS=4
```

### Frontend (.env.production)

```env
VITE_API_URL=https://api.yourdomain.com
```

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code reviewed
- [ ] No console errors
- [ ] Build runs successfully
- [ ] Environment variables set
- [ ] Database migrations ready
- [ ] Security checklist passed

### Deployment
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] DNS configured
- [ ] SSL certificate installed
- [ ] Environment variables applied
- [ ] Database migrations run
- [ ] Superuser created
- [ ] Sample data loaded

### Post-Deployment
- [ ] Test login flow
- [ ] Test API endpoints
- [ ] Monitor logs
- [ ] Setup monitoring/alerts
- [ ] Backup database
- [ ] Document deployment steps

---

## 📊 Monitoring & Maintenance

### Logging

```python
# In settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

### Performance Optimization

1. **Frontend Optimization**
   - Enable gzip compression in Nginx/Cloudfront
   - Use CDN for static files
   - Enable browser caching
   - Minify JavaScript/CSS (Vite does this)

2. **Backend Optimization**
   - Use database connection pooling
   - Enable query caching
   - Use Redis for session storage
   - Implement pagination on list endpoints
   - Add indexes on frequently queried fields

3. **Database Optimization**
   - Regular VACUUM and ANALYZE
   - Setup automated backups
   - Monitor query performance
   - Optimize slow queries

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9
      - name: Install dependencies
        run: |
          cd freelancer_backend
          pip install -r requirements.txt
      - name: Run tests
        run: |
          cd freelancer_backend
          python manage.py test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: freelancer-dashboard-api
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

---

## 📞 Support

For deployment issues:
1. Check logs: `heroku logs --tail` or server logs
2. Verify environment variables are set
3. Check database connection
4. Verify CORS configuration
5. Test API endpoints with Postman

---

## 🎉 You're Ready!

Your Freelancer Dashboard is ready for deployment!

Choose your preferred deployment option above and follow the steps.

---

**Status:** ✅ Ready for Production

**Last Updated:** December 2024
