import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import Loading from "../Loading/Loading"; 

function Admin() {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (token) {
      fetchWallpapers();
    } else {
      setError("You are not authorized to view this page.");
      navigate("/admin/login"); 
    }
  }, [token, navigate]);

  const fetchWallpapers = async () => {
    try {
      const response = await axios.get("http://localhost:7000/photo/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.wallpapers) {
        setWallpapers(response.data.wallpapers);
      } else {
        setError("No wallpapers found.");
      }
    } catch (err) {
      setError("Failed to fetch wallpapers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteWallpaper = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/admin/photo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWallpapers(); 
    } catch (err) {
      setError("Failed to delete wallpaper. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/admin/login"); 
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6 overflow-y-scroll">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300"
        >
          Logout
        </button>
      </header>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wallpapers.length > 0 ? (
              wallpapers.map((photodetial) => (
                <div
                  key={photodetial._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-50 cursor-pointer"
                >
                  <img
                    className="w-full h-64 object-cover transition duration-500 ease-in-out"
                    src={`http://localhost:7000/upload/${photodetial.filePath}`}
                    alt="Wallpaper"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{photodetial.photoName}</h3>
                    <p className="text-sm text-gray-600">Username: {photodetial.userName}</p>
                    <p className="text-sm text-gray-600">Email: {photodetial.email}</p>
                    <button
                      className="mt-4 w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteWallpaper(photodetial._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No wallpapers available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
