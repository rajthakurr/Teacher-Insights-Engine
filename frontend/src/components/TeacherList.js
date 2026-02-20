import React from 'react';
import './TeacherList.css';

function TeacherList({ teachers, onSelectTeacher }) {
  const sortedTeachers = [...teachers].sort((a, b) => b.activity_count - a.activity_count);

  return (
    <div className="teacher-list">
      <h2>Teachers Overview</h2>
      <div className="teacher-items">
        {sortedTeachers.map((teacher) => (
          <div
            key={teacher.teacher_id}
            className="teacher-item"
            onClick={() => onSelectTeacher(teacher.teacher_id)}
          >
            <div className="teacher-info">
              <h3>{teacher.teacher_name}</h3>
              <p className="teacher-id">ID: {teacher.teacher_id}</p>
            </div>
            <div className="teacher-stats">
              <span className="activity-badge">{teacher.activity_count}</span>
              <span className="activity-label">Activities</span>
            </div>
            <div className="activity-breakdown">
              <span className="lesson-count">📝 {teacher.activity_breakdown?.lesson || 0}</span>
              <span className="quiz-count">✅ {teacher.activity_breakdown?.quiz || 0}</span>
              <span className="assessment-count">📊 {teacher.activity_breakdown?.assessment || 0}</span>
            </div>
            <button className="view-btn">View Details →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherList;
