import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-emerald-50 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200 rounded-full blur-3xl"></div>
      </div>

      {/* Centered Content */}
      <div className="flex flex-col justify-center items-center max-w-2xl w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 p-8 md:p-12 w-full">
          {/* Error Code */}
          <div className="relative text-center">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-2xl opacity-20"></div>
            <div className="relative">
              <span className="text-9xl font-black bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
                404
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
              The page you're looking for seems to have wandered off. Don't
              worry, let's help you find your way back.
            </p>

            {/* Decorative Illustration */}
            <div className="mb-12 relative">
              <div className="w-64 h-64 mx-auto relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                        <span className="text-3xl">📍</span>
                      </div>
                      <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-emerald-300 animate-ping"></div>
                      <div
                        className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full border-4 border-teal-300 animate-ping"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={() => navigate(-1)}
                className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <span className="text-xl">↶</span>
                  Go Back
                </span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <span className="text-xl">🏠</span>
                  Return Home
                </span>
              </button>
            </div>

            {/* Additional Options */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-gray-500 mb-4">Need more help?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-medium rounded-lg hover:shadow-md transition-all hover:scale-105 border border-emerald-100"
                >
                  Contact Support
                </button>
                <button
                  onClick={() => navigate("/faq")}
                  className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-medium rounded-lg hover:shadow-md transition-all hover:scale-105 border border-gray-200"
                >
                  Visit FAQ
                </button>
                <button
                  onClick={() => navigate("/blog")}
                  className="px-6 py-3 bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-700 font-medium rounded-lg hover:shadow-md transition-all hover:scale-105 border border-teal-100"
                >
                  Read Blog
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-600">99%</div>
              <div className="text-sm text-gray-600">Recovery Rate</div>
            </div>
            <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100">
              <div className="text-2xl font-bold text-teal-600">10K+</div>
              <div className="text-sm text-gray-600">Items Found</div>
            </div>
            <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-200">
              <div className="text-2xl font-bold text-gray-700">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 italic">
            "Every lost item has a story. Let's help you write the happy
            ending."
          </p>
          <p className="text-sm text-gray-400 mt-2">— The WhereIsIt Team</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
