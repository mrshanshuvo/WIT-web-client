import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaSearch,
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
  FaFilter,
  FaBox,
  FaFileAlt,
  FaLock,
  FaCog,
} from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "How do I report a lost item?",
      answer:
        "Simply click on 'Report Lost Item' from your dashboard, fill in the item details including photos, description, location, and category. Your item will be instantly visible to our community of helpers.",
      category: "Reporting",
      icon: FaClipboardList,
    },
    {
      question: "How can I mark an item as found?",
      answer:
        "Go to your dashboard, select the 'Found Items' section, and click 'Report Found Item'. Provide as much detail as possible to help identify the rightful owner quickly.",
      category: "Reporting",
      icon: FaEye,
    },
    {
      question: "Can I contact the finder/owner directly?",
      answer:
        "Yes! Once a match is made, our secure messaging system allows you to communicate directly while protecting your personal information until you're ready to share contact details.",
      category: "Communication",
      icon: FaComments,
    },
    {
      question: "How are items categorized?",
      answer:
        "Items are organized into intuitive categories: Electronics, Documents, Jewelry, Clothing, Bags & Wallets, Keys, Books, and Other. This helps users quickly find what they're looking for.",
      category: "Organization",
      icon: FaFilter,
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Absolutely. We use end-to-end encryption and never share your email or phone number publicly. Contact information is only shared with relevant parties after mutual agreement.",
      category: "Privacy",
      icon: FaShieldAlt,
    },
    {
      question: "How quickly will I be notified of matches?",
      answer:
        "Our AI-powered matching system sends instant notifications when potential matches are found. Most users receive their first match within hours of posting.",
      category: "Notifications",
      icon: FaBell,
    },
    {
      question: "What if my item is valuable or sensitive?",
      answer:
        "For valuable items, we recommend using our secure handoff locations and verification process. For sensitive documents, we have special protocols to ensure safe return.",
      category: "Safety",
      icon: FaGem,
    },
    {
      question: "Is there a fee for using WhereIsIt?",
      answer:
        "Basic services are completely free! We offer premium features like enhanced visibility and business solutions for a small fee, but reuniting lost items will always be free.",
      category: "Pricing",
      icon: FaDollarSign,
    },
  ];

  const categories = [...new Set(faqs.map((faq) => faq.category))];
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 p-6 sm:p-8 mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg group-hover:text-emerald-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-5 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <FaLightbulb className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg group-hover:text-emerald-500 transition-colors duration-300" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-14 pr-5 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-800 appearance-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-medium rounded-full border border-emerald-200">
                <FaFilter className="text-xs" />
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1 hover:text-emerald-900"
                >
                  ×
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-sm font-medium rounded-full border border-gray-200">
                <FaSearch className="text-xs" />"{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 hover:text-gray-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {filteredFaqs.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 p-12 text-center"
            >
              <FaSearch className="text-gray-400 text-5xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No FAQs Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  layout
                  className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full text-left p-6 sm:p-8 flex justify-between items-center gap-6 hover:bg-emerald-50/50 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300">
                        <Icon className="text-emerald-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                          {faq.question}
                        </h3>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-sm font-medium rounded-full border border-emerald-200">
                          <FaCog className="text-xs" />
                          {faq.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <FaChevronUp className="text-emerald-600 text-xl transition-transform duration-300" />
                      ) : (
                        <FaChevronDown className="text-gray-400 text-xl group-hover:text-emerald-500 transition-all duration-300" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                          <div className="border-t border-emerald-100 pt-6">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-emerald-50 mt-1">
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
            })
          )}
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-10 sm:p-12 text-white overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl">❓</div>
              <div className="absolute bottom-4 left-4 text-6xl">❔</div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-4 relative z-10">
              Still Have Questions?
            </h3>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto relative z-10">
              Our dedicated support team is here to help you 24/7 with any
              questions or concerns
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <button className="group relative px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-3">
                  <FaEnvelope className="text-lg" />
                  Contact Support
                </span>
              </button>

              <button className="group relative px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-3">
                  <FaCommentDots />
                  Live Chat
                </span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pt-8 border-t border-emerald-400/30">
              <div className="flex items-center justify-center gap-3 text-emerald-100">
                <FaEnvelope />
                <span>help@whereisit.app</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-emerald-100">
                <FaCommentDots />
                <span>24/7 Live Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
