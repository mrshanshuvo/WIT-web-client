import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaStar,
  FaRegStar,
  FaQuoteLeft,
  FaUserCircle,
  FaCheckCircle,
  FaAward,
  FaThumbsUp,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaChartLine,
  FaHeart,
  FaShieldAlt,
  FaMedal,
} from "react-icons/fa";

const RatingReviews = () => {
  const reviews = [
    {
      name: "Alice Johnson",
      role: "Graphic Designer",
      rating: 5,
      comment:
        "Found my lost wallet with all my IDs and credit cards thanks to this amazing platform! The notification system is incredibly efficient and the community is so helpful. Highly recommend to everyone!",
      avatar: "/images/user7.jpg",
      location: "Seattle, WA",
      verified: true,
      date: "2 days ago",
      helpful: 12,
      icon: FaUserCircle,
    },
    {
      name: "Rahim Ahmed",
      role: "Software Engineer",
      rating: 5,
      comment:
        "As someone who travels frequently, I've used WhereIsIt multiple times. Each experience has been seamless. The secure messaging and location features make item recovery stress-free. Outstanding service!",
      avatar: "/images/user8.jpg",
      location: "Austin, TX",
      verified: true,
      date: "1 week ago",
      helpful: 8,
      icon: FaUserCircle,
    },
    {
      name: "Sara Khan",
      role: "Marketing Director",
      rating: 5,
      comment:
        "Lost my grandmother's vintage necklace during a conference. I had lost all hope, but WhereIsIt came through! The detailed categorization helped someone identify it quickly. Forever grateful!",
      avatar: "/images/user9.jpg",
      location: "Chicago, IL",
      verified: true,
      date: "3 days ago",
      helpful: 15,
      icon: FaUserCircle,
    },
    {
      name: "Michael Chen",
      role: "Photographer",
      rating: 5,
      comment:
        "The AI matching system is phenomenal! My camera lens was returned within hours of posting. The platform's security features gave me confidence throughout the process. Five stars!",
      avatar: "/images/user10.jpg",
      location: "Portland, OR",
      verified: true,
      date: "5 days ago",
      helpful: 6,
      icon: FaUserCircle,
    },
    {
      name: "Emily Rodriguez",
      role: "Teacher",
      rating: 5,
      comment:
        "As an educator, I appreciate how easy WhereIsIt is to use. My students have also started using it for their lost items. It's building a wonderful sense of community and responsibility.",
      avatar: "/images/user11.jpg",
      location: "Miami, FL",
      verified: true,
      date: "1 week ago",
      helpful: 11,
      icon: FaUserCircle,
    },
    {
      name: "David Thompson",
      role: "Business Owner",
      rating: 5,
      comment:
        "Found important business documents in a taxi. WhereIsIt not only helped me return them but also connected me with a potential client! The platform creates unexpected opportunities.",
      avatar: "/images/user12.jpg",
      location: "Boston, MA",
      verified: true,
      date: "2 weeks ago",
      helpful: 9,
      icon: FaUserCircle,
    },
  ];

  const stats = {
    averageRating: 4.9,
    totalReviews: 2847,
    fiveStar: 95,
    fourStar: 4,
    threeStar: 1,
    twoStar: 0,
    oneStar: 0,
  };

  const renderStars = (rating, size = "text-lg") => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-yellow-400 ${size}`}>
        {index < rating ? <FaStar /> : <FaRegStar />}
      </span>
    ));
  };

  const renderRatingBar = (percentage, count) => (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-8">{count}★</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full shadow-sm"
        ></motion.div>
      </div>
      <span className="text-sm text-gray-600 w-8">{percentage}%</span>
    </div>
  );

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
        <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            <FaAward className="text-emerald-600 text-lg" />
            <span className="font-bold text-emerald-800">Customer Reviews</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            See why our community loves WhereIsIt. Real reviews from real users
            who found hope when they needed it most.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 p-8 sticky top-8">
              {/* Average Rating */}
              <div className="text-center mb-8">
                <div className="text-6xl font-black text-gray-900 mb-4">
                  {stats.averageRating}
                  <span className="text-3xl text-gray-600">/5</span>
                </div>
                <div className="flex justify-center mb-4">
                  {renderStars(5, "text-2xl")}
                </div>
                <div className="text-gray-600">
                  Based on {stats.totalReviews.toLocaleString()} reviews
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-4 mb-8">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaChartLine className="text-emerald-600" />
                  Rating Breakdown
                </h3>
                {renderRatingBar(stats.fiveStar, 5)}
                {renderRatingBar(stats.fourStar, 4)}
                {renderRatingBar(stats.threeStar, 3)}
                {renderRatingBar(stats.twoStar, 2)}
                {renderRatingBar(stats.oneStar, 1)}
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-emerald-100 space-y-4">
                <div className="flex items-center gap-3 text-emerald-700">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-100 to-teal-100">
                    <FaCheckCircle className="text-lg" />
                  </div>
                  <span className="font-medium">Verified Reviews</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-700">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-100 to-teal-100">
                    <FaMedal className="text-lg" />
                  </div>
                  <span className="font-medium">Top Rated Service</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-700">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-100 to-teal-100">
                    <FaShieldAlt className="text-lg" />
                  </div>
                  <span className="font-medium">Secure Platform</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reviews Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {reviews.map((review, index) => {
              const Icon = review.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-100 p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full flex flex-col relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl"></div>

                    {/* Quote Icon */}
                    <div className="absolute top-8 right-8 text-emerald-100 group-hover:text-emerald-200 transition-colors duration-300">
                      <FaQuoteLeft className="text-4xl" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6">
                      {renderStars(review.rating, "text-xl")}
                      <span className="text-sm text-gray-500 ml-2">5.0</span>
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-gray-700 mb-8 flex-grow text-base leading-relaxed">
                      "{review.comment}"
                    </blockquote>

                    {/* User Info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-emerald-100">
                      <div className="flex-shrink-0 relative">
                        {review.avatar ? (
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-emerald-200"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl">
                          {review.name.charAt(0)}
                        </div>
                        {/* Verified Badge */}
                        {review.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            <FaCheckCircle className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 truncate">
                            {review.name}
                          </h4>
                        </div>
                        <p className="text-gray-600 text-sm truncate">
                          {review.role}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                          <div className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-emerald-500 text-xs" />
                            <span>{review.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt className="text-emerald-500 text-xs" />
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Helpful Count */}
                    <div className="mt-6 flex justify-between items-center">
                      <button className="group/btn flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200">
                        <div className="p-1.5 rounded-lg bg-emerald-50 group-hover/btn:bg-emerald-100 transition-colors">
                          <FaThumbsUp className="text-sm" />
                        </div>
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <span className="text-xs bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium border border-emerald-200">
                        Verified User
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-10 sm:p-12 text-white overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl">⭐</div>
              <div className="absolute bottom-4 left-4 text-6xl">🌟</div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-4 relative z-10">
              Share Your Experience
            </h3>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto relative z-10">
              Join thousands of satisfied users and help others discover the
              power of WhereIsIt
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <button className="group relative px-10 py-5 bg-white text-emerald-700 font-bold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-3">
                  <FaStar className="text-lg" />
                  Write a Review
                </span>
              </button>

              <button className="group px-10 py-5 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-3">
                  <FaUsers />
                  Load More Reviews
                </span>
              </button>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-emerald-400/30">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black mb-2">
                  2.8K+
                </div>
                <div className="text-emerald-100 text-sm">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black mb-2">10K+</div>
                <div className="text-emerald-100 text-sm">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black mb-2">50K+</div>
                <div className="text-emerald-100 text-sm">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black mb-2">4.9</div>
                <div className="text-emerald-100 text-sm">Avg Rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RatingReviews;
