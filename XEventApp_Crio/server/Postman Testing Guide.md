# XEvents API - Postman Testing Guide

## 🚀 Setup

### Base URL

```
http://localhost:5000
```

### Environment Variables (Create in Postman)

1. Click on "Environments" in Postman
2. Create new environment "XEvents Local"
3. Add these variables:
   - `base_url`: `http://localhost:5000`
   - `admin_token`: (will be set after login)
   - `organizer_token`: (will be set after login)
   - `participant_token`: (will be set after login)

---

## 📋 Test Credentials (After Running Seed)

### Admin

- **Email**: `crio.do.test@example.com`
- **Password**: `12345678`

### Organizers

- **Email**: `john.organizer@example.com` | **Password**: `password123`
- **Email**: `sarah.organizer@example.com` | **Password**: `password123`

### Participants

- **Email**: `alice@example.com` | **Password**: `password123`
- **Email**: `bob@example.com` | **Password**: `password123`
- **Email**: `charlie@example.com` | **Password**: `password123`
- **Email**: `diana@example.com` | **Password**: `password123`

---

## 🧪 Test Sequence

### 1. AUTHENTICATION APIs

#### 1.1 Signup (Create New User)

```
POST {{base_url}}/api/auth/signup
```

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "Participant",
    "avatar": "..."
  }
}
```

**Save Token:**
In Postman Tests tab, add:

```javascript
if (pm.response.code === 201) {
  pm.environment.set('participant_token', pm.response.json().token);
}
```

---

#### 1.2 Login (Admin)

```
POST {{base_url}}/api/auth/login
```

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "email": "crio.do.test@example.com",
  "password": "12345678"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Admin User",
    "email": "crio.do.test@example.com",
    "role": "Admin",
    "avatar": "..."
  }
}
```

**Save Token (Add to Tests tab):**

```javascript
if (pm.response.code === 200) {
  pm.environment.set('admin_token', pm.response.json().token);
}
```

---

#### 1.3 Login (Organizer)

```
POST {{base_url}}/api/auth/login
```

**Body:**

```json
{
  "email": "john.organizer@example.com",
  "password": "password123"
}
```

**Save Token:**

```javascript
if (pm.response.code === 200) {
  pm.environment.set('organizer_token', pm.response.json().token);
}
```

---

#### 1.4 Login (Participant)

```
POST {{base_url}}/api/auth/login
```

**Body:**

