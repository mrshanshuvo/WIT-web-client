import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
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
import { useNavigate } from "react-router";

const steps = [
  {
    title: "Report Your Item",
    description: "Add lost or found with a quick form and photo.",
    longDescription:
      "Tell us what you lost or found in just a few fields. Add clear photos, choose the right category, and drop a pin on the map so people nearby can spot it easily.",
    icon: FaClipboardList,
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-200",
    features: [
      { icon: FaCamera, text: "Add multiple item photos" },
      { icon: FaMapMarkerAlt, text: "Set exact location or area" },
    ],
    bullets: [
      "Takes less than a minute to submit",
      "You can edit the report later if needed",
      "Works for both lost and found items",
    ],
  },
  {
    title: "Smart Matching",
    description: "Get instant, smart matches from people nearby.",
    longDescription:
      "Behind the scenes, our system compares your report with thousands of others to spot potential matches based on keywords, location, time, and category.",
    icon: FaSearch,
    color: "from-teal-500 to-emerald-500",
    borderColor: "border-teal-200",
    features: [
      { icon: FaSearch, text: "AI-powered suggestions" },
      { icon: FaBell, text: "Real-time notifications" },
    ],
    bullets: [
      "No need to search manually all the time",
      "Filters out obvious mismatches to save your attention",
      "Continuously watches for new possible matches",
    ],
  },
  {
    title: "Safe Reunion",
    description: "Chat securely and arrange a safe handover.",
    longDescription:
      "Once there is a strong match, you can talk safely inside the platform, agree on a meeting point, and confirm when the item is back with the right person.",
    icon: FaHandshake,
    color: "from-emerald-600 to-teal-600",
    borderColor: "border-emerald-300",
    features: [
      { icon: FaComments, text: "Private in-app chat" },
      { icon: FaCalendarCheck, text: "Plan a safe meetup" },
    ],
    bullets: [
      "Keep your personal contact details private",
      "Use suggested safe locations for handovers",
      "Mark the item as reunited when done",
    ],
  },
];

const stats = [
  { number: "1000+", label: "Items Recovered", icon: FaCheckCircle },
  { number: "3000+", label: "Happy Users", icon: FaUsers },
  { number: "91%", label: "Success Rate", icon: FaShieldAlt },
  { number: "24/7", label: "Active Support", icon: FaMobileAlt },
];

const HowItWorks = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  const closeModal = () => setActiveStep(null);

  return (
    <div className="relative py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4 border border-emerald-100">
            <FaHeart className="text-emerald-600 text-base" />
            <span className="font-semibold text-emerald-800 text-sm">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-3">
            Simple Three-Step Recovery
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A fast, safe flow that takes you from reporting to reunion in just
            three clear steps.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative group"
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                  {index + 1}
                </div>

                <div
                  className={`relative bg-white rounded-2xl shadow-md border ${step.borderColor} p-6 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1`}
                >
                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${step.color} text-white shadow-md`}
                  >
                    <Icon className="text-2xl" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {step.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {step.features.map((feature, featureIndex) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <div className="p-1.5 rounded-md bg-emerald-50">
                            <FeatureIcon className="text-emerald-600 text-xs" />
                          </div>
                          <span className="text-xs font-medium">
                            {feature.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStep(step)}
                    className="group/btn flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 text-sm font-semibold transition-colors duration-200"
                  >
                    <span>Learn more</span>
                    <FaArrowRight className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats + CTA combined (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-6 sm:p-8"
        >
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={statVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl mb-2 shadow-md">
                      <Icon className="text-white text-lg" />
                    </div>
                    <div className="text-2xl font-black text-gray-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs font-semibold text-gray-600">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                Ready to Reunite What&apos;s Lost?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-5 max-w-md mx-auto lg:mx-0">
                Join a growing community reuniting thousands of items every
                month.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => navigate("/add-item")}
                  className="group relative px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2 justify-center">
                    <FaClipboardList className="text-sm" />
                    Report an Item
                  </span>
                </button>

                <button className="px-6 py-3 bg-white text-gray-800 text-sm font-bold rounded-xl border border-emerald-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300">
                  <span className="flex items-center gap-2 justify-center">
                    <FaShieldAlt className="text-sm" />
                    Safety Tips
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeStep && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="how-it-works-modal-title"
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl leading-none"
                aria-label="Close"
              >
                ×
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${activeStep.color} text-white shadow-md`}
                >
                  <activeStep.icon className="text-xl" />
                </div>
                <div>
                  <h3
                    id="how-it-works-modal-title"
                    className="text-xl font-bold text-gray-900"
                  >
                    {activeStep.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mt-1">
                    Step details
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">
                {activeStep.longDescription}
              </p>

              <div className="space-y-2 mb-4">
                {activeStep.features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-800 text-sm"
                    >
                      <div className="p-1.5 rounded-md bg-emerald-50">
                        <FeatureIcon className="text-emerald-600 text-xs" />
                      </div>
                      <span className="font-medium">{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-6">
                {activeStep.bullets?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-sm"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HowItWorks;
