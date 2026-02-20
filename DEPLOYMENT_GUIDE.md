# Deployment & Setup Guide

## Current Status ✅

### ✅ Completed
- Backend server is running successfully on **http://localhost:5000**
- All 24 activity records loaded from dataset
- Frontend dependencies installed and ready
- All API endpoints tested and working

### 📁 Project Files Created
- Backend: `backend/server.js` with 7 API endpoints
- Frontend: React components (Dashboard, TeacherAnalytics, Summary, TeacherList)
- Dataset: 24 teacher activity records with 5 teachers
- Styling: Responsive CSS for desktop and mobile

---

## 🚀 Running the Application Locally

### Option 1: Using Two Terminals (Recommended for Development)

#### Terminal 1 - Backend Server

```bash
cd backend
npm install  # if not already done
npm start
```

Expected output:
```
Teacher Insights Backend running on http://localhost:5000
Loaded 24 activity records
```

#### Terminal 2 - Frontend Server

```bash
cd frontend
npm install  # if not already done
npm start
```

The frontend will automatically open your browser to **http://localhost:3000**

### Option 2: Using npm Concurrently (Single Terminal)

Add concurrently package to root:
```bash
npm install -D concurrently
```

Create `package.json` in root:
```json
{
  "name": "teacher-insights-dashboard",
  "scripts": {
    "dev": "concurrently \"cd backend && npm start\" \"cd frontend && npm start\""
  },
  "devDependencies": {
    "concurrently": "^7.0.0"
  }
}
```

Then run:
```bash
npm run dev
```

---

## 🧪 Testing the Application

### 1. Test Backend API

Once backend is running, test endpoints:

```bash
# Get all teachers
curl http://localhost:5000/api/teachers

# Get summary
curl http://localhost:5000/api/summary

# Get weekly trends
curl http://localhost:5000/api/weekly-trends

# Get specific teacher (T001)
curl http://localhost:5000/api/teacher/T001

# Get dashboard data
curl http://localhost:5000/api/dashboard
```

### 2. Test Frontend

Once frontend is running, visit:
```
http://localhost:3000
```

Check:
- ✅ Summary cards display correct numbers
- ✅ Weekly activity line chart loads
- ✅ Activity breakdown bar chart shows lesson/quiz/assessment counts
- ✅ Teacher list displays all 5 teachers
- ✅ Clicking a teacher shows detailed analytics
- ✅ Charts are responsive and interactive

---

## 🌐 Deployment Guide

### Backend Deployment (Heroku)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku app**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

4. **Set environment variable for production**
   ```bash
   heroku config:set NODE_ENV=production
   ```

Backend will be available at:
```
https://your-app-name.herokuapp.com
```

### Frontend Deployment (Vercel)

1. **Create .env.production**
   ```
   REACT_APP_API_URL=https://your-app-name.herokuapp.com
   ```

2. **Update API calls in App.js**
   ```javascript
   const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   // Use apiUrl instead of hardcoded localhost
   ```

3. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

### Alternative: Docker Deployment

**Dockerfile for Backend**
```dockerfile
FROM node:16
WORKDIR /app
COPY backend/ .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
```

**Dockerfile for Frontend**
```dockerfile
FROM node:16 AS build
WORKDIR /app
COPY frontend/ .
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
```

---

## 📊 API Response Examples

### GET /api/dashboard (Complete Dashboard Data)

```json
{
  "teachers": [
    {
      "teacher_id": "T001",
      "teacher_name": "Mr. John Smith",
      "activity_count": 4,
      "activity_breakdown": {
        "lesson": 2,
        "quiz": 1,
        "assessment": 1
      }
    }
  ],
  "weekly_trends": [
    {
      "week": "2025-01-06",
      "total_activities": 5,
      "breakdown": {
        "lesson": 3,
        "quiz": 1,
        "assessment": 1
      }
    }
  ],
  "summary": {
    "total_activities": 24,
    "total_teachers": 5,
    "activity_breakdown": {
      "lesson": 12,
      "quiz": 6,
      "assessment": 6
    }
  }
}
```

### GET /api/teacher/:teacher_id (Teacher-Specific Analytics)

```json
{
  "teacher_id": "T001",
  "teacher_name": "Mr. John Smith",
  "total_activities": 4,
  "activity_breakdown": {
    "lesson": 2,
    "quiz": 1,
    "assessment": 1
  },
  "weekly_breakdown": {
    "2025-01-06": [
      {
        "id": 1,
        "teacher_id": "T001",
        "teacher_name": "Mr. John Smith",
        "activity_type": "lesson",
        "subject": "Mathematics",
        "class": "10-A",
        "created_at": "2025-01-08T09:30:00Z"
      }
    ]
  },
  "subjects": ["Mathematics"],
  "classes": ["10-A"]
}
```

---

## 🔧 Troubleshooting

### Backend Issues

**Port 5000 already in use**
```bash
# Find and kill process using port 5000
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Data not loading**
- Ensure `data/teacher_activity_data.json` exists
- Verify JSON format is valid
- Check file permissions

### Frontend Issues

**React not loading on localhost:3000**
- Clear browser cache: Ctrl+Shift+Delete
- Kill and restart `npm start`
- Check if port 3000 is in use

**API calls failing**
- Ensure backend is running on port 5000
- Check CORS settings in backend
- Verify firewall isn't blocking requests

**Build errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --force
```

---

## 📈 Extending the Dashboard

### Add Database Integration

Replace JSON loading in `backend/server.js`:

```javascript
// Instead of:
// const activityData = JSON.parse(fs.readFileSync(dataPath));

// Use MongoDB:
const mongoose = require('mongoose');
const Activity = mongoose.model('Activity', activitySchema);
const activityData = await Activity.find();
```

### Add Authentication

```bash
npm install jsonwebtoken bcryptjs
```

### Add More Metrics

Add new endpoints for:
- Student engagement rates
- Performance trends
- Teacher comparison
- Subject-wise analytics

### Add Real-time Updates

Use Socket.io:
```bash
npm install socket.io
```

---

## 📝 Production Checklist

- [ ] Secure API endpoints with authentication
- [ ] Set up database (MongoDB/PostgreSQL)
- [ ] Configure environment variables
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS properly for production domain
- [ ] Set up error logging
- [ ] Set up monitoring and alerts
- [ ] Optimize images and assets
- [ ] Set up CI/CD pipeline
- [ ] Backup database daily
- [ ] Set up rate limiting
- [ ] Configure caching strategies

---

## 📞 Support

For issues or questions:
1. Check the main README.md
2. Review troubleshooting section above
3. Check API endpoint documentation in backend/server.js

---

**Last Updated**: February 20, 2025
