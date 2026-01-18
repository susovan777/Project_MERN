# 🎬 XFlix - Video Streaming Platform

A modern, full-stack video streaming platform built with the MERN stack. Browse, upload, and interact with videos across multiple genres with a beautiful dark mode interface.

![XFlix Banner](https://via.placeholder.com/1200x400/141414/E50914?text=XFlix+-+Video+Streaming+Platform)

## 🚀 Live Demo

**🌐 Deployed Application:** [https://your-xflix-app.vercel.app](https://your-xflix-app.vercel.app)


---

## ✨ Features

### 🎥 Video Management
- **Browse Videos**: Grid view of all videos with thumbnails
- **Search**: Real-time search with debouncing (500ms)
- **Filter by Genre**: Education, Sports, Movies, Comedy, Lifestyle
- **Filter by Rating**: Anyone, 7+, 12+, 16+, 18+
- **Sort Options**: By release date or view count
- **Upload Videos**: Add new videos via modal form with validation

### 📱 Video Player
- **Embedded YouTube Player**: Full-screen capable iframe
- **Video Details**: Title, views, release date, genre, rating
- **View Tracking**: Auto-increment view count on page visit
- **Vote System**: Like/dislike with toggle functionality
- **Responsive Design**: Works seamlessly on all devices

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes with persistence
- **Responsive Layout**: Mobile-first design
- **Loading States**: Skeleton screens and spinners
- **Toast Notifications**: Real-time feedback for actions
- **Mobile Menu**: Hamburger menu for small screens

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS
- **CSS Modules** - Scoped component styling
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Joi** - Schema validation
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

---

## 📂 Project Structure

```
XFlix/
├── Backend/                 # Express.js API server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middlewares/    # Custom middleware
│   │   ├── validations/    # Joi validation schemas
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Entry point
│   ├── .env               # Environment variables
│   └── package.json
│
├── Frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React Context
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Root component
│   ├── .env              # Environment variables
│   └── package.json
│
└── README.md             # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/xflix.git
   cd xflix
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   
   # Create .env file
   cp .env.example .env
   
   # Edit .env with your MongoDB URI
   # Then start the server
   npm run dev
   ```
   Backend will run on `http://localhost:8082`

3. **Setup Frontend**
   ```bash
   cd Frontend
   npm install
   
   # Create .env file
   cp .env.example .env
   
   # Start development server
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 🌐 API Documentation

### Base URL
```
Development: http://localhost:8082/api/v1
Production: https://project-mern-z4by.onrender.com/api/v1
```

### Endpoints

#### Videos
```
GET    /videos              # Get all videos (with filters)
GET    /videos/:id          # Get single video
POST   /videos              # Create new video
PATCH  /videos/:id/votes    # Update votes
PATCH  /videos/:id/views    # Increment view count
```

For detailed API documentation, see [Backend README](./Backend/README.md)

---

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x450/141414/FFFFFF?text=Home+Page)

### Video Detail
![Video Detail](https://via.placeholder.com/800x450/141414/FFFFFF?text=Video+Detail+Page)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x450/141414/E50914?text=Dark+Mode)

### Mobile View
![Mobile View](https://via.placeholder.com/400x700/141414/FFFFFF?text=Mobile+View)

---

## 🧪 Testing

### Backend Tests
```bash
cd Backend
npm test
```

### Frontend Tests
```bash
cd Frontend
npm test
```

---

## 📦 Deployment

### Frontend (Vercel/Netlify)

**Vercel:**
```bash
cd Frontend
vercel --prod
```

**Netlify:**
```bash
cd Frontend
npm run build
# Deploy the 'dist' folder
```

### Backend (Render/Railway/Heroku)

**Environment Variables Required:**
```
PORT=8082
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@susovan777](https://github.com/susovan777)
- LinkedIn: [Susovan Sahoo](linkedin.com/in/susovan-sahoo777)
- Portfolio: [ ]()

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 📧 Contact

For any questions or suggestions, please reach out:
- Email: susovan.sahoo777@gmail.com


---

**⭐ If you like this project, please give it a star on GitHub!**