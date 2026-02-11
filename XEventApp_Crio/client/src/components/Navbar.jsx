import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/events");
  };

  return (
    <nav className="max-w-7xl mx-auto px-4 py-4 bg-[#1e1e1e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/events" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">
              The Social Hub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {!isAuthenticated() ? (
              // Public Navigation
              <>
                <Link to="/login" className="hover:text-yellow-400 transition">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-yellow-400 transition">
                  Signup
                </Link>
              </>
            ) : (
              // Authenticated Navigation
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-yellow-400 transition">
                  Dashboard
                </Link>

                {/* Admin Link - Only for Admin */}
                {user?.role === "Admin" && (
                  <Link
                    to="/admin"
                    className="hover:text-yellow-400 transition">
                    Admin
                  </Link>
                )}

                {/* Organizer Link - For Admin & Organizer */}
                {(user?.role === "Admin" || user?.role === "Organizer") && (
                  <Link
                    to="/organizer"
                    className="hover:text-yellow-400 transition">
                    Organizer
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="hover:text-yellow-400 transition flex items-center gap-1">
                  <FaUserCircle className="text-xl" />
                  Profile
                </Link>

                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