```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

**Save Token:**

```javascript
if (pm.response.code === 200) {
  pm.environment.set('participant_token', pm.response.json().token);
}
```

---

#### 1.5 Get Current User

```
GET {{base_url}}/api/auth/me
```

**Headers:**

```
Authorization: Bearer {{admin_token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Admin User",
    "email": "crio.do.test@example.com",
    "role": "Admin",
    ...
  }
}
```

---

### 2. USER APIs

#### 2.1 Get User Profile

```
GET {{base_url}}/api/users/profile
```

**Headers:**

```
Authorization: Bearer {{participant_token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Alice Brown",
    "email": "alice@example.com",
    "role": "Participant",
    "registeredEvents": [...]
  }
}
```

---

#### 2.2 Update User Profile

```
PUT {{base_url}}/api/users/profile
```

**Headers:**

```
Authorization: Bearer {{participant_token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Alice Updated Brown"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "...",
    "name": "Alice Updated Brown",
    ...
  }
}
```

---

#### 2.3 Update Profile with Avatar (Form-Data)

```
PUT {{base_url}}/api/users/profile
```

**Headers:**

```
Authorization: Bearer {{participant_token}}
```

**Body (form-data):**

- `name`: Alice Brown
- `avatar`: [Select an image file]

---

#### 2.4 Request Organizer Role

```
POST {{base_url}}/api/users/request-organizer
```

**Headers:**

```
Authorization: Bearer {{participant_token}}
Content-Type: application/json
```

**Body:**

```json
{
  "reason": "I have 3 years of experience organizing tech events and would love to host workshops on this platform."
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Organizer request submitted successfully",
  "request": {
    "_id": "...",
    "user": "...",
    "reason": "...",
    "status": "Pending"
  }
}
```

---

### 3. ADMIN APIs

#### 3.1 Get All Organizer Requests

```
GET {{base_url}}/api/admin/organizer-requests
```

**Headers:**

```
Authorization: Bearer {{admin_token}}
```

**Query Params (Optional):**

- `status`: Pending | Approved | Rejected

**Expected Response (200):**

```json
{
  "success": true,
  "count": 3,
  "requests": [
    {
      "_id": "...",
      "user": {
        "_id": "...",
        "name": "Diana Miller",
        "email": "diana@example.com"
      },
      "reason": "...",
      "status": "Pending",
      "createdAt": "..."
    }
  ]
}
```

---

#### 3.2 Approve Organizer Request

```
PUT {{base_url}}/api/admin/organizer-requests/:id/approve
```

**Headers:**

```
Authorization: Bearer {{admin_token}}
Content-Type: application/json
```

**Body (Optional):**

```json
{
  "adminComments": "Great experience. Approved!"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Organizer request approved successfully",
  "request": {...}
}
```

---

#### 3.3 Reject Organizer Request

```
PUT {{base_url}}/api/admin/organizer-requests/:id/reject
```

**Headers:**

```
Authorization: Bearer {{admin_token}}
Content-Type: application/json
```

**Body:**

```json
{
  "adminComments": "Please provide more details about your event organizing experience."
}
```

---

#### 3.4 Get Event Registrations (Admin/Organizer)

```
GET {{base_url}}/api/admin/events/:eventId/registrations
```

**Headers:**

```
Authorization: Bearer {{admin_token}}
# OR
Authorization: Bearer {{organizer_token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "count": 2,
  "registrations": [
    {
      "_id": "...",
      "user": {
        "name": "Alice Brown",
        "email": "alice@example.com"
      },
      "event": "...",
      "status": "Registered",
      "registrationDate": "..."
    }
  ]
}
```

---

### 4. EVENTS APIs

#### 4.1 Get All Events (Public)

```
GET {{base_url}}/api/events
```

**Query Params (All Optional):**

- `page`: 1
- `limit`: 10
- `search`: tech
- `category`: Conference | Workshop | Webinar | Meetup | Seminar | Training | Hackathon | Festival
- `eventType`: Online | Offline
- `status`: Upcoming | Ongoing | Completed
- `location`: New York
- `startDate`: 2026-02-01
- `endDate`: 2026-12-31
- `sortBy`: startDate | createdAt | title
- `order`: asc | desc

**Example:**

```
GET {{base_url}}/api/events?page=1&limit=5&category=Conference&status=Upcoming
```

**Expected Response (200):**

```json
{
  "success": true,
  "events": [...],
  "page": 1,
  "totalPages": 2,
  "totalEvents": 6,
  "limit": 5
}
```

---

#### 4.2 Get Event by ID (Public)

```
GET {{base_url}}/api/events/:eventId
```

**Expected Response (200):**

```json
{
  "success": true,
  "event": {
    "_id": "...",
    "title": "Tech Conference 2026",
    "description": "...",
    "startDate": "...",
    "organizer": {
      "name": "John Smith",
      "email": "..."
    },
    "participants": [...],
    "status": "Upcoming"
  }
}
```

---

#### 4.3 Create Event (Organizer/Admin)

```
POST {{base_url}}/api/events
```

**Headers:**

```
Authorization: Bearer {{organizer_token}}
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "title": "React Masterclass 2026",
  "description": "Deep dive into React 19 features, performance optimization, and best practices.",
  "startDate": "2026-06-15",
  "startTime": "10:00",
  "endDate": "2026-06-15",
  "endTime": "17:00",
  "location": "Online via Zoom",
  "eventType": "Online",
  "category": "Workshop",
  "maxParticipants": 100
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Event created successfully",
  "event": {...}
}
```

---

#### 4.4 Create Event with Image (Form-Data)

```
POST {{base_url}}/api/events
```

**Headers:**

```
Authorization: Bearer {{organizer_token}}
```

**Body (form-data):**

- `title`: Python for Data Science
- `description`: Learn Python programming for data analysis
- `startDate`: 2026-07-01
- `startTime`: 14:00
- `endDate`: 2026-07-01
- `endTime`: 18:00
- `location`: Boston
- `eventType`: Offline
- `category`: Training
- `maxParticipants`: 50
- `image`: [Select image file]

---

#### 4.5 Update Event (Organizer/Admin)

```
PUT {{base_url}}/api/events/:eventId
```

**Headers:**

```
Authorization: Bearer {{organizer_token}}
Content-Type: application/json
```

**Body:**

```json
{
  "title": "Updated Event Title",
  "maxParticipants": 150
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Event updated successfully",
  "event": {...}
}
```

---

#### 4.6 Delete Event (Organizer/Admin)

```
DELETE {{base_url}}/api/events/:eventId
```

**Headers:**

```
Authorization: Bearer {{organizer_token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

---

#### 4.7 Get Organizer's Events

```
GET {{base_url}}/api/events/organizer/get
```

**Headers:**

```
Authorization: Bearer {{organizer_token}}
```

**Query Params (Optional):**

- `page`: 1
- `limit`: 10
- `status`: Upcoming | Ongoing | Completed
- `category`: Conference | Workshop | etc.

**Expected Response (200):**

```json
{
  "success": true,
  "events": [...],
  "page": 1,
  "totalPages": 1,
  "totalEvents": 5,
  "limit": 10
}
```

---

### 5. REGISTRATION APIs

#### 5.1 Register for Event

```
POST {{base_url}}/api/registration/:eventId
```

**Headers:**

```
Authorization: Bearer {{participant_token}}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Successfully registered for the event",
  "registration": {
    "_id": "...",
    "user": "...",
    "event": "...",
    "status": "Registered",
    "registrationDate": "..."
  }
}
```

---

#### 5.2 Cancel Registration

```
DELETE {{base_url}}/api/registration/:eventId
```

**Headers:**

```
Authorization: Bearer {{participant_token}}
Content-Type: application/json
```

**Body (Optional):**

```json
{
  "reason": "Schedule conflict"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Registration cancelled successfully"
}
```

---

#### 5.3 Get My Registrations

```
GET {{base_url}}/api/registration/my-registrations
```

**Headers:**

```
Authorization: Bearer {{participant_token}}
```

**Query Params (Optional):**

- `status`: Registered | Cancelled | Attended

**Expected Response (200):**

```json
{
  "success": true,
  "count": 2,
  "registrations": [
    {
      "_id": "...",
      "event": {
        "title": "Tech Conference 2026",
        "startDate": "...",
        "organizer": {...}
      },
      "status": "Registered",
      "registrationDate": "..."
    }
  ]
}
```

---

#### 5.4 Check if Registered

```
GET {{base_url}}/api/registration/is-registered/:eventId
```

**Headers:**

```
Authorization: Bearer {{participant_token}}
```

**Expected Response (200):**

```json
{
  "success": true,
  "isRegistered": true,
  "registration": {...}
}
```

---

### 6. HEALTH CHECK

#### 6.1 Server Health

```
GET {{base_url}}/health
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-02-07T10:30:00.000Z"
}
```

---

## 🧪 Testing Scenarios

### Scenario 1: Complete User Journey

1. Signup as new participant
2. Login to get token
3. Browse events (get all events)
4. View event details
5. Register for an event
6. Check registration status
7. View my registrations
8. Cancel registration

### Scenario 2: Organizer Journey

1. Login as organizer
2. Create new event
3. View own events
4. Update event
5. View event registrations
6. Delete event

### Scenario 3: Admin Journey

1. Login as admin
2. View all organizer requests
3. Approve/Reject requests
4. View any event's registrations
5. Delete any event

### Scenario 4: Error Testing

1. Try to register without token (401)
2. Try to create event as participant (403)
3. Try to approve request as organizer (403)
4. Try to register for non-existent event (404)
5. Try to register twice for same event (400)
6. Try to create event with past date (400)

---

## 📊 Postman Collection Structure

Create folders in Postman:

```
XEvents API
├── 1. Authentication
│   ├── Signup
│   ├── Login (Admin)
│   ├── Login (Organizer)
│   ├── Login (Participant)
│   └── Get Me
├── 2. User Management
│   ├── Get Profile
│   ├── Update Profile
│   ├── Update Profile with Avatar
│   └── Request Organizer Role
├── 3. Admin
│   ├── Get Organizer Requests
│   ├── Approve Request
│   ├── Reject Request
│   └── Get Event Registrations
├── 4. Events
│   ├── Get All Events
│   ├── Get Event by ID
│   ├── Create Event
│   ├── Create Event with Image
│   ├── Update Event
│   ├── Delete Event
│   └── Get Organizer Events
├── 5. Registration
│   ├── Register for Event
│   ├── Cancel Registration
│   ├── Get My Registrations
│   └── Is Registered
└── 6. Health
    └── Health Check
```

---

## ✅ Success Checklist

- [ ] All authentication endpoints working
- [ ] User can signup and login
- [ ] Admin can approve/reject organizer requests
- [ ] Organizers can create/update/delete events
- [ ] Users can register for events
- [ ] Users can cancel registrations
- [ ] Pagination works on events list
- [ ] Search and filters work
- [ ] Image upload works (Cloudinary)
- [ ] Email notifications sent (check logs)
- [ ] Authorization working (403 for unauthorized)
- [ ] Validation errors returned properly
- [ ] No duplicate registrations allowed

---

## 🐛 Common Issues

1. **401 Unauthorized**: Token not set or expired
2. **403 Forbidden**: Wrong role trying to access endpoint
3. **404 Not Found**: Invalid ID or resource doesn't exist
4. **400 Bad Request**: Validation error, check request body
5. **500 Server Error**: Check server logs for details

---

**Happy Testing! 🚀**
