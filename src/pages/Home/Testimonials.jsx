import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaRegStar,
  FaUserCircle,
  FaHeart,
  FaMapMarkerAlt,
  FaBox,
  FaGraduationCap,
  FaBriefcase,
  FaCamera,
  FaKey,
  FaRing,
  FaFileAlt,
  FaUsers,
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
    icon: FaBox,
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
    icon: FaBriefcase,
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
    icon: FaKey,
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
    icon: FaCamera,
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
    icon: FaRing,
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
    icon: FaFileAlt,
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
    <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-80 h-80 bg-emerald-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            <span className="font-bold text-emerald-800">Success Stories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-6">
            Heartwarming Reunions
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover how our community has helped thousands of people reunite
            with their precious lost items
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => {
            const ItemIcon = testimonial.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="group">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-100 p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full flex flex-col relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl"></div>

                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 text-emerald-100 group-hover:text-emerald-200 transition-colors duration-300">
                    <FaQuoteLeft className="text-5xl" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {renderStars(testimonial.rating)}
                    <span className="text-sm text-gray-500 ml-2">5.0</span>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 mb-8 flex-grow text-base leading-relaxed">
                    "{testimonial.story}"
                  </blockquote>

                  {/* Item Badge */}
                  <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <ItemIcon className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Recovered Item
                      </p>
                      <p className="text-emerald-600 font-bold">
                        {testimonial.item}
                      </p>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-emerald-100">
                    <div className="flex-shrink-0 relative">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-emerald-200"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                      {/* Verified Badge */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                        <FaStar className="text-white text-xs" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm truncate">
                        {testimonial.role}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <FaMapMarkerAlt className="text-emerald-500" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-10 text-white overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-black mb-3">10K+</div>
              <div className="text-emerald-100 font-medium flex items-center justify-center gap-2">
                <FaUsers />
                Success Stories
              </div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black mb-3">98%</div>
              <div className="text-emerald-100 font-medium flex items-center justify-center gap-2">
                <FaHeart />
                Satisfaction Rate
              </div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black mb-3">50+</div>
              <div className="text-emerald-100 font-medium flex items-center justify-center gap-2">
                <FaMapMarkerAlt />
                Cities Covered
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="inline-block p-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-8">
            <div className="bg-white rounded-xl px-6 py-2">
              <span className="text-emerald-700 font-bold flex items-center gap-2">
                <FaHeart className="text-emerald-600" />
                Share Your Story
              </span>
            </div>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            Ready to Share Your Success Story?
          </h3>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Join our community of happy users and help others discover the power
            of WhereIsIt
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3">
                <FaUserCircle className="text-lg" />
                Share Your Story
              </span>
            </button>

            <button className="group px-10 py-5 bg-white text-gray-800 font-bold rounded-2xl border-2 border-emerald-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-3">
                <FaUsers />
                Browse More Stories
              </span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-3 text-gray-500">
              <FaStar className="text-emerald-500" />
              <span className="font-medium">Verified Testimonials</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <FaHeart className="text-emerald-500" />
              <span className="font-medium">Real Stories</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <FaMapMarkerAlt className="text-emerald-500" />
              <span className="font-medium">Nationwide</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
