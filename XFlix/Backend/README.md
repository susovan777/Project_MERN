# 🎬 XFlix Backend API

RESTful API for the XFlix video streaming platform built with Node.js, Express, and MongoDB.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   
   Create a `.env` file in the Backend directory:
   ```env
   PORT=8082
   MONGODB_URI=mongodb://localhost:27017/xflix
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:8082`

4. **Start Production Server**
   ```bash
   npm start
   ```

---

## 📂 Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── config.js              # App configuration
│   │
│   ├── models/
│   │   ├── index.js               # Export all models
│   │   └── video.model.js         # Video schema
│   │
│   ├── controllers/
│   │   ├── index.js               # Export all controllers
│   │   └── video.controller.js    # Video route handlers
│   │
│   ├── services/
│   │   ├── index.js               # Export all services
│   │   └── video.service.js       # Video business logic
│   │
│   ├── routes/
│   │   └── v1/
│   │       ├── index.js           # Combine all v1 routes
│   │       └── video.route.js     # Video routes
│   │
│   ├── middlewares/
│   │   ├── error.js               # Error handler
│   │   └── validate.js            # Joi validation middleware
│   │
│   ├── validations/
│   │   ├── custom.validations.js  # Custom validators
│   │   └── video.validations.js   # Video validation schemas
│   │
│   ├── utils/
│   │   ├── ApiError.js            # Custom error class
│   │   └── catchAsync.js          # Async error wrapper
│   │
│   ├── app.js                     # Express app setup
│   └── server.js                  # Server entry point
│
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── .gitignore
├── package.json
└── README.md                      # This file
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:8082/api/v1
```

### Video Endpoints

#### 1. Get All Videos
```http
GET /videos
```

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `title` | string | Search by title (case-insensitive) | `?title=programming` |
| `genres` | string | Filter by genre (comma-separated) | `?genres=Education,Sports` |
| `contentRating` | string | Filter by rating (comma-separated) | `?contentRating=12+,16+` |
| `sortBy` | string | Sort by field (`releaseDate` or `viewCount`) | `?sortBy=viewCount` |

**Example Request:**
```bash
curl http://localhost:8082/api/v1/videos?genres=Education&sortBy=viewCount
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "676a1b2c3d4e5f6a7b8c9d0e",
      "videoLink": "youtube.com/embed/dQw4w9WgXcQ",
      "title": "Learn JavaScript in 10 Minutes",
      "genre": "Education",
      "contentRating": "12+",
      "releaseDate": "2024-01-15T00:00:00.000Z",
      "previewImage": "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      "viewCount": 1234567,
      "votes": {
        "upVotes": 850,
        "downVotes": 12
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-20T15:45:00.000Z"
    }
  ]
}
```

---

#### 2. Get Single Video
```http
GET /videos/:id
```

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | MongoDB ObjectId of the video |

**Example Request:**
```bash
curl http://localhost:8082/api/v1/videos/676a1b2c3d4e5f6a7b8c9d0e
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "676a1b2c3d4e5f6a7b8c9d0e",
    "videoLink": "youtube.com/embed/dQw4w9WgXcQ",
    "title": "Learn JavaScript in 10 Minutes",
    "genre": "Education",
    "contentRating": "12+",
    "releaseDate": "2024-01-15T00:00:00.000Z",
    "previewImage": "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    "viewCount": 1234567,
    "votes": {
      "upVotes": 850,
      "downVotes": 12
    }
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Video not found"
}
```

---

#### 3. Create Video
```http
POST /videos
```

**Request Body:**
```json
{
  "videoLink": "youtube.com/embed/dQw4w9WgXcQ",
  "title": "Amazing Programming Tutorial",
  "genre": "Education",
  "contentRating": "12+",
  "releaseDate": "2024-01-15",
  "previewImage": "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg"
}
```

**Field Validations:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `videoLink` | string | Yes | Must match: `youtube.com/embed/<video-id>` or `https://www.youtube.com/embed/<video-id>` |
| `title` | string | Yes | Min 3 characters |
| `genre` | string | Yes | One of: Education, Sports, Movies, Comedy, Lifestyle |
| `contentRating` | string | Yes | One of: Anyone, 7+, 12+, 16+, 18+ |
| `releaseDate` | string | Yes | Valid date string |
| `previewImage` | string | Yes | Valid URL |

