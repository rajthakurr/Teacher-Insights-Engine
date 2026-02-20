# API Reference Guide

## Base URL
```
http://localhost:5000
```

---

## Endpoints Overview

| Endpoint | Method | Parameters | Returns | Purpose |
|----------|--------|-----------|---------|---------|
| `/api/teachers` | GET | None | Array | Get all teachers |
| `/api/summary` | GET | None | Object | Overall statistics |
| `/api/weekly-trends` | GET | None | Array | Weekly aggregated data |
| `/api/teacher/:teacher_id` | GET | teacher_id | Object | Teacher details |
| `/api/activities` | GET | Query params | Array | Filtered activities |
| `/api/activities/by-type` | GET | None | Object | Activities grouped by type |
| `/api/dashboard` | GET | None | Object | Complete dashboard data |

---

## Detailed Endpoint Documentation

### 1. GET /api/teachers
Fetch all teachers with activity counts.

**Request:**
```bash
curl http://localhost:5000/api/teachers
```

**Response (200 OK):**
```json
[
  {
    "teacher_id": "T001",
    "teacher_name": "Mr. John Smith",
    "activity_count": 4
  },
  {
    "teacher_id": "T002",
    "teacher_name": "Ms. Sarah Johnson",
    "activity_count": 5
  }
]
```

**Use case:** Display list of all teachers on dashboard

---

### 2. GET /api/summary
Get overall activity summary and statistics.

**Request:**
```bash
curl http://localhost:5000/api/summary
```

**Response (200 OK):**
```json
{
  "total_activities": 24,
  "activity_breakdown": {
    "lesson": 12,
    "quiz": 6,
    "assessment": 6
  },
  "total_teachers": 5
}
```

**Use case:** Display summary cards with key metrics

---

### 3. GET /api/weekly-trends
Fetch activity trends aggregated by week.

**Request:**
```bash
curl http://localhost:5000/api/weekly-trends
```

**Response (200 OK):**
```json
[
  {
    "week": "2025-01-06",
    "total_activities": 5,
    "breakdown": {
      "lesson": 3,
      "quiz": 1,
      "assessment": 1
    }
  },
  {
    "week": "2025-01-13",
    "total_activities": 11,
    "breakdown": {
      "lesson": 6,
      "quiz": 3,
      "assessment": 2
    }
  }
]
```

**Fields:**
- `week` (string): Week starting date (Sunday) in YYYY-MM-DD format
- `total_activities` (number): Total activities in that week
- `breakdown` (object): Activity breakdown by type

**Use case:** Draw trend line chart showing activity over time

---

### 4. GET /api/teacher/:teacher_id
Get detailed analytics for a specific teacher.

**Request:**
```bash
curl http://localhost:5000/api/teacher/T001
```

**Parameters:**
- `teacher_id` (string): Teacher identifier (e.g., T001, T002)

**Response (200 OK):**
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
      },
      {
        "id": 2,
        "teacher_id": "T001",
        "teacher_name": "Mr. John Smith",
        "activity_type": "quiz",
        "subject": "Mathematics",
        "class": "10-A",
        "created_at": "2025-01-09T14:15:00Z"
      }
    ],
    "2025-01-13": [
      // ... more activities
    ]
  },
  "subjects": ["Mathematics"],
  "classes": ["10-A"]
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Teacher not found"
}
```

**Use case:** Display detailed teacher analytics when user clicks on a teacher

---

### 5. GET /api/activities
Fetch and filter activities.

**Request with filters:**
```bash
# Get activities for teacher T001
curl "http://localhost:5000/api/activities?teacher_id=T001"

# Get only lessons
curl "http://localhost:5000/api/activities?activity_type=lesson"

# Get Mathematics activities
curl "http://localhost:5000/api/activities?subject=Mathematics"

# Combine filters
curl "http://localhost:5000/api/activities?teacher_id=T001&activity_type=lesson"
```

**Query Parameters (all optional):**
- `teacher_id` (string): Filter by teacher ID
- `activity_type` (string): Filter by type (lesson, quiz, assessment)
- `subject` (string): Filter by subject

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "teacher_id": "T001",
    "teacher_name": "Mr. John Smith",
    "activity_type": "lesson",
    "subject": "Mathematics",
    "class": "10-A",
    "created_at": "2025-01-08T09:30:00Z"
  },
  {
    "id": 2,
    "teacher_id": "T001",
    "teacher_name": "Mr. John Smith",
    "activity_type": "quiz",
    "subject": "Mathematics",
    "class": "10-A",
    "created_at": "2025-01-09T14:15:00Z"
  }
]
```

**Use case:** Dynamic filtering and search functionality

---

### 6. GET /api/activities/by-type
Get activities grouped by type.

**Request:**
```bash
curl http://localhost:5000/api/activities/by-type
```

