import React from 'react';
import './Summary.css';

function Summary({ summary }) {
  return (
    <div className="summary">
      <div className="summary-card">
        <div className="summary-icon">📚</div>
        <div className="summary-content">
          <h3>Total Activities</h3>
          <p className="summary-value">{summary.total_activities}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon">👨‍🏫</div>
        <div className="summary-content">
          <h3>Total Teachers</h3>
          <p className="summary-value">{summary.total_teachers}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon">📝</div>
        <div className="summary-content">
          <h3>Lessons Created</h3>
          <p className="summary-value">{summary.activity_breakdown?.lesson || 0}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon">✅</div>
        <div className="summary-content">
          <h3>Quizzes Created</h3>
          <p className="summary-value">{summary.activity_breakdown?.quiz || 0}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-icon">📊</div>
        <div className="summary-content">
          <h3>Assessments Created</h3>
          <p className="summary-value">{summary.activity_breakdown?.assessment || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
