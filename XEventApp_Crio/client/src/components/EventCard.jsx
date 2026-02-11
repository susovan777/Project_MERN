import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUser } from "react-icons/fa";

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="event-card">
      {/* Event Image */}
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={event.image || "https://picsum.photos/400/300"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Content */}
      <div className="p-5">
        {/* Badges */}
        <div className="flex gap-2 mb-3">
          <span className={`badge badge-${event.status.toLowerCase()}`}>
            {event.status}
          </span>
          <span className={`badge badge-${event.eventType.toLowerCase()}`}>
            {event.eventType}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary-600" />
            <span>{formatDate(event.startDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaClock className="text-primary-600" />
            <span>{event.startTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary-600" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          {event.organizer && (
            <div className="flex items-center gap-2">
              <FaUser className="text-primary-600" />
              <span className="line-clamp-1">
                {event.organizer.name || "Unknown Organizer"}
              </span>
            </div>
          )}
        </div>

        {/* Category Badge */}
        <div className="mt-4">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
            {event.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