**Response (200 OK):**
```json
{
  "lesson": [
    {
      "id": 1,
      "teacher_id": "T001",
      "teacher_name": "Mr. John Smith",
      "activity_type": "lesson",
      "subject": "Mathematics",
      "class": "10-A",
      "created_at": "2025-01-08T09:30:00Z"
    },
    // ... more lessons
  ],
  "quiz": [
    {
      "id": 2,
      "teacher_id": "T001",
      "teacher_name": "Mr. John Smith",
      "activity_type": "quiz",
      "subject": "Mathematics",
      "class": "10-A",
      "created_at": "2025-01-09T14:15:00Z"
    },
    // ... more quizzes
  ],
  "assessment": [
    // ... assessments
  ]
}
```

**Use case:** Analysis by activity type, grouped reports

---

### 7. GET /api/dashboard
Get complete dashboard data (all-in-one endpoint).

**Request:**
```bash
curl http://localhost:5000/api/dashboard
```

**Response (200 OK):**
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
    },
    // ... more teachers
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
    },
    // ... more weeks
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

**Use case:** Load entire dashboard in one request

---

## Response Codes

| Code | Meaning | Examples |
|------|---------|----------|
| 200 | Success | Data found and returned |
| 404 | Not Found | Teacher ID doesn't exist |
| 400 | Bad Request | Invalid parameters |
| 500 | Server Error | Unexpected server error |

---

## Data Models

### Activity Object
```javascript
{
  id: number,              // Unique identifier
  teacher_id: string,      // E.g., "T001"
  teacher_name: string,    // Full name
  activity_type: string,   // "lesson" | "quiz" | "assessment"
  subject: string,         // E.g., "Mathematics"
  class: string,           // E.g., "10-A"
  created_at: string       // ISO 8601 timestamp
}
```

### Teacher Object (Simple)
```javascript
{
  teacher_id: string,      // E.g., "T001"
  teacher_name: string,    // Full name
  activity_count: number   // Total activities
}
```

### Teacher Object (Full)
```javascript
{
  teacher_id: string,
  teacher_name: string,
  total_activities: number,
  activity_breakdown: {
    lesson: number,
    quiz: number,
    assessment: number
  },
  weekly_breakdown: {
    [weekDate]: Array<Activity>
  },
  subjects: Array<string>,
  classes: Array<string>
}
```

### Summary Object
```javascript
{
  total_activities: number,
  total_teachers: number,
  activity_breakdown: {
    lesson: number,
    quiz: number,
    assessment: number
  }
}
```

---

## Usage Examples

### Example 1: Get Dashboard Data for Initial Load
```javascript
// Frontend code
async function loadDashboard() {
  const response = await axios.get('http://localhost:5000/api/dashboard');
  const { teachers, weekly_trends, summary } = response.data;
  
  // Display summary cards
  displaySummary(summary);
  
  // Display charts
  displayWeeklyTrends(weekly_trends);
  
  // Display teacher list
  displayTeachers(teachers);
}
```

### Example 2: Get Specific Teacher Details
```javascript
// Frontend code
async function viewTeacherDetails(teacherId) {
  try {
    const response = await axios.get(`http://localhost:5000/api/teacher/${teacherId}`);
    const teacherData = response.data;
    
    // Display teacher analytics
    displayTeacherAnalytics(teacherData);
  } catch (error) {
    console.error('Teacher not found:', error);
  }
}
```

### Example 3: Filter Activities
```javascript
// Frontend code
async function filterActivities(filters) {
  const params = new URLSearchParams();
  
  if (filters.teacherId) params.append('teacher_id', filters.teacherId);
  if (filters.type) params.append('activity_type', filters.type);
  if (filters.subject) params.append('subject', filters.subject);
  
  const response = await axios.get(
    `http://localhost:5000/api/activities?${params}`
  );
  
  return response.data;
}
```

---

## Testing with cURL

### Test all endpoints
```bash
# Summary
curl http://localhost:5000/api/summary | jq

# All teachers
curl http://localhost:5000/api/teachers | jq

# Weekly trends
curl http://localhost:5000/api/weekly-trends | jq

# Teacher T001
curl http://localhost:5000/api/teacher/T001 | jq

# Activities by type
curl http://localhost:5000/api/activities/by-type | jq

# Filter activities
curl "http://localhost:5000/api/activities?teacher_id=T001&activity_type=lesson" | jq

# Dashboard (comprehensive)
curl http://localhost:5000/api/dashboard | jq
```

---

## Performance Considerations

- All endpoints return data in-memory (JSON)
- No database queries currently
- For large datasets, consider:
  - Pagination on `/api/activities`
  - Caching strategies
  - Database integration
  - Compression with gzip

---

## Error Handling

Frontend should handle errors gracefully:

```javascript
try {
  const response = await axios.get(url);
  // Handle success
} catch (error) {
  if (error.response) {
    // Server responded with error code
    console.error('Error:', error.response.status);
  } else if (error.request) {
    // Request made but no response (backend not running)
    console.error('Backend not responding');
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
}
```

---

## Future Enhancements

- [ ] Pagination for large datasets
- [ ] Advanced filtering options
- [ ] Data validation
- [ ] Caching headers
- [ ] Rate limiting
- [ ] API versioning
- [ ] JWT authentication
- [ ] Database backend instead of JSON

---

**Version**: 1.0.0  
**Last Updated**: February 20, 2025
