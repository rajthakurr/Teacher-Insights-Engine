# Teacher Insights Dashboard - Copilot Instructions

## Project Overview
A full-stack analytics dashboard built with React (frontend) and Node.js/Express (backend) for monitoring teacher activity and engagement.

## Project Structure
- **backend/**: Express.js server with REST APIs
- **frontend/**: React application with Chart.js visualizations
- **data/**: JSON dataset with teacher activity records

## Development Status

### Completed
- ✅ Project structure and file organization
- ✅ Backend API with 7 endpoints for data retrieval and analysis
- ✅ React frontend with Dashboard and TeacherAnalytics components
- ✅ Chart visualizations (Line, Bar, Doughnut)
- ✅ Sample dataset with 24 activity records
- ✅ Responsive CSS styling
- ✅ API documentation

### To Run the Project

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Start Backend Server**
   ```bash
   npm start
   ```
   Backend runs on http://localhost:5000

3. **Install Frontend Dependencies** (in a new terminal)
   ```bash
   cd frontend
   npm install
   ```

4. **Start Frontend Development Server**
   ```bash
   npm start
   ```
   Frontend opens at http://localhost:3000

## Key Features
- Overall teacher activity overview with summary cards
- Weekly activity trend visualization
- Per-teacher detailed analytics
- Activity breakdown by type (lesson, quiz, assessment)
- Responsive design with mobile support
- Interactive charts with Chart.js

## Backend API Endpoints
- `GET /api/teachers` - All teachers with activity counts
- `GET /api/summary` - Overall activity summary
- `GET /api/weekly-trends` - Weekly activity trends
- `GET /api/teacher/:teacher_id` - Teacher-specific analytics
- `GET /api/activities` - Filtered activities
- `GET /api/activities/by-type` - Activities grouped by type
- `GET /api/dashboard` - Complete dashboard data

## Dependencies Installed

### Backend
- express (4.18.2) - Web framework
- cors (2.8.5) - Cross-origin resource sharing
- body-parser (1.20.2) - JSON parsing
- nodemon (3.0.1) - Development auto-reload

### Frontend
- react (18.2.0) - UI library
- react-dom (18.2.0) - React DOM rendering
- react-scripts (5.0.1) - Build tools
- chart.js (4.4.0) - Charting library
- react-chartjs-2 (5.2.0) - React wrapper for Chart.js
- axios (1.6.0) - HTTP client

## Notes
- Dataset is loaded from `data/teacher_activity_data.json`
- Backend aggregates data on the fly (easily extensible to database)
- Frontend uses Chart.js with responsive options
- All components are CSS modules with proper styling
- CORS enabled for frontend-backend communication
