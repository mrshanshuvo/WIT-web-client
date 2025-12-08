import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaCheck,
  FaUsers,
  FaComment,
  FaBolt,
  FaGlobe,
  FaTrophy,
  FaChartLine,
  FaStar,
  FaRocket,
  FaBook,
  FaShieldAlt,
  FaUserFriends,
} from "react-icons/fa";

const stats = [
  {
    value: "10,000+",
    label: "Items Recovered",
    icon: <FaCheck />,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    description: "Successful reunions and counting",
  },
  {
    value: "50,000+",
    label: "Happy Users",
    icon: <FaUsers />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    description: "Trusted by our community",
  },
  {
    value: "24/7",
    label: "Active Support",
    icon: <FaComment />,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    description: "Always here to help you",
  },
  {
    value: "15min",
    label: "Avg Response Time",
    icon: <FaBolt />,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    description: "Quick assistance guaranteed",
  },
  {
    value: "100+",
    label: "Cities Covered",
    icon: <FaGlobe />,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    description: "Growing nationwide coverage",
  },
  {
    value: "98%",
    label: "Success Rate",
    icon: <FaTrophy />,
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50",
    description: "Proven track record",
  },
];

const StatsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const numberVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "backOut",
      },
    },
  };

  return (
    <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-8 border border-emerald-200">
            <span className="text-2xl">
              <FaChartLine />
            </span>
            <span className="font-bold text-emerald-800">Our Impact</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-6">
            Making a Real Difference
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Join thousands who've experienced the joy of reuniting with their
            lost belongings through our trusted platform.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-100 p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full flex flex-col relative overflow-hidden">
                {/* Animated Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Icon Container */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  {/* Growth indicator for specific stats */}
                  {stat.label === "Items Recovered" && (
                    <div className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-bold rounded-full">
                      ↑ 15%
                    </div>
                  )}
                </div>

                {/* Value */}
                <motion.div
                  variants={numberVariants}
                  className="text-4xl lg:text-5xl font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-300"
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base flex-grow">
                  {stat.description}
                </p>

                {/* Progress Bar for Success Rate */}
                {stat.label === "Success Rate" && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Success Rate</span>
                      <span className="font-bold text-emerald-600">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "98%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full shadow-lg"
                      ></motion.div>
                    </div>
                  </div>
                )}

                {/* Decorative bottom accent */}
                <div className="mt-6 pt-4 border-t border-gray-100 group-hover:border-emerald-100 transition-colors">
                  <span className="text-xs text-gray-400 group-hover:text-emerald-500 transition-colors">
                    Trust & Reliability
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Impact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-10 sm:p-12 text-white overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 text-6xl">✨</div>
            <div className="absolute bottom-4 left-4 text-6xl">💫</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black mb-3">$2M+</div>
              <div className="text-emerald-100 text-base font-medium">
                Value of Items Recovered
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black mb-3">150+</div>
              <div className="text-emerald-100 text-base font-medium">
                Partnerships & Locations
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black mb-3">4.9/5</div>
              <div className="text-emerald-100 text-base font-medium">
                User Satisfaction Rating
              </div>
            </div>
          </div>

          {/* Rating stars */}
          <div className="flex justify-center gap-1 mt-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-2xl">
                <FaStar />
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-8">
            <div className="bg-white rounded-xl px-6 py-1">
              <span className="text-emerald-700 font-bold">
                Success Stories
              </span>
            </div>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            Ready to Be Our Next Success Story?
          </h3>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Experience the peace of mind that comes with knowing your lost items
            have the best chance of being found.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3">
                <span>
                  <FaRocket />
                </span>
                Get Started Today
              </span>
            </button>

            <button className="group px-10 py-5 bg-white text-gray-800 font-bold rounded-2xl border-2 border-emerald-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-3">
                <span>
                  <FaBook />
                </span>
                View Success Stories
              </span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-3 text-gray-500">
              <span className="text-xl">
                <FaShieldAlt />
              </span>
              <span className="font-medium">Secure & Trusted</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <span className="text-xl">
                <FaBolt />
              </span>
              <span className="font-medium">Fast Processing</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <span className="text-xl">
                <FaUserFriends />
              </span>
              <span className="font-medium">Community-Driven</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
