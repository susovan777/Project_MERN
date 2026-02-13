# 🎉 XEvents - Event Management Platform

A full-stack event management application built with the MERN stack. Create, discover, and manage events with role-based access control.

## 🌟 Overview

XEvents is a comprehensive platform that allows users to:

- 🔍 Browse and search events
- 📝 Register for events
- 🎫 Create and manage events (Organizers)
- 👑 Approve organizer requests (Admins)
- 🌙 Enjoy dark mode support
- 📱 Use on any device (fully responsive)

---

## 🛠️ Tech Stack

### Backend

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (Image Upload)
- Nodemailer (Email Notifications)

### Frontend

- React 18
- Tailwind CSS v4
- React Router v6
- Axios
- React Context API
- React Hot Toast

---

## 📦 Prerequisites

- Node.js (v16+)
- pnpm (or npm)
- MongoDB Atlas account
- Cloudinary account
- Gmail account with App Password

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd xevents
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
pnpm install

# Create .env file with your credentials
# (See backend/README.md for details)

# Seed database
npm run seed

# Start server
npm start
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Start app
pnpm start
```

Frontend runs on `http://localhost:3000`

---

## 🎯 Test Credentials

After seeding the database:

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

---

## 👥 User Roles

### Participant (Default)

- Browse events
- Register/cancel registrations
- Request organizer role

### Organizer

- All Participant features
- Create/edit/delete events
- View event registrations

### Admin

- All Organizer features
- Approve/reject organizer requests
- Manage all events

---

## ✨ Key Features

### Authentication & Authorization

✅ JWT-based authentication
✅ Role-based access control
✅ Secure password hashing

### Event Management

✅ Create, read, update, delete events
✅ Image upload with Cloudinary
✅ Search, filter, and pagination
✅ Automatic status updates (cron job)

### Registration System

✅ Register for events
✅ Cancel registrations
✅ Email notifications
✅ Registration history

### User Experience

✅ Dark mode support
✅ Responsive design (mobile, tablet, desktop)
✅ Toast notifications
✅ Loading states

---

## 📁 Project Structure

```
xevents/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
└── README.md (this file)
```

---

## 📚 Documentation

- **Backend API**: See `backend/README.md` for complete API documentation
- **Frontend Guide**: See `frontend/README.md` for component and feature details
- **Postman Collection**: See `POSTMAN_TESTING_GUIDE.md` for API testing

---

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME=The Social Hub
```

---

## 🧪 Testing

### Backend

```bash
cd backend
npm run seed  # Populate database with test data
npm start     # Start server
```

### Frontend

```bash
cd frontend
pnpm start    # Start development server
```

### Test Flow

1. Visit `http://localhost:3000`
2. Signup as new user
3. Browse events
4. Register for an event
5. Login as admin to approve organizer requests
6. Create events as organizer

---

## 📱 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Events

- `GET /api/events` - Get all events (public)
- `POST /api/events` - Create event (organizer/admin)
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Registration

- `POST /api/registration/:eventId` - Register for event
- `DELETE /api/registration/:eventId` - Cancel registration
- `GET /api/registration/my-registrations` - Get user's registrations

### Admin

- `GET /api/admin/organizer-requests` - Get all organizer requests
- `PUT /api/admin/users/:userId/approve-organizer` - Approve organizer

_Full API documentation in `backend/README.md`_

---

## 🎨 Features Showcase

### Dark Mode 🌙

- System preference detection
- Manual toggle with persistent storage
- Smooth transitions across all components

### Responsive Design 📱

- Mobile-first approach
- Hamburger menu for mobile
- Optimized layouts for all screen sizes

### Real-time Updates ⚡

- Toast notifications for user actions
- Automatic event status updates
- Email notifications

---

## 🚨 Common Issues

**MongoDB Connection:**

- Ensure IP is whitelisted in MongoDB Atlas
- Verify connection string in `.env`

**Email Not Sending:**

- Use Gmail App Password (not regular password)
- Enable 2-Step Verification first

**CORS Errors:**

- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`

---

## 📞 Support

For detailed documentation:

- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- API Testing: `POSTMAN_TESTING_GUIDE.md`

---

## 🎉 Acknowledgments

Built with ❤️ using:

- MongoDB, Express.js, React, Node.js (MERN Stack)
- Tailwind CSS for styling
- Cloudinary for image management
- And many other amazing open-source libraries

---

**Happy Coding! 🚀**
