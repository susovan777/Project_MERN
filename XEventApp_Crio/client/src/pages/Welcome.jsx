import { Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Welcome = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 bg-linear-to-br from-primary-50 to-secondary-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Theme Toggle - Floating */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="theme-toggle shadow-lg"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <FaSun className="text-lg" />
          ) : (
            <FaMoon className="text-lg" />
          )}
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
            Welcome to <span className="text-yellow-400">The Social Hub</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-colors">
            Discover, create, and participate in amazing events. Connect with
            people who share your interests and make unforgettable memories.
          </p>
          <Link
            to="/events"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300"
          >
            Explore Events
          </Link>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md text-center transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4 transition-colors">
              <FaCalendarAlt className="text-3xl text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors">
              Discover Events
            </h3>
            <p className="text-gray-600 dark:text-gray-400 transition-colors">
              Browse through a wide variety of events from conferences to
              workshops and meetups.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md text-center transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full mb-4 transition-colors">
              <FaUsers className="text-3xl text-secondary-600 dark:text-secondary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors">
              Connect with People
            </h3>
            <p className="text-gray-600 dark:text-gray-400 transition-colors">
              Meet like-minded individuals and build meaningful connections at
              events.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md text-center transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4 transition-colors">
              <FaMapMarkerAlt className="text-3xl text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors">
              Online & Offline
            </h3>
            <p className="text-gray-600 dark:text-gray-400 transition-colors">
              Join events both virtually and in-person, wherever you are.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
