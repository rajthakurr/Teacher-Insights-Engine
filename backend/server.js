const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load dataset
const dataPath = path.join(process.cwd(), 'data', 'teacher_activity_data.json');
let activityData = [];

try {
  const rawData = fs.readFileSync(dataPath);
  activityData = JSON.parse(rawData);
} catch (error) {
  console.error('Error loading data:', error);
  activityData = [];
}

// Utility function to group activities by week
function groupByWeek(activities) {
  const weeks = {};
  activities.forEach((activity) => {
    const date = new Date(activity.created_at);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Get Sunday of the week
    const weekKey = weekStart.toISOString().split('T')[0]; // YYYY-MM-DD

    if (!weeks[weekKey]) {
      weeks[weekKey] = [];
    }
    weeks[weekKey].push(activity);
  });
  return weeks;
}

// Utility function to count activities by type
function countByType(activities) {
  const counts = { lesson: 0, quiz: 0, assessment: 0 };
  activities.forEach((activity) => {
    if (activity.activity_type in counts) {
      counts[activity.activity_type]++;
    }
  });
  return counts;
}

// API Routes

// 1. Get all teachers
app.get('/api/teachers', (req, res) => {
  const teachers = [];
  const teacherMap = {};

  activityData.forEach((activity) => {
    if (!teacherMap[activity.teacher_id]) {
      teacherMap[activity.teacher_id] = {
        teacher_id: activity.teacher_id,
        teacher_name: activity.teacher_name,
        activity_count: 0,
      };
    }
    teacherMap[activity.teacher_id].activity_count++;
  });

  Object.values(teacherMap).forEach((teacher) => {
    teachers.push(teacher);
  });

  res.json(teachers);
});

// 2. Get overall activity summary
app.get('/api/summary', (req, res) => {
  const summary = {
    total_activities: activityData.length,
    activity_breakdown: countByType(activityData),
    total_teachers: new Set(activityData.map((a) => a.teacher_id)).size,
  };
  res.json(summary);
});

// 3. Get weekly activity trends
app.get('/api/weekly-trends', (req, res) => {
  const weeklyData = groupByWeek(activityData);
  const trends = [];

  Object.keys(weeklyData)
    .sort()
    .forEach((week) => {
      const activities = weeklyData[week];
      trends.push({
        week: week,
        total_activities: activities.length,
        breakdown: countByType(activities),
      });
    });

  res.json(trends);
});

// 4. Get teacher-specific analytics
app.get('/api/teachers/:id', (req, res) => {
  const teacherId = Number(req.params.id);

  const teacherActivities = activityData.filter(
    (a) => Number(a.teacher_id) === teacherId
  );

  if (teacherActivities.length === 0) {
    return res.status(404).json({ error: 'Teacher not found' });
  }

  const teacher = teacherActivities[0];

  const analytics = {
    teacher_id: teacher.teacher_id,
    teacher_name: teacher.teacher_name,
    total_activities: teacherActivities.length,
    activity_breakdown: countByType(teacherActivities),
    weekly_breakdown: groupByWeek(teacherActivities),
    subjects: [...new Set(teacherActivities.map((a) => a.subject))],
    classes: [...new Set(teacherActivities.map((a) => a.class))],
  };

  res.json(analytics);
});

// 5. Get activity by type and teacher
app.get('/api/activities/by-type', (req, res) => {
  const typeBreakdown = {};

  activityData.forEach((activity) => {
    const type = activity.activity_type;
    if (!typeBreakdown[type]) {
      typeBreakdown[type] = [];
    }
    typeBreakdown[type].push(activity);
  });

  res.json(typeBreakdown);
});

// 6. Get filtered activities
app.get('/api/activities', (req, res) => {
  let filtered = activityData;
  const { teacher_id, activity_type, subject } = req.query;

  if (teacher_id) {
    filtered = filtered.filter((a) => a.teacher_id === teacher_id);
  }
  if (activity_type) {
    filtered = filtered.filter((a) => a.activity_type === activity_type);
  }
  if (subject) {
    filtered = filtered.filter((a) => a.subject === subject);
  }

  res.json(filtered);
});

// 7. Get dashboard data (combined overview)
app.get('/api/dashboard', (req, res) => {
  const teachers = [];
  const teacherMap = {};

  activityData.forEach((activity) => {
    if (!teacherMap[activity.teacher_id]) {
      teacherMap[activity.teacher_id] = {
        teacher_id: activity.teacher_id,
        teacher_name: activity.teacher_name,
        activity_count: 0,
        activity_breakdown: { lesson: 0, quiz: 0, assessment: 0 },
      };
    }
    teacherMap[activity.teacher_id].activity_count++;
    if (activity.activity_type in teacherMap[activity.teacher_id].activity_breakdown) {
      teacherMap[activity.teacher_id].activity_breakdown[activity.activity_type]++;
    }
  });

  Object.values(teacherMap).forEach((teacher) => {
    teachers.push(teacher);
  });

  const weeklyData = groupByWeek(activityData);
  const weeklyTrends = [];

  Object.keys(weeklyData)
    .sort()
    .forEach((week) => {
      const activities = weeklyData[week];
      weeklyTrends.push({
        week: week,
        total_activities: activities.length,
        breakdown: countByType(activities),
      });
    });

  res.json({
    teachers,
    weekly_trends: weeklyTrends,
    summary: {
      total_activities: activityData.length,
      total_teachers: teachers.length,
      activity_breakdown: countByType(activityData),
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Teacher Insights Backend running on http://localhost:${PORT}`);
  console.log(`Loaded ${activityData.length} activity records`);
});

module.exports = app;
