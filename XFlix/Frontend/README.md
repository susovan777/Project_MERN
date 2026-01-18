# 🎬 XFlix Frontend

Modern, responsive React application for the XFlix video streaming platform.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   
   Create a `.env` file in the Frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8082/api/v1
   VITE_APP_NAME=XFlix
   VITE_APP_VERSION=1.0.0
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Application will run on `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```
   
   Output will be in `dist/` folder

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```
Frontend/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── assets/              # Static assets (images, icons)
│   │
│   ├── components/          # Reusable components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.css
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Modal/
│   │   ├── ThemeToggle/
│   │   ├── Container/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── SearchBar/
│   │   ├── GenreFilter/
│   │   ├── VideoCard/
│   │   ├── VideoGrid/
│   │   ├── UploadVideoModal/
│   │   └── MobileMenu/
│   │
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   └── VideoDetail/
│   │       ├── VideoDetail.jsx
│   │       └── VideoDetail.module.css
│   │
│   ├── services/            # API service layer
│   │   ├── api.js           # Axios instance
│   │   └── videoService.js  # Video API calls
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useTheme.js
│   │   └── useDebounce.js
│   │
│   ├── context/             # React Context
│   │   └── ThemeContext.jsx
│   │
│   ├── utils/               # Utility functions
│   │   └── constants.js
│   │
│   ├── styles/              # Global styles
│   │   └── index.css
│   │
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point
│
├── .env                     # Environment variables
├── .env.example             # Environment template
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md                # This file
```

---

## 🎨 Features

### Core Features
- ✅ **Video Grid**: Responsive grid layout with thumbnails
- ✅ **Search**: Real-time search with 500ms debounce
- ✅ **Filters**: Genre and content rating filters
- ✅ **Sorting**: Sort by release date or view count
- ✅ **Upload**: Modal form with validation
- ✅ **Video Player**: Embedded YouTube iframe
- ✅ **Voting**: Like/dislike with toggle logic
- ✅ **View Tracking**: Auto-increment on page visit

### UI/UX Features
- ✅ **Dark/Light Mode**: Theme toggle with localStorage persistence
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Loading States**: Skeleton screens
- ✅ **Toast Notifications**: React Hot Toast
- ✅ **Mobile Menu**: Hamburger menu for mobile devices
- ✅ **Smooth Animations**: CSS transitions and animations
- ✅ **Error Handling**: User-friendly error messages

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Library | 18.x |
| Vite | Build Tool | 5.x |
| React Router | Routing | 6.x |
| Axios | HTTP Client | 1.x |
| Tailwind CSS | Styling | 3.x |
| CSS Modules | Scoped Styles | - |
| Lucide React | Icons | Latest |
| React Hot Toast | Notifications | 2.x |

---

## 🎨 Styling Approach

### Tailwind CSS + CSS Modules

**Tailwind CSS:**
- Utility classes for rapid development
- Responsive utilities
- Dark mode support

**CSS Modules:**
- Component-scoped styles
- No global namespace pollution
- Better maintainability

**Example:**
```jsx
// Component.jsx
import styles from './Component.module.css';

function Component() {
  return (
    <div className={`${styles.container} bg-white dark:bg-dark-bg`}>
      {/* Tailwind + CSS Modules */}
    </div>
  );
}
```

### Theme System

**Light Theme:**
```css
:root {
  --color-bg-primary: #ffffff;
  --color-text-primary: #000000;
  --color-primary: #e50914;
}
```

**Dark Theme:**
```css
.dark {
  --color-bg-primary: #141414;
  --color-text-primary: #ffffff;
  --color-primary: #e50914;
}
```

---

## 🔌 API Integration

### Axios Configuration

```javascript
// services/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
```

### Service Layer

```javascript
// services/videoService.js
export const getAllVideos = async (params) => {
  const response = await api.get('/videos', { params });
  return response.data.data;
};
```

---

## 🎣 Custom Hooks

### useDebounce
Delays value updates to reduce API calls:
```javascript
const debouncedQuery = useDebounce(searchQuery, 500);
```

### useTheme
Manages theme state globally:
```javascript
const { theme, toggleTheme, isDark } = useTheme();
```

---

## 📱 Responsive Breakpoints

```javascript
// tailwind.config.js
{
  screens: {
    sm: '640px',   // Mobile landscape
    md: '768px',   // Tablet portrait
    lg: '1024px',  // Tablet landscape
    xl: '1280px',  // Desktop
    '2xl': '1536px' // Large desktop
  }
}
```

### Grid Layout
- **Mobile** (<640px): 1 column
- **Tablet** (640-1024px): 2-3 columns
- **Desktop** (>1024px): 4 columns

---

## 🚀 Deployment

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-api-url.com/api/v1
   ```

### Netlify

1. **Build**
   ```bash
   npm run build
   ```

2. **Deploy `dist` folder**
   - Drag & drop to Netlify
   - Or use Netlify CLI

3. **Configure Redirects**
   
   Create `public/_redirects`:
   ```
   /* /index.html 200
   ```

### Environment Variables

For production deployment:
```env
VITE_API_BASE_URL=https://your-api-url.com/api/v1
VITE_APP_NAME=XFlix
VITE_APP_VERSION=1.0.0
```

---

## 🧪 Testing

### Manual Testing Checklist

**Home Page:**
- [ ] Videos load on mount
- [ ] Search filters videos
- [ ] Genre filter works
- [ ] Rating filter works
- [ ] Sort by works
- [ ] Click video → Navigate to detail

**Video Detail:**
- [ ] Video player loads
- [ ] View count increments once
- [ ] Upvote toggles correctly
- [ ] Downvote toggles correctly
- [ ] Back button works

**Upload:**
- [ ] Modal opens
- [ ] Form validation works
- [ ] Upload success → Video appears
- [ ] Toast notifications appear

**Theme:**
- [ ] Toggle switches theme
- [ ] Theme persists on refresh
- [ ] All components adapt to theme

**Mobile:**
- [ ] Responsive layout
- [ ] Hamburger menu works
- [ ] Search in header
- [ ] Touch interactions work

---

## 🐛 Common Issues

### Issue: API calls failing

**Check:**
1. Backend server is running
2. `.env` has correct `VITE_API_BASE_URL`
3. CORS is enabled on backend

### Issue: Build fails

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Dark mode not working

**Check:**
1. `tailwind.config.js` has `darkMode: 'class'`
2. ThemeProvider wraps App
3. CSS uses `:global(html.dark)` for modules

---

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🎯 Performance Optimization

- ✅ Lazy loading with React Router
- ✅ Image lazy loading
- ✅ Debounced search (500ms)
- ✅ Memoized components
- ✅ Code splitting
- ✅ Optimized bundle size

---

## 🔐 Security

- ✅ XSS protection with React
- ✅ HTTPS in production
- ✅ Environment variables for sensitive data
- ✅ Input validation
- ✅ CORS configuration

---

## 📊 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |

---

## 🤝 Contributing

See main [README.md](../README.md) for contribution guidelines.

---

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React + Vite**