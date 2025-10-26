import React from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaRegStar,
  FaQuoteLeft,
  FaUserCircle,
  FaCheckCircle,
  FaAward,
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
          className="bg-yellow-400 h-2 rounded-full"
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
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

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
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl shadow-lg">
              <FaAward className="text-white text-3xl" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 sticky top-8">
              {/* Average Rating */}
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  {stats.averageRating}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(5, "text-2xl")}
                </div>
                <div className="text-gray-600 text-sm">
                  Based on {stats.totalReviews.toLocaleString()} reviews
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-3">
                {renderRatingBar(stats.fiveStar, 5)}
                {renderRatingBar(stats.fourStar, 4)}
                {renderRatingBar(stats.threeStar, 3)}
                {renderRatingBar(stats.twoStar, 2)}
                {renderRatingBar(stats.oneStar, 1)}
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
                  <FaCheckCircle />
                  <span>Verified Reviews</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <FaAward />
                  <span>Top Rated Service</span>
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
            className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {reviews.map((review, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full flex flex-col relative overflow-hidden">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-amber-200 group-hover:text-amber-300 transition-colors duration-300">
                    <FaQuoteLeft className="text-3xl" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(review.rating)}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-gray-700 mb-6 flex-grow text-sm sm:text-base leading-relaxed">
                    "{review.comment}"
                  </blockquote>

                  {/* User Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="flex-shrink-0">
                      {review.avatar ? (
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-amber-200"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                      ) : null}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-semibold text-lg hidden">
                        {review.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800 truncate">
                          {review.name}
                        </h4>
                        {review.verified && (
                          <FaCheckCircle className="text-green-500 text-sm flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-gray-600 text-sm truncate">
                        {review.role}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>{review.location}</span>
                        <span>•</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Helpful Count */}
                  <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                    <button className="text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200">
                      Helpful ({review.helpful})
                    </button>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      Verified User
                    </span>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Load More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <button className="px-8 py-4 border-2 border-amber-300 text-amber-700 font-bold rounded-2xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-200 hover:scale-105">
            Load More Reviews
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default RatingReviews;
