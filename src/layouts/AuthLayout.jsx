import React from "react";
import { Link, Outlet } from "react-router";
import { FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 flex flex-col relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Auth Navigation */}
      <nav className="sticky top-0 z-20 px-4 py-4 sm:px-6 lg:px-8 border-b border-white/40 backdrop-blur-md bg-white/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2 text-gray-600 hover:text-emerald-700 transition-all duration-200"
          >
            <div className="bg-white/80 p-2 rounded-lg shadow-sm group-hover:shadow transition-all">
              <FaArrowLeft className="text-sm" />
            </div>
            <span className="font-semibold text-sm hidden sm:inline">Back to Home</span>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl shadow-lg">
              <FaShieldAlt className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-800 to-teal-800 bg-clip-text text-transparent">
              WhereIsIt
            </span>
          </Link>

          <div className="w-10 sm:w-24" /> {/* Spacer */}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-7xl"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Auth Footer (Minimal) */}
      <footer className="relative z-20 py-6 px-4 border-t border-white/40 backdrop-blur-md bg-white/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} WhereIsIt. All rights reserved. | 
            <Link to="/contact" className="hover:text-emerald-600 ml-1">Support</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
