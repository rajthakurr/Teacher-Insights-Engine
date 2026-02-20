import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './TeacherAnalytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function TeacherAnalytics({ teacherId, teacherName, onBack }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherAnalytics();
  }, [teacherId]);

  const fetchTeacherAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/teacher/${teacherId}`);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching teacher analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="teacher-analytics">
        <button className="back-btn" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <p>Loading teacher analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="teacher-analytics">
        <button className="back-btn" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <p>Error loading teacher analytics.</p>
      </div>
    );
  }

  // Prepare chart data
  const weeklyEntries = Object.entries(analytics.weekly_breakdown || {}).sort();
  const weeks = weeklyEntries.map((w) => w[0]);
  const weeklyActivityCounts = weeklyEntries.map((w) => w[1].length);

  const lineChartData = {
    labels: weeks.length > 0 ? weeks : ['No Data'],
    datasets: [
      {
        label: 'Weekly Activities',
        data: weeklyActivityCounts,
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const breakdownData = {
    labels: Object.keys(analytics.activity_breakdown),
    datasets: [
      {
        data: Object.values(analytics.activity_breakdown),
        backgroundColor: ['#667eea', '#764ba2', '#f093fb'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const activityTypeData = {
    labels: Object.keys(analytics.activity_breakdown),
    datasets: [
      {
        label: 'Count',
        data: Object.values(analytics.activity_breakdown),
        backgroundColor: ['#667eea', '#764ba2', '#f093fb'],
        borderRadius: 5,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Weekly Activity Pattern',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Activity Type Breakdown',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Activity Distribution',
      },
    },
  };

  return (
    <div className="teacher-analytics">
      <button className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="teacher-header">
        <div className="teacher-header-content">
          <h1>{teacherName}</h1>
          <p>Teacher ID: {teacherId}</p>
        </div>
        <div className="teacher-stats-cards">
          <div className="stat-card">
            <h3>Total Activities</h3>
            <p>{analytics.total_activities}</p>
          </div>
          <div className="stat-card">
            <h3>Lessons</h3>
            <p>{analytics.activity_breakdown.lesson}</p>
          </div>
          <div className="stat-card">
            <h3>Quizzes</h3>
            <p>{analytics.activity_breakdown.quiz}</p>
          </div>
          <div className="stat-card">
            <h3>Assessments</h3>
            <p>{analytics.activity_breakdown.assessment}</p>
          </div>
        </div>
      </div>

      <div className="teacher-details">
        <div className="detail-section">
          <h3>Subjects Taught</h3>
          <div className="badge-list">
            {analytics.subjects.map((subject) => (
              <span key={subject} className="badge">
                {subject}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Classes</h3>
          <div className="badge-list">
            {analytics.classes.map((cls) => (
              <span key={cls} className="badge badge-secondary">
                {cls}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="charts-layout">
        <div className="chart-container">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

        <div className="chart-container">
          <Bar data={activityTypeData} options={barChartOptions} />
        </div>

        <div className="chart-container">
          <Doughnut data={breakdownData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}

export default TeacherAnalytics;
