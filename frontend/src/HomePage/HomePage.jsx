import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCloudDownloadAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Loading from "../Loading/Loading";
import Navbar from "../Navbar/Navbar";

const HomePage = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadModal, setDownloadModal] = useState({
    visible: false,
    fileName: "",
  });
  const limit = 30;

  const fetchWallpapers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:7000/photo/getAll?page=${page}&limit=${limit}`
      );
      const { wallpapers: newWallpapers, pagination } = response.data;

      setWallpapers((prevWallpapers) => [...prevWallpapers, ...newWallpapers]);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallpapers(currentPage);
  }, [currentPage]);

  const toDataURL = (url) => {
    return fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  };

  const handleDownload = async (filePath, fileName) => {
    setDownloadModal({ visible: true, fileName }); // Show download modal
    try {
      const downloadUrl = `http://localhost:7000/upload/${filePath}`;
      const a = document.createElement("a");
      a.href = await toDataURL(downloadUrl);
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error during download:", error);
    } finally {
      setDownloadModal({ visible: false, fileName: "" }); // Hide download modal
    }
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigateSlide = (direction) => {
    if (direction === "prev") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? wallpapers.length - 1 : prevIndex - 1
      );
    } else if (direction === "next") {
      setCurrentIndex((prevIndex) =>
        prevIndex === wallpapers.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Update search term and filter wallpapers based on search
  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
    console.log("Searching for:", searchQuery);
  };

  
  const filteredWallpapers = wallpapers.filter((wallpaper) =>
    wallpaper.photoName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 bg-gray-50 mt-24">
      {loading && currentPage === 1 ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <>
          <Navbar onSearch={handleSearch} />
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWallpapers.length > 0 ? (
              filteredWallpapers.map((wallpaper, index) => (
                <div
                  key={wallpaper._id}
                  className="relative group shadow-lg rounded-lg overflow-hidden bg-white transition-all duration-300 ease-in-out transform hover:shadow-xl cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={`http://localhost:7000/upload/${wallpaper.filePath}`}
                    alt={wallpaper.photoName}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bottom-0 bg-black bg-opacity-60 text-white flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <h2 className="font-bold text-lg">
                        {wallpaper.photoName}
                      </h2>
                      <p className="text-sm mt-1">{wallpaper.email}</p>
                      <p className="text-sm mt-1">{wallpaper.userName}</p>
                    </div>
                    <button
                      className="px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(wallpaper.filePath, wallpaper.photoName);
                      }}
                    >
                      <FaCloudDownloadAlt className="text-xl" />
                      Download
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg">
                No wallpapers available.
              </p>
            )}
          </div>

          {currentPage < totalPages && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
              >
                View More
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal with Image Slider */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 px-4 sm:px-6">
          <div className="relative bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-sm sm:max-w-md md:max-w-lg w-full">
            <button
              className="absolute top-3 right-3 text-gray-700 text-xl hover:text-gray-900 focus:outline-none"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="relative flex items-center justify-center">
              {/* Desktop Navigation Buttons */}
              <button
                className="hidden sm:flex items-center justify-center absolute left-0 text-white hover:text-white focus:outline-none z-10"
                onClick={() => navigateSlide("prev")}
              >
                <FaChevronLeft className="text-3xl" />
              </button>
              <img
                src={`http://localhost:7000/upload/${wallpapers[currentIndex].filePath}`}
                alt={wallpapers[currentIndex].photoName}
                className="w-full h-auto sm:h-80 object-cover mx-4 rounded-md"
              />
              <button
                className="hidden sm:flex items-center justify-center absolute right-0 text-white hover:text-white focus:outline-none z-10"
                onClick={() => navigateSlide("next")}
              >
                <FaChevronRight className="text-3xl" />
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm sm:text-lg font-semibold">
                {wallpapers[currentIndex].photoName}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Uploaded by: {wallpapers[currentIndex].userName} |{" "}
                {wallpapers[currentIndex].email}
              </p>
              <button
                className="mt-4 px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-md hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
                onClick={() =>
                  handleDownload(
                    wallpapers[currentIndex].filePath,
                    wallpapers[currentIndex].photoName
                  )
                }
              >
                Download
              </button>
            </div>
            {/* Mobile Navigation Buttons */}
            <div className="flex items-center justify-between mt-4 sm:hidden">
              <button
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={() => navigateSlide("prev")}
              >
                <FaChevronLeft className="text-xl" />
              </button>
              <button
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={() => navigateSlide("next")}
              >
                <FaChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
