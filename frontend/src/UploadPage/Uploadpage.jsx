import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaUser, FaEnvelope, FaImage } from "react-icons/fa";

const WallpaperUpload = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    photoName: "",
    image: null,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!file) {
      setMessage("Please select a file.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("userName", formData.userName);
    data.append("email", formData.email);
    data.append("photoName", formData.photoName);
    data.append("image", file);

    try {
      const response = await axios.post("http://localhost:7000/photo/create", data);
      setMessage(response.data.message);
      setFormData({ userName: "", email: "", photoName: "", image: null });
      setFile(null);
    } catch (error) {
      setMessage("Error uploading wallpaper");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4 sm:px-8">
      <div className="bg-gray-900 p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          Upload Wallpaper
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-200"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-200"
            />
          </div>
          <div className="relative">
            <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
            <input
              type="text"
              name="photoName"
              placeholder="Photo Name"
              value={formData.photoName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none text-gray-200"
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center w-full p-4 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors">
              <FaCloudUploadAlt className="text-yellow-400 text-3xl mb-2" />
              <span className="text-gray-200 text-sm">Click to upload a file</span>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                required
                className="hidden"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md transition duration-200 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
        {message && (
          <p className="text-center mt-4 text-sm text-gray-900 bg-yellow-100 p-2 rounded-lg">
            {message}
          </p>
        )}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-lg shadow-md transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default WallpaperUpload;
