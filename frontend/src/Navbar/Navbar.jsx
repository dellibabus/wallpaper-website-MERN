import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [toggle, setToggle] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-400 border-b-2 border-blue-400"
      : "hover:text-blue-400 hover:border-b-2 hover:border-blue-400";
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      console.error("onSearch function not passed!");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-lg z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3 w-[30%]">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold tracking-wide">Autumn</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center w-[40%]">
            <input
              type="text"
              className="w-full p-2 rounded-md text-black focus:ring focus:ring-blue-400"
              placeholder="Search wallpapers..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              onClick={handleSearch}
              className="ml-2 p-2 bg-blue-400 text-white flex items-center gap-2 rounded-md hover:bg-blue-500"
            > <FaSearch className=""/>
              Search
              
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-8 w-[30%] font-bold">
            <a href="/" className={`transition duration-200 ${isActive("/")}`}>
              Home
            </a>
            <a
              href="/create"
              className={`transition duration-200 ${isActive("/create")}`}
            >
              Upload Wallpaper
            </a>
            <a
              href="/admin/login"
              className={`transition duration-200 ${isActive("/admin/login")}`}
            >
              Admin Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setToggle(!toggle)}
              className="focus:outline-none text-blue-400"
            >
              {toggle ? <FaBars size={28} /> : <FaTimes size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden bg-gray-700 text-white transition-all duration-300 ease-in-out ${toggle ? "max-h-0 overflow-hidden" : "max-h-64"}`}
        >
          <ul className="flex flex-col space-y-4 py-4 px-6 text-lg">
            <li>
              <a
                href="/"
                className={`transition duration-200 ${isActive("/")}`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/create"
                className={`transition duration-200 ${isActive("/create")}`}
              >
                Upload Wallpaper
              </a>
            </li>
            <li>
              <a
                href="/admin/login"
                className={`transition duration-200 ${isActive("/admin/login")}`}
              >
                Admin Login
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      <div className="pt-12 px-4 md:px-8">
        {/* Add your page content here */}
      </div>
    </>
  );
};

export default Navbar;
