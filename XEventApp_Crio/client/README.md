# 🎨 XEvents Frontend

A modern, responsive event management web application built with React and Tailwind CSS.

## ✨ Features

### Core Features

- ✅ User authentication (Signup/Login/Logout)
- ✅ Browse and search events
- ✅ Register for events
- ✅ User dashboard
- ✅ Profile management
- ✅ Dark mode support
- ✅ Responsive design

### Role-Based Features

**Participant:** Browse events, register, view history, request organizer role
**Organizer:** Create/edit/delete events, view registrations
**Admin:** Approve organizer requests, manage all events

---

## 🛠️ Tech Stack

- React 18
- Tailwind CSS v4
- React Router v6
- Axios
- React Context API
- React Icons
- React Hot Toast
- Vite
- pnpm

---

## 🚀 Installation

```bash
# Install dependencies
pnpm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env
echo "REACT_APP_NAME=The Social Hub" >> .env

# Start development server
pnpm start
```

Opens at `http://localhost:3000`

---

## 📄 Pages

### Public

- **Welcome** (`/`) - Landing page with theme toggle
- **Events** (`/events`) - Browse events with search/filters
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - New user registration

### Protected (Login Required)

- **Dashboard** (`/dashboard`) - User overview and registrations
- **Profile** (`/profile`) - Edit profile, request organizer role
- **Organizer** (`/organizer`) - Create and manage events
- **Admin** (`/admin`) - Manage organizer requests

---

## 🌙 Dark Mode

### Features

- System preference detection
- Manual toggle (Moon/Sun icon)
- Persists in localStorage
- Smooth 0.3s transitions

### Toggle Locations

- **Welcome Page**: Top-right floating button
- **Other Pages**: Navbar (desktop: right side, mobile: next to menu)

### Color Scheme

**Light Mode:**

- Background: #f9fafb
- Cards: white
- Text: #111827
- Primary: #0284c7

**Dark Mode:**

- Background: #0f172a
- Cards: #1e293b
- Text: #f1f5f9
- Primary: #38bdf8

---

## 🧩 Key Components

### Navbar

- Dynamic navigation (role-based)
- Theme toggle
- Mobile hamburger menu

### EventCard

- Event image, title, description
- Date, time, location
- Status and type badges

### Modals

- CreateEventModal
- EditEventModal

### Context

- AuthContext - User authentication
- ThemeContext - Dark mode

---

## 📁 Project Structure

```
frontend/src/
├── components/
│   ├── Navbar.jsx
│   ├── EventCard.jsx
│   ├── CreateEventModal.jsx
│   ├── EditEventModal.jsx
│   ├── Loading.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Welcome.jsx
│   ├── Events.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   ├── AdminPanel.jsx
│   └── OrganizerPanel.jsx
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── services/
│   └── api.js
├── App.js
└── index.css
```

---

## 🔐 Authentication Flow

1. User enters credentials
2. JWT token received from backend
3. Stored in localStorage + context
4. Auto-included in API requests
5. Protected routes check auth status

---

## 📱 Responsive Design

### Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Features

- Hamburger menu
- Stacked cards
- Touch-friendly UI
- Full-width modals

---

## 🎨 Styling

### Tailwind Classes

```jsx
// Buttons
className = 'btn btn-primary';
className = 'btn btn-secondary';

// Inputs
className = 'input';

// Cards
className = 'card';
className = 'event-card';

// Dark mode
className = 'bg-white dark:bg-slate-800';
className = 'text-gray-900 dark:text-white';
```

---

## 🚨 Error Handling

- Toast notifications for user feedback
- Form validation (required fields, email format, password length)
- API error handling
- Custom 404 page

---

## 🧪 Testing Checklist

- [ ] Signup/Login/Logout
- [ ] Browse and search events
- [ ] Register/cancel registration
- [ ] Create/edit/delete event (organizer)
- [ ] Approve requests (admin)
- [ ] Dark mode toggle
- [ ] Mobile responsive
- [ ] Toast notifications

---

## 📝 Scripts

```bash
pnpm start      # Development server
pnpm build      # Production build
pnpm serve      # Serve production build
```

---

## 🎯 Quick Start

```bash
# 1. Start backend (separate terminal)
cd ../backend && npm start

# 2. Start frontend
pnpm start

# 3. Open http://localhost:3000
# 4. Signup and explore!
```

---

## 🎊 Happy Coding!

Built with ❤️ using React and Tailwind CSS
