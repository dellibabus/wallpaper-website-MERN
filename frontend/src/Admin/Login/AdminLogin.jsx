import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ adminname: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitfunction = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:7000/admin/login",
        admin
      );

      if (data.status === "ok") {
        toast.success("Login successful");
        localStorage.setItem("token", data.token);
        navigate("/admin/adminpanel");
      } else {
        toast.error("Invalid credentials, please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">
          Admin Login
        </h2>
        <form onSubmit={submitfunction} className="space-y-6">
          {/* Admin Name Input */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              name="adminname"
              placeholder="Admin Name"
              value={admin.adminname}
              onChange={(e) =>
                setAdmin({ ...admin, adminname: e.target.value })
              }
              required
              className="w-full pl-12 pr-4 py-3 bg-white border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            />
          </div>

          {/* Password Input with Show/Hide Toggle */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              required
              className="w-full pl-12 pr-10 py-3 bg-white border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-semibold text-white rounded-lg shadow-md transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="mt-5"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
