import { useState } from "react";
import { eventAPI } from "../services/api";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const EditEventModal = ({ event, onClose, onEventUpdated }) => {
  const [formData, setFormData] = useState({
    title: event.title || "",
    description: event.description || "",
    startDate: event.startDate ? event.startDate.split("T")[0] : "",
    startTime: event.startTime || "",
    endDate: event.endDate ? event.endDate.split("T")[0] : "",
    endTime: event.endTime || "",
    location: event.location || "",
    eventType: event.eventType || "Online",
    category: event.category || "Conference",
    maxParticipants: event.maxParticipants || "",
  });
  const [loading, setLoading] = useState(false);

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
      await eventAPI.updateEvent(event._id, formData);
      toast.success("Event updated successfully!");
      onEventUpdated();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update event";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Edit Event</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              className="input"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              className="input min-h-[100px]"
              placeholder="Describe your event"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                className="input"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time *
              </label>
              <input
                type="time"
                name="startTime"
                className="input"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                className="input"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time *
              </label>
              <input
                type="time"
                name="endTime"
                className="input"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              name="location"
              className="input"
              placeholder="Enter location or online platform"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Event Type & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type *
              </label>
              <select
                name="eventType"
                className="input"
                value={formData.eventType}
                onChange={handleChange}
                required>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                className="input"
                value={formData.category}
                onChange={handleChange}
                required>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Webinar">Webinar</option>
                <option value="Meetup">Meetup</option>
                <option value="Seminar">Seminar</option>
                <option value="Training">Training</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Festival">Festival</option>
                <option value="Test">Test</option>
              </select>
            </div>
          </div>

          {/* Max Participants */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Participants (Optional)
            </label>
            <input
              type="number"
              name="maxParticipants"
              className="input"
              placeholder="Leave empty for unlimited"
              value={formData.maxParticipants}
              onChange={handleChange}
              min="1"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={loading}>
              {loading ? "Updating..." : "Update Event"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