**Success Response (201):**
```json
{
  "success": true,
  "message": "Video created successfully",
  "data": {
    "_id": "676a1b2c3d4e5f6a7b8c9d0e",
    "videoLink": "youtube.com/embed/dQw4w9WgXcQ",
    "title": "Amazing Programming Tutorial",
    "genre": "Education",
    "contentRating": "12+",
    "releaseDate": "2024-01-15T00:00:00.000Z",
    "previewImage": "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    "viewCount": 0,
    "votes": {
      "upVotes": 0,
      "downVotes": 0
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "\"videoLink\" must be in one of these formats: \"youtube.com/embed/<video-id>\" or \"https://www.youtube.com/embed/<video-id>\""
}
```

---

#### 4. Update Votes
```http
PATCH /videos/:id/votes
```

**Request Body:**
```json
{
  "vote": "upVote",
  "change": "increase"
}
```

**Field Options:**
| Field | Options |
|-------|---------|
| `vote` | `upVote`, `downVote` |
| `change` | `increase`, `decrease` |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Votes updated successfully",
  "data": {
    "_id": "676a1b2c3d4e5f6a7b8c9d0e",
    "votes": {
      "upVotes": 851,
      "downVotes": 12
    }
  }
}
```

---

#### 5. Increment View Count
```http
PATCH /videos/:id/views
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "View count updated successfully",
  "data": {
    "_id": "676a1b2c3d4e5f6a7b8c9d0e",
    "viewCount": 1234568
  }
}
```

---

## 🗄️ Database Schema

### Video Model

```javascript
{
  videoLink: String,        // Required, unique, YouTube embed URL
  title: String,            // Required, min 3 characters
  genre: String,            // Required, enum: Education, Sports, Movies, Comedy, Lifestyle
  contentRating: String,    // Required, enum: Anyone, 7+, 12+, 16+, 18+
  releaseDate: Date,        // Required
  previewImage: String,     // Required, valid URL
  viewCount: Number,        // Default: 0
  votes: {
    upVotes: Number,        // Default: 0
    downVotes: Number       // Default: 0
  },
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}
```

---

## 🛡️ Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Stack trace (only in development)"
}
```

### Common Error Codes
| Code | Meaning | Example |
|------|---------|---------|
| 400 | Bad Request | Invalid video link format |
| 404 | Not Found | Video with given ID not found |
| 500 | Server Error | Database connection failed |

---

## 🔒 CORS Configuration

CORS is enabled for:
```javascript
origin: process.env.FRONTEND_URL || 'http://localhost:5173'
credentials: true
```

To allow additional origins, update `app.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-domain.com'],
  credentials: true
}));
```

---

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8082` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/xflix` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

---

## 🧪 Testing API

### Using cURL

**Get all videos:**
```bash
curl http://localhost:8082/api/v1/videos
```

**Create a video:**
```bash
curl -X POST http://localhost:8082/api/v1/videos \
  -H "Content-Type: application/json" \
  -d '{
    "videoLink": "youtube.com/embed/test123",
    "title": "Test Video",
    "genre": "Education",
    "contentRating": "12+",
    "releaseDate": "2024-01-15",
    "previewImage": "https://example.com/image.jpg"
  }'
```

### Using Postman

1. Import the API collection (if available)
2. Set base URL: `http://localhost:8082/api/v1`
3. Test each endpoint

---

## 🚀 Deployment

### Environment Variables for Production
```env
PORT=8082
MONGODB_URI=db_connection_string
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

---

## 📊 Performance

- Request timeout: 10 seconds
- MongoDB connection pooling enabled
- Indexed fields: `videoLink`, `genre`, `contentRating`, `releaseDate`

---

## 🤝 Contributing

See main [README.md](../README.md) for contribution guidelines.

---

## 📧 Support

For issues or questions, please open an issue on GitHub.