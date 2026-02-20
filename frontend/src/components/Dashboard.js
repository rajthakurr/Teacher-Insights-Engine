import React from 'react';
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
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import Summary from './Summary';
import TeacherList from './TeacherList';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard({ data, onSelectTeacher }) {
  if (!data) return <div>Loading...</div>;

  // Prepare weekly trends data for charts
  const weeklyTrends = data.weekly_trends || [];
  const weeks = weeklyTrends.map((w) => w.week);
  const activityCounts = weeklyTrends.map((w) => w.total_activities);

  const lineChartData = {
    labels: weeks.length > 0 ? weeks : ['No Data'],
    datasets: [
      {
        label: 'Total Activities',
        data: activityCounts,
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  // Activity breakdown pie data
  const activityTypes = data.summary.activity_breakdown || {};
  const pieChartData = {
    labels: Object.keys(activityTypes),
    datasets: [
      {
        data: Object.values(activityTypes),
        backgroundColor: ['#667eea', '#764ba2', '#f093fb'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  // Bar chart for activity breakdown
  const barChartData = {
    labels: Object.keys(activityTypes),
    datasets: [
      {
        label: 'Count',
        data: Object.values(activityTypes),
        backgroundColor: ['#667eea', '#764ba2', '#f093fb'],
        borderRadius: 5,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Activities by Type',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Weekly Activity Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard">
      <Summary summary={data.summary} />

      <div className="dashboard-content">
        <div className="charts-container">
          <div className="chart-wrapper">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>

          <div className="chart-wrapper">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        <TeacherList teachers={data.teachers} onSelectTeacher={onSelectTeacher} />
      </div>
    </div>
  );
}

export default Dashboard;
