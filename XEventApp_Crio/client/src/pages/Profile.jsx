import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [showOrganizerRequest, setShowOrganizerRequest] = useState(false);
  const [reason, setReason] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await userAPI.updateProfile(formData);
      updateUser({
        ...user,
        name: data.name,
        email: data.email,
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOrganizerRequest = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      toast.error('Please provide a reason');
      return;
    }

    setLoading(true);
    try {
      await userAPI.requestOrganizerRole(reason);
      toast.success('Organizer request submitted successfully!');
      setShowOrganizerRequest(false);
      setReason('');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to submit request';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Your Profile
          </h1>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Change Avatar
              </label>
              <input type="file" accept="image/*" className="input" />
              <p className="text-xs text-gray-500 mt-1">
                Upload a new profile picture (optional)
              </p>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>

          {/* User Role Info */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Account Information
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Current Role: </span>
                <span className="font-semibold text-gray-900">
                  {user?.role}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Member Since: </span>
                <span className="font-semibold text-gray-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Request Organizer Role Button */}
            {user?.role === 'Participant' && (
              <div className="mt-6">
                {!showOrganizerRequest ? (
                  <button
                    onClick={() => setShowOrganizerRequest(true)}
                    className="btn btn-outline w-full"
                  >
                    Request Organizer Role
                  </button>
                ) : (
                  <form onSubmit={handleOrganizerRequest} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Why do you want to become an organizer?
                      </label>
                      <textarea
                        className="input min-h-[100px]"
                        placeholder="Tell us about your experience and why you want to organize events..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary flex-1"
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : 'Submit Request'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowOrganizerRequest(false);
                          setReason('');
                        }}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
