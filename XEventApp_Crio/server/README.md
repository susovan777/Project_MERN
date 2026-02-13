# 🎉 XEvents Backend API

A comprehensive event management REST API built with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Testing](#testing)
- [Project Structure](#project-structure)

---

## ✨ Features

### Authentication & Authorization

- ✅ JWT-based authentication
- ✅ Role-based access control (Admin, Organizer, Participant)
- ✅ Secure password hashing with bcrypt

### User Management

- ✅ User registration and login
- ✅ Profile management with avatar upload
- ✅ Organizer role request system

### Event Management

- ✅ Create, read, update, delete events
- ✅ Image upload with Cloudinary
- ✅ Search, filter, and pagination
- ✅ Automatic status updates via cron job

### Registration System

- ✅ Register for events
- ✅ Cancel registrations
- ✅ Email notifications (Nodemailer)

### Admin Features

- ✅ Manage organizer requests
- ✅ View event registrations

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **File Upload**: Cloudinary + Multer
- **Email**: Nodemailer
- **Task Scheduling**: node-cron
- **Package Manager**: pnpm

---

## 📦 Prerequisites

- Node.js (v16+)
- pnpm
- MongoDB Atlas account
- Cloudinary account
- Gmail account with App Password

---

## 🚀 Installation

```bash
# Install dependencies
pnpm install

# Create .env file (see below)

# Seed database
npm run seed

# Start server
npm start
```

---

## 🔧 Environment Variables

Create `.env` file:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=noreply@xevents.com
```

---

## ▶️ Running the Application

```bash
# Development
npm run dev

# Production
npm start

# Seed database
npm run seed
```

Server runs on: `http://localhost:5000`

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

Protected routes require Bearer token:

```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Auth Endpoints

### Signup

```http
POST /api/auth/signup
POST /api/auth/register

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user }
```

### Login

```http
POST /api/auth/login

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user }
```

---

## 👤 User Endpoints

### Update Profile

```http
PUT /api/users/profile
Headers: Authorization: Bearer <token>

Body:
{
  "name": "Updated Name"
}
```

### Request Organizer Role

```http
PUT /api/users/request-organizer
Headers: Authorization: Bearer <token>

Body:
{
  "reason": "Experience..."
}
```

---

## 🛡️ Admin Endpoints

### Get Organizer Requests

```http
GET /api/admin/organizer-requests?status=Pending
Headers: Authorization: Bearer <admin-token>
```

### Approve User as Organizer

```http
PUT /api/admin/users/:userId/approve-organizer
Headers: Authorization: Bearer <admin-token>
```

---

## 📅 Event Endpoints

### Get All Events (Public)

```http
GET /api/events?page=1&limit=10&category=Conference

Query Params:
- page, limit
- search, category, eventType, status
- location, startDate, endDate
- sortBy, order
```

### Get Event by ID (Public)

```http
GET /api/events/:eventId
```

### Create Event

```http
POST /api/events
Headers: Authorization: Bearer <organizer-token>

Body:
{
  "title": "React Workshop",
  "description": "Learn React",
  "startDate": "2026-06-15",
  "startTime": "10:00",
  "endDate": "2026-06-15",
  "endTime": "17:00",
  "location": "Online",
  "eventType": "Online",
  "category": "Workshop"
}
```

### Update Event

```http
PUT /api/events/:eventId
Headers: Authorization: Bearer <organizer-token>

Body: (same as create, all optional)
```

### Delete Event

```http
DELETE /api/events/:eventId
Headers: Authorization: Bearer <organizer-token>
```

---

## 🎟️ Registration Endpoints

### Register for Event

```http
POST /api/registration/:eventId
Headers: Authorization: Bearer <token>
```

### Cancel Registration

```http
DELETE /api/registration/:eventId
Headers: Authorization: Bearer <token>

Body (optional):
{
  "reason": "Schedule conflict"
}
```

### Get My Registrations

```http
GET /api/registration/my-registrations?status=Registered
Headers: Authorization: Bearer <token>
```

### Check Registration Status

```http
GET /api/registration/is-registered/:eventId
Headers: Authorization: Bearer <token>
```

---

## 🗄️ Database Models

### User

- name, email, password (hashed)
- role: Participant | Organizer | Admin
- avatar, registeredEvents

### Event

- title, description
- startDate, startTime, endDate, endTime
- location, eventType, category
- status: Upcoming | Ongoing | Completed
- organizer, participants, maxParticipants

### Registration

- user, event
- status: Registered | Cancelled | Attended
- registrationDate, cancelledAt

### OrganizerRequest

- user, reason
- status: Pending | Approved | Rejected
- reviewedBy, adminComments

---

## 🧪 Testing

### Test Credentials (after seeding)

**Admin:**

```
Email: crio.do.test@example.com
Password: 12345678
```

**Organizer:**

```
Email: john.organizer@example.com
Password: password123
```

**Participant:**

```
Email: alice@example.com
Password: password123
```

### Quick Test

```bash
# Health check
curl http://localhost:5000/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"crio.do.test@example.com","password":"12345678"}'

# Get events
curl http://localhost:5000/api/events
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── adminController.js
│   │   ├── eventController.js
│   │   └── registrationController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── roleAuth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   ├── Registration.js
│   │   └── OrganizerRequest.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   └── utils/
│       ├── generateToken.js
│       ├── sendEmail.js
│       ├── cloudinary.js
│       ├── eventStatusCron.js
│       └── seedData.js
├── .env
├── server.js
└── package.json
```

---

## 🚨 Common Issues

### MongoDB Connection Error

- Check MONGODB_URI
- Whitelist IP in Atlas
- Verify credentials

### Email Not Sending

- Use Gmail App Password
- Enable 2-Step Verification

### Cloudinary Upload Fails

- Verify credentials
- Check file size (<5MB)

---

## 🎉 Happy Coding!

Built with ❤️ using Node.js, Express, and MongoDB
