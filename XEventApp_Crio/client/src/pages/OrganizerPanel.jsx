import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateEventModal from "../components/CreateEventModal";
import EditEventModal from "../components/EditEventModal";
import EventCard from "../components/EventCard";
import { eventAPI } from "../services/api";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const OrganizerPanel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchOrganizerEvents();
  }, [filter]);

  const fetchOrganizerEvents = async () => {
    setLoading(true);
    try {
      const filters = filter ? { status: filter } : {};
      const data = await eventAPI.getOrganizerEvents(filters);
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load your events");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await eventAPI.deleteEvent(eventId);
      toast.success("Event deleted successfully");
      fetchOrganizerEvents();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete event";
      toast.error(message);
    }
  };

  const handleEventCreated = () => {
    setShowCreateModal(false);
    fetchOrganizerEvents();
  };

  const handleEventUpdated = () => {
    setEditingEvent(null);
    fetchOrganizerEvents();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Organizer Dashboard
            </h1>
            <p className="text-gray-600">Create and manage your events</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary flex items-center gap-2">
            <FaPlus />
            Create Event
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Total Events
            </h3>
            <p className="text-2xl font-bold text-primary-600">
              {events.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Upcoming</h3>
            <p className="text-2xl font-bold text-blue-600">
              {events.filter((e) => e.status === "Upcoming").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">Ongoing</h3>
            <p className="text-2xl font-bold text-green-600">
              {events.filter((e) => e.status === "Ongoing").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Completed
            </h3>
            <p className="text-2xl font-bold text-gray-600">
              {events.filter((e) => e.status === "Completed").length}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b overflow-x-auto">
            {["All", "Upcoming", "Ongoing", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status === "All" ? "" : status)}
                className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                  (status === "All" && !filter) || filter === status
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner w-12 h-12"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <p className="text-gray-500 text-lg mb-4">
              You haven't created any events yet
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary">
              Create Your First Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="relative">
                <EventCard event={event} />

                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setEditingEvent(event)}
                    className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-md transition-colors"
                    title="Edit Event">
                    <FaEdit className="text-primary-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-md transition-colors"
                    title="Delete Event">
                    <FaTrash className="text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <CreateEventModal
          onClose={() => setShowCreateModal(false)}
          onEventCreated={handleEventCreated}
        />
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onEventUpdated={handleEventUpdated}
        />
      )}
    </div>
  );
};

export default OrganizerPanel;
