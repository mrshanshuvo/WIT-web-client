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

    // Simulate API call
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
      color: "text-red-500",
      bgColor: "bg-red-50",
      link: `mailto:${support?.email}`,
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: support?.phone,
      color: "text-green-500",
      bgColor: "bg-green-50",
      link: `tel:${support?.phone}`,
    },
    {
      icon: FaMapMarkerAlt,
      label: "Address",
      value: support?.address,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: FaClock,
      label: "Working Hours",
      value: support?.workingHours,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      label: "Facebook",
      url: support?.facebook,
      color: "text-blue-600 hover:text-blue-700",
      bgColor: "bg-blue-100 hover:bg-blue-200",
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      url: support?.twitter,
      color: "text-blue-400 hover:text-blue-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      url: support?.instagram,
      color: "text-pink-600 hover:text-pink-700",
      bgColor: "bg-pink-100 hover:bg-pink-200",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      url: support?.linkedin,
      color: "text-blue-700 hover:text-blue-800",
      bgColor: "bg-blue-100 hover:bg-blue-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-lg">
              <FaHeadset className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help! Reach out to
            us through any of the channels below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500 p-2 rounded-xl">
                  <FaPaperPlane className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Send us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaUser className="text-blue-500" />
                      Full Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaEnvelope className="text-blue-500" />
                      Email Address <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                      <FaComment className="text-blue-500" />
                      Your Message <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading loading-spinner loading-sm"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-lg" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500 p-2 rounded-xl">
                  <FaHeadset className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Contact Information
                </h2>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={method.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:scale-105 ${method.bgColor}`}
                    >
                      <div className={`p-3 rounded-xl ${method.bgColor}`}>
                        <Icon className={`text-xl ${method.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {method.label}
                        </h3>
                        {method.link ? (
                          <a
                            href={method.link}
                            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                          >
                            {method.value || "Loading..."}
                          </a>
                        ) : (
                          <p className="text-gray-600">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Follow Us On Social Media
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 ${social.bgColor} ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="text-2xl" />
                      <span className="text-sm font-medium">
                        {social.label}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-6 text-center text-white"
            >
              <h3 className="text-lg font-bold mb-2">
                Quick Response Guaranteed
              </h3>
              <p className="text-blue-100 text-sm">
                We typically respond to all inquiries within 2-4 hours during
                business hours.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ/Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Need Immediate Help?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Check out our FAQ section or browse our help center for quick
            answers to common questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all duration-200 font-semibold">
              Visit Help Center
            </button>
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-all duration-200 font-semibold">
              Browse FAQ
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
