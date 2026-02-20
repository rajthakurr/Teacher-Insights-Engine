const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Health check (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("Teacher Insights Backend is running ✅");
});

// Load dataset (Render-safe)
const dataPath = path.join(process.cwd(), "data", "teacher_activity_data.json");
let activityData = [];

try {
  activityData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  console.log(`Loaded ${activityData.length} activity records`);
} catch (error) {
  console.error("Error loading data:", error);
}

// Utilities
function groupByWeek(activities) {
  const weeks = {};
  activities.forEach((activity) => {
    const date = new Date(activity.created_at);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split("T")[0];

    if (!weeks[weekKey]) weeks[weekKey] = [];
    weeks[weekKey].push(activity);
  });
  return weeks;
}

function countByType(activities) {
  return activities.reduce(
    (acc, a) => {
      acc[a.activity_type]++;
      return acc;
    },
    { lesson: 0, quiz: 0, assessment: 0 }
  );
}

// ---------------- ROUTES ----------------

// Get all teachers
app.get("/api/teachers", (req, res) => {
  const map = {};

  activityData.forEach((a) => {
    if (!map[a.teacher_id]) {
      map[a.teacher_id] = {
        teacher_id: a.teacher_id,
        teacher_name: a.teacher_name,
        activity_count: 0,
      };
    }
    map[a.teacher_id].activity_count++;
  });

  res.json(Object.values(map));
});

// Summary
app.get("/api/summary", (req, res) => {
  res.json({
    total_activities: activityData.length,
    total_teachers: new Set(activityData.map(a => a.teacher_id)).size,
    activity_breakdown: countByType(activityData),
  });
});

// Weekly trends
app.get("/api/weekly-trends", (req, res) => {
  const weekly = groupByWeek(activityData);
  const result = Object.keys(weekly).sort().map(week => ({
    week,
    total_activities: weekly[week].length,
    breakdown: countByType(weekly[week])
  }));
  res.json(result);
});

// ✅ Teacher analytics (FIXED)
app.get("/api/teacher/:teacher_id", (req, res) => {
  const teacherId = req.params.teacher_id; // STRING

  const teacherActivities = activityData.filter(
    a => a.teacher_id === teacherId
  );

  if (!teacherActivities.length) {
    return res.status(404).json({ error: "Teacher not found" });
  }

  const teacher = teacherActivities[0];

  res.json({
    teacher_id: teacher.teacher_id,
    teacher_name: teacher.teacher_name,
    total_activities: teacherActivities.length,
    activity_breakdown: countByType(teacherActivities),
    weekly_breakdown: groupByWeek(teacherActivities),
    subjects: [...new Set(teacherActivities.map(a => a.subject))],
    classes: [...new Set(teacherActivities.map(a => a.class))]
  });
});

// Dashboard
app.get("/api/dashboard", (req, res) => {
  const map = {};

  activityData.forEach(a => {
    if (!map[a.teacher_id]) {
      map[a.teacher_id] = {
        teacher_id: a.teacher_id,
        teacher_name: a.teacher_name,
        activity_count: 0,
        activity_breakdown: { lesson: 0, quiz: 0, assessment: 0 }
      };
    }
    map[a.teacher_id].activity_count++;
    map[a.teacher_id].activity_breakdown[a.activity_type]++;
  });

  res.json({
    teachers: Object.values(map),
    summary: {
      total_activities: activityData.length,
      total_teachers: Object.keys(map).length,
      activity_breakdown: countByType(activityData),
    }
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
