import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/events");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const result = await signup(
      formData.name,
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate("/events");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full p-6 bg-[#1e1e1e] rounded-xl shadow-lg text-white">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
            Create your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-yellow-300 text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-yellow-300 text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-yellow-300 text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="relative w-full">
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="avatar"
                className="block w-full text-center p-3 border border-gray-600 rounded bg-[#29293f] text-white cursor-pointer hover:bg-yellow-400 hover:text-black transition">
                {formData.avatar ? formData.avatar.name : "Choose Avatar"}
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black p-3 rounded font-semibold hover:bg-yellow-300 transition"
              disabled={loading}>
              {loading ? "Registering..." : "Signup"}
            </button>
          </div>
        </form>
        <p className="text-center mt-5 text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
