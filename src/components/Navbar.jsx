import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1500,
          position: "center",
        });
      })
      .catch(console.error);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setDropdownOpen(false)}
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              isActive
                ? "text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/lost-found-items"
          onClick={() => setDropdownOpen(false)}
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              isActive
                ? "text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            }`
          }
        >
          Lost & Found
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/add-item"
            onClick={() => setDropdownOpen(false)}
            className={({ isActive }) =>
              `px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg transform scale-105"
                  : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
              }`
            }
          >
            Add Item
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/recovered-items"
          onClick={() => setDropdownOpen(false)}
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              isActive
                ? "text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            }`
          }
        >
          Recovered
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          onClick={() => setDropdownOpen(false)}
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              isActive
                ? "text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            }`
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          onClick={() => setDropdownOpen(false)}
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              isActive
                ? "text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-gray-50 to-white shadow-md backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50 px-4 sm:px-6 md:px-8">
      {/* Start Section */}
      <div className="navbar-start flex items-center gap-4">
        {/* Mobile menu */}
        <div className="dropdown lg:hidden">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="btn btn-ghost p-3 hover:bg-emerald-50 rounded-2xl transition-all duration-300"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className="block w-7 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-300"></span>
              <span className="block w-7 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-300"></span>
              <span className="block w-7 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-300"></span>
            </div>
          </button>
          <ul
            className={`menu menu-sm dropdown-content mt-4 p-4 shadow-2xl bg-white rounded-2xl w-72 space-y-2 ${
              dropdownOpen ? "block" : "hidden"
            }`}
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group"
        >
          <div className="relative">
            <img
              src={logo}
              alt="WhereIsIt Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent tracking-tight">
              WhereIsIt
            </span>
            <span className="text-xs text-gray-500 font-medium -mt-1 tracking-wide">
              Reuniting Lost Items
            </span>
          </div>
        </NavLink>
      </div>

      {/* Center Section */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-2 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-full p-2 shadow-inner border border-emerald-100/50">
          {links}
        </ul>
      </div>

      {/* End Section */}
      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-2xl transition-all duration-300 group"
            >
              <div className="flex flex-col items-end">
                <span className="font-semibold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">
                  {user.name || "User"}
                </span>
                <span className="text-xs text-gray-500 truncate max-w-[140px]">
                  {user.email}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg">
                      {user.name?.charAt(0) || "U"}
                    </span>
                  )}
                </div>
              </div>
            </button>

            {profileDropdownOpen && (
              <ul className="absolute right-0 mt-3 z-20 w-72 bg-white p-4 shadow-2xl rounded-2xl border border-emerald-100 backdrop-blur-sm">
                <li className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl mb-3 border border-emerald-100">
                  <div className="font-bold text-gray-900 truncate text-lg">
                    {user.name || "User"}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {user.email}
                  </div>
                </li>
                <div className="space-y-1.5">
                  <li>
                    <NavLink
                      to="/my-profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-700 transition-all font-medium border border-transparent hover:border-emerald-100"
                    >
                      My Profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/my-recovered-items"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-700 transition-all font-medium border border-transparent hover:border-emerald-100"
                    >
                      My Recovered Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-items"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-700 transition-all font-medium border border-transparent hover:border-emerald-100"
                    >
                      Manage My Items
                    </NavLink>
                  </li>
                </div>
                <li className="pt-3 mt-3 border-t border-emerald-100">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleSignOut();
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <NavLink
              to="/register"
              className="px-6 py-3 font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-all duration-300 border border-emerald-200 hover:border-emerald-300"
            >
              Register
            </NavLink>
            <NavLink
              to="/sign-in"
              className="px-6 py-3 font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
