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
  Organization: FaComments,
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
      transition: { staggerChildren: 0.07 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35 },
    },
  };

  return (
    <section className="relative py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      {/* Single softer background blob */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-16 left-8 w-56 h-56 bg-emerald-200 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-8 w-64 h-64 bg-teal-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-3 border border-emerald-200">
            <FaQuestionCircle className="text-emerald-600 text-base" />
            <span className="font-semibold text-emerald-800 text-sm">
              FAQ Center
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Quick answers about how WhereIsIt works and how to stay safe.
          </p>
        </motion.div>

        {/* FAQs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="space-y-3"
        >
          {faqsData.map((faq) => {
            const Icon = iconMap[faq.category] || FaLightbulb;
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                layout
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <motion.button
                  type="button"
                  layout
                  onClick={() => handleToggle(faq.id)}
                  className="w-full text-left px-4 sm:px-5 py-4 flex justify-between items-center gap-4 hover:bg-emerald-50/60 transition-colors duration-200"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${faq.id}`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <motion.div
                      layout
                      className="p-2.5 rounded-lg bg-gradient-to-r from-emerald-100 to-teal-100 flex-shrink-0"
                    >
                      <Icon className="text-emerald-600 text-base" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1.5 line-clamp-2">
                        {faq.question}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-[11px] font-medium rounded-full border border-emerald-200">
                        <FaCog className="text-[10px]" />
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0"
                  >
                    <FaChevronDown className="text-gray-400 text-base" />
                  </motion.div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${faq.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4">
                        <div className="border-t border-emerald-100 pt-3">
                          <div className="flex items-start gap-2.5">
                            <div className="p-2 rounded-md bg-emerald-50 mt-0.5 flex-shrink-0">
                              <FaLightbulb className="text-emerald-600 text-sm" />
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
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

        {/* Support CTA (compact) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-10"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 sm:p-7 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-2 right-3 text-4xl">❓</div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Still need help?
              </h3>
              <p className="text-emerald-100 text-sm sm:text-base mb-4 max-w-xl mx-auto">
                Reach out to our team any time for personal support.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  className="group relative px-6 py-3 bg-white text-emerald-700 text-sm font-bold rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <span className="relative flex items-center gap-2">
                    <FaEnvelope className="text-sm" />
                    Contact support
                  </span>
                </button>

                <button
                  type="button"
                  className="group relative px-6 py-3 border border-white text-white text-sm font-bold rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    <FaCommentDots className="text-sm" />
                    Live chat
                  </span>
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-4 pt-3 border-t border-emerald-300/40 text-[11px] sm:text-xs text-emerald-100">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-sm" />
                  <span>help@whereisit.app</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCommentDots className="text-sm" />
                  <span>24/7 live support</span>
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
