# Admin Question Management API Documentation

## Overview

This API provides complete CRUD operations for managing questions in the aptitude site. Admins can dynamically manage questions for any stream with easy, medium, and hard difficulty levels.

## Authentication

All admin endpoints require:
1. **JWT Token** in Authorization header: `Bearer <token>`
2. **Admin Role** - User must have `role: "admin"` in the database

## API Endpoints

### 1. Add New Question

**Endpoint:** `POST /api/admin/questions`

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "stream": "Python",
  "level": "easy",
  "type": "mcq",
  "question": "What is the output of print(2**3)?",
  "options": ["5", "6", "8", "9"],
  "correctAnswer": "8"
}
```

**Required Fields:**
- `stream` - The stream name (e.g., "Python", "MERN", "Java")
- `level` - Difficulty level: "easy", "medium", or "hard"
- `type` - Question type: "mcq", "coding", or "written"
- `question` - The question text

**Optional Fields:**
- `options` - Array of options (required for MCQ type)
- `correctAnswer` - The correct answer (required for MCQ type)

**Response (201 Created):**
```json
{
  "message": "Question added successfully",
  "question": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "stream": "Python",
    "level": "easy",
    "type": "mcq",
    "question": "What is the output of print(2**3)?",
    "options": ["5", "6", "8", "9"],
    "correctAnswer": "8",
    "__v": 0
  }
}
```

---

### 2. Get All Questions (With Filters)

**Endpoint:** `GET /api/admin/questions`

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Query Parameters (Optional):**
- `stream` - Filter by stream name
- `level` - Filter by difficulty level (easy/medium/hard)
- `type` - Filter by question type (mcq/coding/written)

**Examples:**
```bash
# Get all questions
GET /api/admin/questions

# Get all Python easy questions
GET /api/admin/questions?stream=Python&level=easy

# Get all MCQ type questions
GET /api/admin/questions?type=mcq

# Get MERN medium MCQ questions
GET /api/admin/questions?stream=MERN&level=medium&type=mcq
```

**Response (200 OK):**
```json
{
  "count": 5,
  "questions": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k",
      "stream": "Python",
      "level": "easy",
      "type": "mcq",
      "question": "What is the output of print(2**3)?",
      "options": ["5", "6", "8", "9"],
      "correctAnswer": "8"
    }
  ]
}
```

---

### 3. Get Question by ID

**Endpoint:** `GET /api/admin/questions/:id`

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Example:**
```bash
GET /api/admin/questions/65a1b2c3d4e5f6g7h8i9j0k
```

**Response (200 OK):**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k",
  "stream": "Python",
  "level": "easy",
  "type": "mcq",
  "question": "What is the output of print(2**3)?",
  "options": ["5", "6", "8", "9"],
  "correctAnswer": "8"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Question not found"
}
```

---

### 4. Update Question

**Endpoint:** `PUT /api/admin/questions/:id`

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json
```

**Request Body (Partial Update):**
```json
{
  "question": "Updated question text",
  "level": "medium"
}
```

**Example:**
```bash
PUT /api/admin/questions/65a1b2c3d4e5f6g7h8i9j0k
```

**Response (200 OK):**
```json
{
  "message": "Question updated successfully",
  "question": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "stream": "Python",
    "level": "medium",
    "type": "mcq",
    "question": "Updated question text",
    "options": ["5", "6", "8", "9"],
    "correctAnswer": "8"
  }
}
```

---

### 5. Delete Question

**Endpoint:** `DELETE /api/admin/questions/:id`

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Example:**
```bash
DELETE /api/admin/questions/65a1b2c3d4e5f6g7h8i9j0k
```

**Response (200 OK):**
```json
{
  "message": "Question deleted successfully",
  "question": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "stream": "Python",
    "level": "easy",
    "type": "mcq",
    "question": "What is the output of print(2**3)?"
  }
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "No authentication token provided"
}
```
or
```json
{
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin role required."
}
```

### 400 Bad Request
```json
{
  "error": "Missing required fields: stream, level, type, and question are required"
}
```
or
```json
{
  "error": "Invalid level. Must be one of: easy, medium, hard"
}
```

### 404 Not Found
```json
{
  "error": "Question not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Error message details"
}
```

---

## Frontend Access API

For frontend quiz functionality, questions can be fetched without admin authentication:

**Endpoint:** `GET /api/questions`

**Query Parameters:**
- `stream` (required) - Stream name
- `level` (required) - Difficulty level
- `course` (optional) - Course name

**Example:**
```bash
GET /api/questions?stream=Python&level=easy
```

---

## Migration Script

To migrate existing static questions to MongoDB:

```bash
cd Backened
node scripts/migrateQuestions.js
```

This will:
1. Connect to MongoDB
2. Clear existing questions (optional)
3. Migrate all questions from `data/questions.js` to the database
4. Display a summary of migrated questions

---

## Verification Steps

1. **Start the server:**
   ```bash
   cd Backened
   node server.js
   ```

2. **Get admin token via login:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"admin123"}'
   ```

3. **Test adding a question:**
   ```bash
   curl -X POST http://localhost:5000/api/admin/questions \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"stream":"Python","level":"easy","type":"mcq","question":"Test question","options":["A","B","C","D"],"correctAnswer":"A"}'
   ```

4. **Test fetching questions:**
   ```bash
   curl http://localhost:5000/api/questions?stream=Python&level=easy
   ```

---

## Data Model

### Question Schema
```javascript
{
  stream: String,      // e.g., "MERN", "Python", "Java"
  course: String,      // Optional, e.g., "JavaScript", "React"
  level: String,       // "easy", "medium", "hard"
  type: String,        // "mcq", "coding", "written"
  question: String,    // Question text
  options: [String],   // For MCQ type
  correctAnswer: String // For MCQ type
}
```

### Valid Values
- **Levels:** `easy`, `medium`, `hard`
- **Types:** `mcq` (with options), `coding`, `written` (without options)
- **Streams:** Any custom string (fully customizable)
