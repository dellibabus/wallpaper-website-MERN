import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = ({ onSearch }) => {
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Upload Wallpaper", path: "/create" },
  ];

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-400 border-b-2 border: py-2 border-blue-400"
      : "hover:text-blue-400 hover:border-b-2 hover:border-blue-400 hover:border: py-2";

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-2xl font-bold tracking-wide">Autumn</h1>
        </Link>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center w-[40%] relative">
          <input
            type="text"
            className="w-full p-2 rounded-md text-black focus:ring focus:ring-blue-400"
            placeholder="Search wallpapers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => onSearch && onSearch(searchTerm)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition duration-200 ${isActive(item.path)}`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/admin/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Admin Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setToggle(!toggle)}
          className="md:hidden focus:outline-none text-white"
          aria-label="Toggle Menu"
        >
          {toggle ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-lg transform ${toggle ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={() => setToggle(false)}
          className="absolute top-4 right-4 text-white"
          aria-label="Close Menu"
        >
          <FaTimes size={24} />
        </button>
        <ul className="flex flex-col mt-16 space-y-6 px-6 text-lg">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block py-2 transition duration-200 ${isActive(item.path)}`}
                onClick={() => setToggle(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/admin/login"
              className="block w-full bg-blue-500 text-white px-4 py-2 rounded-md text-center hover:bg-blue-600 transition duration-200"
              onClick={() => setToggle(false)}
            >
              Admin Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
