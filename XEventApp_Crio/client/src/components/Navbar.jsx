import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaUserCircle, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/events');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-sticky">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-1">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/events"
            className="flex items-center"
            onClick={closeMobileMenu}
          >
            <span className="text-2xl font-bold text-primary-500">
              The Social Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              title={
                isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'
              }
            >
              {isDarkMode ? (
                <FaSun className="text-lg" />
              ) : (
                <FaMoon className="text-lg" />
              )}
            </button>

            {!isAuthenticated() ? (
              // Public Navigation
              <>
                <Link
                  to="/login"
                  className="hover:text-[#99cdf5] transition"
                >
                  Login
                </Link>
                <Link to="/signup" className="hover:text-[#99cdf5] transition">
                  Signup
                </Link>
              </>
            ) : (
              // Authenticated Navigation
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>

                {/* Admin Link - Only for Admin */}
                {user?.role === 'Admin' && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}

                {/* Organizer Link - For Admin & Organizer */}
                {(user?.role === 'Admin' || user?.role === 'Organizer') && (
                  <Link
                    to="/organizer"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Organizer
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center gap-1"
                >
                  <FaUserCircle className="text-xl" />
                  Profile
                </Link>

                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              title={
                isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'
              }
            >
              {isDarkMode ? (
                <FaSun className="text-lg" />
              ) : (
                <FaMoon className="text-lg" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 border-t dark:border-slate-700 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {!isAuthenticated() ? (
              // Public Mobile Navigation
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="block btn btn-primary text-center"
                >
                  Signup
                </Link>
              </>
            ) : (
              // Authenticated Mobile Navigation
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                >
                  Dashboard
                </Link>

                {/* Admin Link - Only for Admin */}
                {user?.role === 'Admin' && (
                  <Link
                    to="/admin"
                    onClick={closeMobileMenu}
                    className="block text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                  >
                    Admin
                  </Link>
                )}

                {/* Organizer Link - For Admin & Organizer */}
                {(user?.role === 'Admin' || user?.role === 'Organizer') && (
                  <Link
                    to="/organizer"
                    onClick={closeMobileMenu}
                    className="block text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                  >
                    Organizer
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-xl" />
                    Profile
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full btn btn-secondary text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
