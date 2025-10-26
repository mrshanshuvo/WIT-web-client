import React from "react";
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
} from "react-icons/fa";

const steps = [
  {
    title: "Report Your Item",
    description:
      "Quickly submit details about your lost or found item with photos and location",
    icon: FaClipboardList,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    features: [
      "Upload photos",
      "Add description",
      "Set location",
      "Choose category",
    ],
  },
  {
    title: "Smart Matching",
    description:
      "Our AI-powered system instantly notifies you of potential matches in your area",
    icon: FaSearch,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    features: [
      "AI matching",
      "Instant notifications",
      "Location-based",
      "Category filter",
    ],
  },
  {
    title: "Safe Reunion",
    description:
      "Connect securely with the other party and arrange a safe item handover",
    icon: FaHandshake,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    features: [
      "Secure messaging",
      "Meetup planning",
      "Identity verification",
      "Success tracking",
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
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-lg">
              <FaHandshake className="text-white text-3xl" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            How WhereIsIt Works
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Reuniting lost items with their owners has never been easier. Our
            simple three-step process makes recovery quick and secure.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16 sm:mb-20"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative group"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-100 -translate-y-1/2 -translate-x-1/2 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                )}

                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                  {index + 1}
                </div>

                {/* Step Card */}
                <div
                  className={`relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-2 ${step.borderColor} p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full flex flex-col`}
                >
                  {/* Icon */}
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${step.color} w-16 h-16 flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon className="text-white text-2xl" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 flex-grow">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {step.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <FaCheckCircle className="text-green-500 text-xs flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200 group/btn self-start">
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
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl inline-flex mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white text-2xl" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base font-medium">
                    {stat.label}
                  </div>
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
          className="text-center mt-12 sm:mt-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have successfully reunited with their
            lost items
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
              Report an Item Now
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:border-gray-400 transition-all duration-200 hover:scale-105">
              Learn More About Safety
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
