import React, { useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaQuestionCircle,
  FaLightbulb,
  FaEnvelope,
  FaCommentDots,
  FaClipboardList,
  FaEye,
  FaComments,
  FaShieldAlt,
  FaBell,
  FaGem,
  FaDollarSign,
  FaCog,
} from "react-icons/fa";
import faqsData from "./faqs.json";

const iconMap = {
  Reporting: FaClipboardList,
  Communication: FaComments,
  Organization: FaEye,
  Privacy: FaShieldAlt,
  Notifications: FaBell,
  Safety: FaGem,
  Pricing: FaDollarSign,
};

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-200 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300 rounded-full blur-3xl animate-pulse [animation-delay:0.5s]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-8 border border-emerald-200">
            <FaQuestionCircle className="text-emerald-600 text-lg" />
            <span className="font-bold text-emerald-800">FAQ Center</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Find quick answers to common questions about using WhereIsIt
          </p>
        </motion.div>

        {/* FAQs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {faqsData.map((faq) => {
            const Icon = iconMap[faq.category] || FaLightbulb;
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                layout
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <motion.button
                  type="button"
                  layout
                  onClick={() => handleToggle(faq.id)}
                  className="w-full text-left p-6 sm:p-8 flex justify-between items-center gap-6 hover:bg-emerald-50/50 transition-colors duration-300"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${faq.id}`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <motion.div
                      layout
                      className="p-3 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300 flex-shrink-0"
                    >
                      <Icon className="text-emerald-600 text-xl" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                        {faq.question}
                      </h3>
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-sm font-medium rounded-full border border-emerald-200">
                        <FaCog className="text-xs" />
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <FaChevronDown className="text-gray-400 text-xl group-hover:text-emerald-500 transition-all duration-300" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-${faq.id}`}
                      initial={{ opacity: 0, height: 0, margin: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0, margin: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                        <div className="border-t border-emerald-100 pt-6">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-emerald-50 mt-1 flex-shrink-0">
                              <FaLightbulb className="text-emerald-600" />
                            </div>
                            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Support CTA (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 relative"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-10 sm:p-12 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-4 right-4 text-6xl">❓</div>
              <div className="absolute bottom-4 left-4 text-6xl">❔</div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Still Have Questions?
              </h3>
              <p className="text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Our dedicated support team is here to help you 24/7 with any
                questions or concerns
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  type="button"
                  className="group relative px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-3">
                    <FaEnvelope className="text-lg" />
                    Contact Support
                  </span>
                </button>

                <button
                  type="button"
                  className="group relative px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    <FaCommentDots />
                    Live Chat
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pt-8 border-t border-emerald-400/30">
                <div className="flex items-center justify-center gap-3 text-emerald-100">
                  <FaEnvelope className="text-lg flex-shrink-0" />
                  <span className="text-sm">help@whereisit.app</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-emerald-100">
                  <FaCommentDots className="text-lg flex-shrink-0" />
                  <span className="text-sm">24/7 Live Support</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
