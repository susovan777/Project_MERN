import { Link } from "react-router-dom";
// import { FaCalendarAlt, FaUsers, FaMapMarkerAlt } from "react-icons/fa";

const Welcome = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Welcome to The <span className="text-yellow-400">Social Hub</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your one-stop hub for exciting events — meet, explore, and
            experience like never before!
          </p>
          <Link
            to="/events"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300">
            Explore Events
          </Link>
        </div>

        {/* Features */}
        {/* <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <FaCalendarAlt className="text-3xl text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover Events</h3>
            <p className="text-gray-600">
              Browse through a wide variety of events from conferences to
              workshops and meetups.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
              <FaUsers className="text-3xl text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect with People</h3>
            <p className="text-gray-600">
              Meet like-minded individuals and build meaningful connections at
              events.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <FaMapMarkerAlt className="text-3xl text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Online & Offline</h3>
            <p className="text-gray-600">
              Join events both virtually and in-person, wherever you are.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Welcome;
