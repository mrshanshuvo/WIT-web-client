import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaSearch,
  FaLightbulb,
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
      icon: "📝",
    },
    {
      question: "How can I mark an item as found?",
      answer:
        "Go to your dashboard, select the 'Found Items' section, and click 'Report Found Item'. Provide as much detail as possible to help identify the rightful owner quickly.",
      category: "Reporting",
      icon: "🔍",
    },
    {
      question: "Can I contact the finder/owner directly?",
      answer:
        "Yes! Once a match is made, our secure messaging system allows you to communicate directly while protecting your personal information until you're ready to share contact details.",
      category: "Communication",
      icon: "💬",
    },
    {
      question: "How are items categorized?",
      answer:
        "Items are organized into intuitive categories: Electronics, Documents, Jewelry, Clothing, Bags & Wallets, Keys, Books, and Other. This helps users quickly find what they're looking for.",
      category: "Organization",
      icon: "📂",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Absolutely. We use end-to-end encryption and never share your email or phone number publicly. Contact information is only shared with relevant parties after mutual agreement.",
      category: "Privacy",
      icon: "🔒",
    },
    {
      question: "How quickly will I be notified of matches?",
      answer:
        "Our AI-powered matching system sends instant notifications when potential matches are found. Most users receive their first match within hours of posting.",
      category: "Notifications",
      icon: "🔔",
    },
    {
      question: "What if my item is valuable or sensitive?",
      answer:
        "For valuable items, we recommend using our secure handoff locations and verification process. For sensitive documents, we have special protocols to ensure safe return.",
      category: "Safety",
      icon: "💎",
    },
    {
      question: "Is there a fee for using WhereIsIt?",
      answer:
        "Basic services are completely free! We offer premium features like enhanced visibility and business solutions for a small fee, but reuniting lost items will always be free.",
      category: "Pricing",
      icon: "💰",
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
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg">
              <FaQuestionCircle className="text-white text-3xl" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Find quick answers to common questions about using WhereIsIt
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FaLightbulb className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm appearance-none"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
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
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 text-center"
            >
              <FaSearch className="text-gray-400 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No FAQs Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                layout
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left p-6 sm:p-8 flex justify-between items-center gap-4 hover:bg-blue-50/50 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-2xl flex-shrink-0 mt-1">
                      {faq.icon}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg sm:text-xl mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {faq.question}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <FaChevronUp className="text-blue-500 text-lg transition-transform duration-200" />
                    ) : (
                      <FaChevronDown className="text-gray-400 text-lg group-hover:text-blue-500 transition-all duration-200" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                        <div className="border-t border-gray-100 pt-6">
                          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-blue-100 mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105">
                Contact Support
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 hover:scale-105">
                Live Chat
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
