# Teacher Insights Dashboard

A comprehensive analytics dashboard for school administrators to monitor teacher activity and engagement. Built with React, Node.js/Express, and Chart.js.

> **⚡ Quick Start**: New to this project? Read [START_HERE.md](START_HERE.md) to get up and running in 2 minutes!

## 🎯 Features

- **Overall Teacher Activity Overview**: View total lessons, quizzes, and assessments created per teacher
- **Weekly Activity Trends**: Charts showing activity volume over time with weekly aggregation
- **Per-Teacher Analysis**: Detailed analytics for individual teachers with activity breakdown
- **Filters & Insights**: Filter by teacher, view time-based trends, and subject/class breakdowns
- **Interactive Charts**: Line charts, bar charts, and doughnut charts for data visualization
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📋 Project Structure

```
teacher-Insights-dashboard/
├── backend/                          # Node.js Express backend
│   ├── package.json
│   └── server.js                    # Main server file with API endpoints
├── frontend/                         # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js         # Main dashboard component
│   │   │   ├── Dashboard.css
│   │   │   ├── TeacherList.js       # Teacher list component
│   │   │   ├── TeacherList.css
│   │   │   ├── TeacherAnalytics.js  # Individual teacher analytics
│   │   │   ├── TeacherAnalytics.css
│   │   │   ├── Summary.js           # Summary cards component
│   │   │   └── Summary.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── data/
│   └── teacher_activity_data.json   # Sample dataset
└── README.md
```

## 🛠 Tech Stack

- **Frontend**: React 18, Chart.js, Axios
- **Backend**: Node.js, Express.js
- **Data**: JSON-based (extensible to database)
- **Styling**: CSS3 with responsive design

## 📊 Dataset Structure

Each activity record contains:
- `teacher_id`: Unique teacher identifier
- `teacher_name`: Name of the teacher
- `activity_type`: Type of activity (lesson, quiz, assessment)
- `created_at`: Timestamp of activity creation
- `subject`: Subject being taught
- `class`: Class/grade level

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will open at `http://localhost:3000`

## 📡 API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/teachers` - Get all teachers with activity counts
- `GET /api/summary` - Get overall activity summary
- `GET /api/weekly-trends` - Get weekly activity trends
- `GET /api/teacher/:teacher_id` - Get detailed analytics for a specific teacher
- `GET /api/activities/by-type` - Get activities grouped by type
- `GET /api/activities` - Get filtered activities (supports query params: teacher_id, activity_type, subject)
- `GET /api/dashboard` - Get complete dashboard data

## 🎨 UI Components

### Dashboard
- Displays summary cards with key metrics
- Weekly activity trend line chart
- Activity breakdown bar chart
- Teacher list with quick stats

### Teacher Analytics View
- Teacher information and total activity count
- Breakdown by activity type
- Subjects taught and classes
- Detailed weekly patterns
- Multiple chart visualizations

## 💡 Key Features Explained

### Activity Aggregation
- Activities are grouped by week for trend analysis
- Breakdown by activity type (lesson, quiz, assessment)
- Per-teacher and overall statistics

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Card-based layout for better organization

### Data Visualization
- Line charts for trend analysis
- Bar charts for comparisons
- Doughnut charts for distribution

## 🔄 Data Flow

1. Backend loads JSON data on startup
2. Frontend fetches dashboard data via API
3. Data processed and aggregated in backend
4. Charts rendered using Chart.js
5. User can click on teachers for detailed view
6. Individual teacher analytics fetched on demand

## 📈 How to Extend

### Add a Database
Replace the JSON file loading in `backend/server.js` with database queries (MongoDB, PostgreSQL, etc.)

### Add More Metrics
Extend the API endpoints to calculate additional metrics like:
- Student engagement rates
- Performance trends
- Comparative analysis between teachers

### Add Filters
Enhance the frontend to add more filtering options:
- Date range selection
- Multiple teacher comparison
- Subject-specific analytics

### Deployment
- **Backend**: Deploy to Heroku, AWS, or DigitalOcean
- **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages

## 🐛 Troubleshooting

### Backend not connecting
- Ensure backend is running on port 5000
- Check firewall settings
- Verify CORS is enabled

### Frontend not loading
- Clear browser cache
- Check if frontend is running on port 3000
- Verify proxy setting in frontend package.json

### Data not loading
- Ensure `teacher_activity_data.json` exists in `/data` directory
- Check file format and structure

