import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { adminAPI } from "../services/api";
import toast from "react-hot-toast";
import { FaCheck, FaTimes, FaUser, FaEnvelope } from "react-icons/fa";

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Pending");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getOrganizerRequests(filter);
      setRequests(data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load organizer requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    if (
      !window.confirm(
        "Are you sure you want to approve this user as an organizer?"
      )
    ) {
      return;
    }

    setProcessingId(userId);
    try {
      await adminAPI.approveUserAsOrganizer(userId);
      toast.success("User approved as organizer!");
      fetchRequests();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to approve request";
      toast.error(message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (requestId) => {
    const reason = window.prompt("Enter rejection reason (optional):");
    if (reason === null) return; // User cancelled

    setProcessingId(requestId);
    try {
      await adminAPI.rejectOrganizerRequest(requestId, reason);
      toast.success("Request rejected");
      fetchRequests();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to reject request";
      toast.error(message);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">
            Manage organizer requests and platform activities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Total Requests
            </h3>
            <p className="text-2xl font-bold text-primary-600">
              {requests.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {requests.filter((r) => r.status === "Pending").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Approved</h3>
            <p className="text-2xl font-bold text-green-600">
              {requests.filter((r) => r.status === "Approved").length}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            {["Pending", "Approved", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  filter === status
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Organizer Requests
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="spinner w-10 h-10"></div>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No {filter.toLowerCase()} requests found
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request._id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* User Info */}
                        <div className="flex items-center gap-3 mb-3">
                          {request.user?.avatar ? (
                            <img
                              src={request.user.avatar}
                              alt={request.user.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                              <FaUser className="text-primary-600" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {request.user?.name || "Unknown User"}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <FaEnvelope className="text-xs" />
                              {request.user?.email || "No email"}
                            </div>
                          </div>
                        </div>

                        {/* Reason */}
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Reason:
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {request.reason}
                          </p>
                        </div>

                        {/* Status & Date */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>
                            Requested:{" "}
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                          <span
                            className={`badge badge-${request.status.toLowerCase()}`}>
                            {request.status}
                          </span>
                        </div>

                        {/* Admin Comments (if any) */}
                        {request.adminComments && (
                          <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">
                                Admin Comment:
                              </span>{" "}
                              {request.adminComments}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      {request.status === "Pending" && (
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleApprove(request.user._id)}
                            disabled={processingId === request.user._id}
                            className="btn btn-primary flex items-center gap-2">
                            <FaCheck />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request._id)}
                            disabled={processingId === request._id}
                            className="btn btn-danger flex items-center gap-2">
                            <FaTimes />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
