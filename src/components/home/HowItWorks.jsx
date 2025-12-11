import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaSearch,
  FaHandshake,
  FaCheckCircle,
  FaArrowRight,
  FaMobileAlt,
  FaShieldAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaCamera,
  FaBell,
  FaComments,
  FaCalendarCheck,
  FaHeart,
} from "react-icons/fa";

const steps = [
  {
    title: "Report Your Item",
    description:
      "Quickly submit details about your lost or found item with photos and location",
    icon: FaClipboardList,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    features: [
      { icon: FaCamera, text: "Upload photos" },
      { icon: FaClipboardList, text: "Add description" },
      { icon: FaMapMarkerAlt, text: "Set location" },
      { icon: FaClipboardList, text: "Choose category" },
    ],
  },
  {
    title: "Smart Matching",
    description:
      "Our AI-powered system instantly notifies you of potential matches in your area",
    icon: FaSearch,
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    features: [
      { icon: FaSearch, text: "AI matching" },
      { icon: FaBell, text: "Instant notifications" },
      { icon: FaMapMarkerAlt, text: "Location-based" },
      { icon: FaClipboardList, text: "Category filter" },
    ],
  },
  {
    title: "Safe Reunion",
    description:
      "Connect securely with the other party and arrange a safe item handover",
    icon: FaHandshake,
    color: "from-emerald-600 to-teal-600",
    bgColor: "bg-emerald-100",
    borderColor: "border-emerald-300",
    features: [
      { icon: FaComments, text: "Secure messaging" },
      { icon: FaCalendarCheck, text: "Meetup planning" },
      { icon: FaShieldAlt, text: "Identity verification" },
      { icon: FaCheckCircle, text: "Success tracking" },
    ],
  },
];

const stats = [
  { number: "10,000+", label: "Items Recovered", icon: FaCheckCircle },
  { number: "50,000+", label: "Happy Users", icon: FaUsers },
  { number: "98%", label: "Success Rate", icon: FaShieldAlt },
  { number: "24/7", label: "Active Support", icon: FaMobileAlt },
];

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-8 border border-emerald-200">
            <FaHeart className="text-emerald-600 text-lg" />
            <span className="font-bold text-emerald-800">How It Works</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-6">
            Simple Three-Step Recovery
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Reuniting lost items with their owners through our seamless and
            secure three-step process that makes recovery quick and reliable.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 mb-20 relative"
        >
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1">
            <div className="absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform -translate-y-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative group"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl z-10">
                  {index + 1}
                </div>

                {/* Step Card */}
                <div
                  className={`relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 ${step.borderColor} p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full flex flex-col overflow-hidden`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Icon */}
                  <div
                    className={`relative p-5 rounded-2xl bg-gradient-to-r ${step.color} w-20 h-20 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="text-white text-3xl" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-8 flex-grow">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {step.features.map((feature, featureIndex) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <div className="p-2 rounded-lg bg-emerald-50">
                            <FeatureIcon className="text-emerald-600 text-sm" />
                          </div>
                          <span className="text-sm font-medium">
                            {feature.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Learn More Button */}
                  <button className="group/btn flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors duration-200 self-start">
                    <span>Learn More</span>
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 p-10 sm:p-12 mb-20 overflow-hidden"
        >
          {/* Stats Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 text-6xl">✨</div>
            <div className="absolute bottom-4 right-4 text-6xl">💫</div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl inline-flex mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white text-2xl" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-bold">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-block p-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-8">
            <div className="bg-white rounded-xl px-6 py-2">
              <span className="text-emerald-700 font-bold flex items-center gap-2">
                <FaHandshake className="text-emerald-600" />
                Get Started Today
              </span>
            </div>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            Ready to Reunite What's Lost?
          </h3>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied users who have successfully reunited
            with their lost items through our trusted platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3">
                <FaClipboardList className="text-lg" />
                Report an Item Now
              </span>
            </button>

            <button className="group px-10 py-5 bg-white text-gray-800 font-bold rounded-2xl border-2 border-emerald-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-3">
                <FaShieldAlt />
                Learn More About Safety
              </span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-3 text-gray-500">
              <FaCheckCircle className="text-emerald-500" />
              <span className="font-medium">Verified Users</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <FaShieldAlt className="text-emerald-500" />
              <span className="font-medium">Secure Process</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <FaMobileAlt className="text-emerald-500" />
              <span className="font-medium">24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
