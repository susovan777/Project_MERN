import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import { useAuth } from "../context/AuthContext";
import { registrationAPI } from "../services/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const data = await registrationAPI.getMyRegistrations("Registered");
      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to load your registrations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600">Manage your events and registrations</p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Role</h3>
            <p className="text-2xl font-bold text-primary-600">{user?.role}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Registered Events
            </h3>
            <p className="text-2xl font-bold text-primary-600">
              {registrations.length}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Status</h3>
            <p className="text-2xl font-bold text-green-600">Active</p>
          </div>
        </div>

        {/* Registered Events */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Registered Events
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner w-12 h-12"></div>
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl">
              <p className="text-gray-500 text-lg mb-4">
                You haven't registered for any events yet
              </p>
              <a href="/events" className="btn btn-primary">
                Explore Events
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registrations.map((registration) => (
                <EventCard key={registration._id} event={registration.event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
