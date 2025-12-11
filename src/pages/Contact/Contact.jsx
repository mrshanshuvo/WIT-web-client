import React, { useState, useEffect } from "react";
import contactInfo from "./contactInfo.json";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaUser,
  FaComment,
  FaHeadset,
} from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [support, setSupport] = useState({});

  useEffect(() => {
    setSupport(contactInfo);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("🎉 Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: support?.email,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      link: `mailto:${support?.email}`,
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: support?.phone,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      link: `tel:${support?.phone}`,
    },
    {
      icon: FaMapMarkerAlt,
      label: "Address",
      value: support?.address,
      color: "text-emerald-700",
      bgColor: "bg-emerald-100",
    },
    {
      icon: FaClock,
      label: "Working Hours",
      value: support?.workingHours,
      color: "text-teal-700",
      bgColor: "bg-teal-100",
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      label: "Facebook",
      url: support?.facebook,
      color: "text-emerald-700 hover:text-emerald-800",
      bgColor: "bg-emerald-100 hover:bg-emerald-200",
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      url: support?.twitter,
      color: "text-teal-600 hover:text-teal-700",
      bgColor: "bg-teal-50 hover:bg-teal-100",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      url: support?.instagram,
      color: "text-emerald-600 hover:text-emerald-700",
      bgColor: "bg-emerald-50 hover:bg-emerald-100",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      url: support?.linkedin,
      color: "text-teal-700 hover:text-teal-800",
      bgColor: "bg-teal-100 hover:bg-teal-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl shadow-md">
              <FaHeadset className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-2">
            Get in touch
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Have questions or need assistance? Reach out through any of the
            channels below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 overflow-hidden"
          >
            <div className="p-5 sm:p-6 lg:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                  <FaPaperPlane className="text-white text-base" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Send us a message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaUser className="text-emerald-600" />
                      Full name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 bg-white/60 backdrop-blur-sm text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaEnvelope className="text-emerald-600" />
                      Email address <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 bg-white/60 backdrop-blur-sm text-sm"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaComment className="text-emerald-600" />
                      Your message <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-150 bg-white/60 backdrop-blur-sm resize-none text-sm"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-150 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading loading-spinner loading-sm" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm" />
                      Send message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information + Social */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Contact Methods */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-5 sm:p-6 lg:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-lg">
                  <FaHeadset className="text-white text-base" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Contact information
                </h2>
              </div>

              <div className="space-y-3">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={method.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-150 ${method.bgColor} border border-emerald-200`}
                    >
                      <div className={`p-2.5 rounded-lg ${method.bgColor}`}>
                        <Icon className={`text-lg ${method.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {method.label}
                        </h3>
                        {method.link ? (
                          <a
                            href={method.link}
                            className="text-emerald-700 hover:text-emerald-800 text-sm transition-colors duration-150"
                          >
                            {method.value || "Loading..."}
                          </a>
                        ) : (
                          <p className="text-gray-600 text-sm">
                            {method.value || "Loading..."}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-5 sm:p-6 lg:p-7">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                Follow us on social media
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: 0.2 + index * 0.05 }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-150 ${social.bgColor} ${social.color} border border-emerald-200 text-sm`}
                      aria-label={social.label}
                    >
                      <Icon className="text-xl" />
                      <span className="font-medium">{social.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-center text-white shadow-md"
            >
              <h3 className="text-base font-bold mb-1.5">
                Quick response guaranteed
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm">
                Most inquiries are answered within 2–4 business hours.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ/Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Need immediate help?
          </h3>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm sm:text-base">
            Visit the help center or browse the FAQ for quick answers to common
            questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-150 font-semibold shadow-md hover:shadow-lg text-sm">
              Visit help center
            </button>
            <button className="px-6 py-2.5 border border-emerald-300 text-emerald-700 rounded-lg hover:border-emerald-400 hover:text-emerald-800 transition-all duration-150 font-semibold text-sm">
              Browse FAQ
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
