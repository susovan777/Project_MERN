import { useState } from 'react';
import Home from './pages/Home/Home.jsx';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import VideoDetail from './pages/Video/VideoDetail.jsx';
import { uploadVideoWithToast } from './services/videoService.js';
import UploadVideoModal from './components/VideoModal/UploadModal.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ZapOff } from 'lucide-react';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Handle video upload submission
  const handleUploadSubmit = async (formData) => {
    try {
      await uploadVideoWithToast(formData, toast);

      // Refresh video list after successful upload
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      // Error already handled by uploadVideoWithToast
      throw error;
    }
  };

  const toastOptions = {
    duration: 3000,
    style: {
      background: 'var(--color-bg-secondary)',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border)',
    },
    success: {
      iconTheme: {
        primary: '#10b981',
        secondary: '#fff',
      },
    },
    error: {
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    },
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Toast Notifications */}
        <Toaster position="top-right" toastOptions={toastOptions} />

        {/* Header */}
        <Header
          searchQuery={searchQuery}
          handleSearchQuery={(e) => setSearchQuery(e.target.value)}
          onUploadClick={() => setIsUploadModalOpen(true)}
        />

        {/* Main Content */}
        <main className="flex-1 py-8">
          <Routes>
            {/* Home Page - Pass search state as prop */}
            <Route
              path="/"
              element={<Home key={refreshKey} searchQuery={searchQuery} />}
            />

            {/* Video Detail Page */}
            <Route path="/videos/:id" element={<VideoDetail />} />

            {/* 404 Not Found */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                  <span>
                    <ZapOff color="#99a1af" size={60} />
                  </span>
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Page not found
                  </p>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Upload Video Modal */}
        <UploadVideoModal
          isOpen={isUploadModalOpen}
          onSubmit={handleUploadSubmit}
          onClose={() => setIsUploadModalOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
