import React from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaUsers,
  FaHeadset,
  FaClock,
  FaMapMarkerAlt,
  FaHeart,
  FaShieldAlt,
} from "react-icons/fa";

const stats = [
  {
    value: "10,000+",
    label: "Items Recovered",
    icon: FaCheckCircle,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    description: "Successful reunions and counting",
  },
  {
    value: "50,000+",
    label: "Happy Users",
    icon: FaUsers,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    description: "Trusted by our community",
  },
  {
    value: "24/7",
    label: "Active Support",
    icon: FaHeadset,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    description: "Always here to help you",
  },
  {
    value: "15min",
    label: "Avg Response Time",
    icon: FaClock,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    description: "Quick assistance guaranteed",
  },
  {
    value: "100+",
    label: "Cities Covered",
    icon: FaMapMarkerAlt,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    description: "Growing nationwide coverage",
  },
  {
    value: "98%",
    label: "Success Rate",
    icon: FaShieldAlt,
    color: "from-teal-500 to-green-500",
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
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-lg">
              <FaHeart className="text-white text-3xl" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Making a Real Impact
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Join thousands of satisfied users who have experienced the joy of
            reuniting with their lost items through our platform.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="group"
              >
                <div
                  className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full flex flex-col relative overflow-hidden`}
                >
                  {/* Animated Background Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Icon */}
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} w-14 h-14 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="text-white text-xl" />
                  </div>

                  {/* Value */}
                  <motion.div
                    variants={numberVariants}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300"
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base flex-grow">
                    {stat.description}
                  </p>

                  {/* Progress Bar for Success Rate */}
                  {stat.label === "Success Rate" && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "98%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  )}

                  {/* Growth Indicator */}
                  {stat.label === "Items Recovered" && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-green-600 font-semibold">
                      <span>↑</span>
                      <span>15% growth this month</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 sm:p-12 text-white text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">$2M+</div>
              <div className="text-blue-100 text-sm sm:text-base">
                Value of Items Recovered
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-100 text-sm sm:text-base">
                Partnerships & Locations
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100 text-sm sm:text-base">
                User Satisfaction Rating
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 sm:mt-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Ready to Be Our Next Success Story?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our growing community and experience the peace of mind that
            comes with knowing your lost items can be found.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:border-gray-400 transition-all duration-200 hover:scale-105">
              View Success Stories
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
