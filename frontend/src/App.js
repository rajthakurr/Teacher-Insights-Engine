import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import TeacherAnalytics from './components/TeacherAnalytics';
import './App.css';

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/dashboard');
      setDashboardData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Make sure the backend server is running on port 5000.');
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading Dashboard...</h2>
        <p>Please ensure the backend server is running on http://localhost:5000</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchDashboardData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Teacher Insights Dashboard</h1>
        <p>Monitor teacher activity and engagement data</p>
      </header>

      <main className="app-main">
        {selectedTeacher ? (
          <TeacherAnalytics
            teacherId={selectedTeacher}
            teacherName={dashboardData?.teachers.find((t) => t.teacher_id === selectedTeacher)?.teacher_name}
            onBack={() => setSelectedTeacher(null)}
          />
        ) : (
          <Dashboard data={dashboardData} onSelectTeacher={setSelectedTeacher} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Teacher Insights Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
