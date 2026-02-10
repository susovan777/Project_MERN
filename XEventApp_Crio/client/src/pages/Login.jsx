import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
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
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/events");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#2a2a2a] flex items-center justify-center px-4">
      <div className="max-w-md w-full p-6 bg-[#1e1e1e] rounded-xl shadow-lg text-white">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
            Login
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
              autoComplete="current-password"
              required
              className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-yellow-300 text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-black rounded font-semibold hover:bg-yellow-300 transition disabled:opacity-60"
              disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="underline text-yellow-400 hover:text-yellow-500 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
