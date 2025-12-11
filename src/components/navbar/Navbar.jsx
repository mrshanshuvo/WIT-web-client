import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import logo from "../../assets/logo.svg";

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md scale-[1.02]"
        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
    }`;

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setDropdownOpen(false)}
          className={linkClass}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/lost-found-items"
          onClick={() => setDropdownOpen(false)}
          className={linkClass}
        >
          Lost &amp; Found
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/add-item"
            onClick={() => setDropdownOpen(false)}
            className={linkClass}
          >
            Add Item
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/recovered-items"
          onClick={() => setDropdownOpen(false)}
          className={linkClass}
        >
          Recovered
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          onClick={() => setDropdownOpen(false)}
          className={linkClass}
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          onClick={() => setDropdownOpen(false)}
          className={linkClass}
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar min-h-0 h-16 sm:h-18 bg-gradient-to-r from-gray-50 to-white shadow-sm backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50 px-3 sm:px-5 md:px-8">
      {/* Start Section */}
      <div className="navbar-start flex items-center gap-3">
        {/* Mobile menu */}
        <div className="dropdown lg:hidden">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="btn btn-ghost p-2 hover:bg-emerald-50 rounded-xl transition-all duration-200"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1">
              <span className="block w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" />
              <span className="block w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" />
              <span className="block w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" />
            </div>
          </button>
          <ul
            className={`menu menu-sm dropdown-content mt-3 p-3 shadow-xl bg-white rounded-2xl w-64 space-y-1.5 ${
              dropdownOpen ? "block" : "hidden"
            }`}
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-all duration-200 group"
        >
          <div className="relative">
            <img
              src={logo}
              alt="WhereIsIt Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain filter drop-shadow"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-200" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent tracking-tight">
              WhereIsIt
            </span>
            <span className="text-[11px] text-gray-500 font-medium -mt-0.5 tracking-wide">
              Reuniting Lost Items
            </span>
          </div>
        </NavLink>
      </div>

      {/* Center Section */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-full px-2 py-1.5 shadow-inner border border-emerald-100/60">
          {links}
        </ul>
      </div>

      {/* End Section */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 hover:bg-emerald-50 rounded-2xl transition-all duration-200 group"
            >
              <div className="flex flex-col items-end max-w-[160px]">
                <span className="font-semibold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors truncate">
                  {user.name || "User"}
                </span>
                <span className="text-[11px] text-gray-500 truncate">
                  {user.email}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-md relative overflow-hidden group-hover:scale-105 transition-transform">
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
                    <span>{user.name?.charAt(0) || "U"}</span>
                  )}
                </div>
              </div>
            </button>

            {profileDropdownOpen && (
              <ul className="absolute right-0 mt-2 z-20 w-64 bg-white p-3 shadow-2xl rounded-2xl border border-emerald-100 backdrop-blur-sm text-sm">
                <li className="px-3 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl mb-2 border border-emerald-100">
                  <div className="font-bold text-gray-900 truncate">
                    {user.name || "User"}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {user.email}
                  </div>
                </li>
                <div className="space-y-1">
                  <li>
                    <NavLink
                      to="/my-profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-3 py-2.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all font-medium"
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-recovered-items"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-3 py-2.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all font-medium"
                    >
                      My Recovered Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-items"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-3 py-2.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all font-medium"
                    >
                      Manage My Items
                    </NavLink>
                  </li>
                </div>
                <li className="pt-2 mt-2 border-t border-emerald-100">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleSignOut();
                    }}
                    className="w-full px-3 py-2.5 bg-gradient-to-r from-red-400 to-red-500 text-white text-sm font-bold rounded-lg hover:shadow-md hover:scale-[1.01] transition-all duration-200"
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
              className="px-4 py-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-all duration-200 border border-emerald-200 hover:border-emerald-300"
            >
              Register
            </NavLink>
            <NavLink
              to="/sign-in"
              className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-md hover:scale-[1.02] transition-all duration-200 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
