import React from "react";
import { motion } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaRegStar,
  FaUserCircle,
  FaHeart,
} from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "University Student",
    story:
      "I lost my wallet with all my IDs and credit cards at the university library. Thanks to WhereIsIt, a kind stranger found it and I got everything back within 24 hours! The notification system is incredibly efficient.",
    avatar: "/images/user1.jpg",
    rating: 5,
    location: "New York, NY",
    item: "Wallet with IDs",
  },
  {
    name: "Imran Hassan",
    role: "Software Engineer",
    story:
      "Found my colleague's MacBook Pro in the office cafeteria. Used WhereIsIt to report it found, and within hours we were connected. The secure messaging made the handover process smooth and safe.",
    avatar: "/images/user2.jpg",
    rating: 5,
    location: "San Francisco, CA",
    item: "MacBook Pro",
  },
  {
    name: "Nabila Rahman",
    role: "Marketing Manager",
    story:
      "Lost my car keys at Central Park during my morning jog. The app notified me the same day when someone found them. The location tracking feature helped us meet up quickly. Amazing service!",
    avatar: "/images/user3.jpg",
    rating: 5,
    location: "Chicago, IL",
    item: "Car Keys",
  },
  {
    name: "Michael Chen",
    role: "Photographer",
    story:
      "My camera bag with $3000 worth of equipment was left in a taxi. Thanks to WhereIsIt's broad community reach, a driver found it and contacted me through the platform. Lifesaver!",
    avatar: "/images/user4.jpg",
    rating: 5,
    location: "Los Angeles, CA",
    item: "Camera Equipment",
  },
  {
    name: "Emily Rodriguez",
    role: "Teacher",
    story:
      "A student found my wedding ring in the classroom and posted it on WhereIsIt. I had lost all hope after searching for weeks. This platform brought back something priceless to me.",
    avatar: "/images/user5.jpg",
    rating: 5,
    location: "Miami, FL",
    item: "Wedding Ring",
  },
  {
    name: "David Thompson",
    role: "Business Owner",
    story:
      "Found an important business document folder in a coffee shop. Used the app to locate the owner, who happened to be my future business partner! WhereIsIt connects people in more ways than one.",
    avatar: "/images/user6.jpg",
    rating: 5,
    location: "Austin, TX",
    item: "Business Documents",
  },
];

const Testimonials = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-yellow-400">
        {index < rating ? <FaStar /> : <FaRegStar />}
      </span>
    ));
  };

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

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

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
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
              <FaHeart className="text-white text-3xl" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Heartwarming Success Stories
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Discover how WhereIsIt has helped thousands of people reunite with
            their precious lost items
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full flex flex-col relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-purple-200 group-hover:text-purple-300 transition-colors duration-300">
                  <FaQuoteLeft className="text-4xl" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 mb-6 flex-grow text-sm sm:text-base leading-relaxed">
                  "{testimonial.story}"
                </blockquote>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="flex-shrink-0">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />
                    ) : null}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg hidden">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm truncate">
                      {testimonial.role}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{testimonial.location}</span>
                      <span>•</span>
                      <span className="text-purple-600 font-medium">
                        {testimonial.item}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 sm:mt-20"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 sm:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Share Your Success Story?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Join our community of happy users and help others discover the
              power of WhereIsIt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg">
                Share Your Story
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-purple-600 transition-all duration-200 hover:scale-105">
                Browse More Stories
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
