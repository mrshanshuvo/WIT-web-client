import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaRegStar,
  FaUserCircle,
  FaHeart,
  FaMapMarkerAlt,
  FaUsers,
  FaAward,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import testimonials from "./testimonials.json";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getVisibleTestimonials = () => {
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const next = (currentIndex + 1) % testimonials.length;
    return [
      { ...testimonials[prev], position: "left", index: prev },
      {
        ...testimonials[currentIndex],
        position: "center",
        index: currentIndex,
      },
      { ...testimonials[next], position: "right", index: next },
    ];
  };

  const pauseThenResume = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    pauseThenResume();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    pauseThenResume();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    pauseThenResume();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-yellow-400">
        {index < rating ? <FaStar /> : <FaRegStar />}
      </span>
    ));
  };

  const visibleTestimonials = getVisibleTestimonials();

  const cardVariants = {
    left: {
      x: "-50%",
      scale: 0.9,
      opacity: 0.5,
      filter: "blur(1px)",
      zIndex: 10,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
    center: {
      x: "0%",
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      zIndex: 20,
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 20,
      },
    },
    right: {
      x: "50%",
      scale: 0.9,
      opacity: 0.5,
      filter: "blur(1px)",
      zIndex: 10,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
  };

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-80 h-80 bg-emerald-200 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-200 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300 rounded-full blur-3xl animate-pulse delay-500" />
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

        {/* Carousel Container */}
        <div className="relative mb-16">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-2xl border-2 border-emerald-200 flex items-center justify-center hover:bg-emerald-50 hover:scale-110 transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-emerald-600 text-xl group-hover:text-emerald-700" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-2xl border-2 border-emerald-200 flex items-center justify-center hover:bg-emerald-50 hover:scale-110 transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-emerald-600 text-xl group-hover:text-emerald-700" />
          </button>

          {/* Cards Container */}
          <div
            ref={containerRef}
            className="flex items-center justify-center gap-4 px-16 sm:px-20 py-8 min-h-[500px]"
          >
            {visibleTestimonials.map((testimonial) => {
              const isCenter = testimonial.position === "center";
              const isLeft = testimonial.position === "left";
              // const isRight = testimonial.position === "right";

              return (
                <motion.div
                  key={`${testimonial.position}-${testimonial.index}`}
                  variants={cardVariants}
                  initial={testimonial.position}
                  animate={testimonial.position}
                  className={`absolute transform -translate-x-1/2 ${
                    isCenter
                      ? "w-full max-w-2xl z-20"
                      : "w-full max-w-xl z-10 hidden lg:block"
                  }`}
                  style={{
                    left: isLeft ? "25%" : isCenter ? "50%" : "75%",
                    cursor: isCenter ? "default" : "pointer",
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      isLeft ? handlePrev() : handleNext();
                    }
                  }}
                >
                  <div
                    className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-emerald-100 p-6 sm:p-8 relative overflow-hidden transition-all duration-300 ${
                      isCenter ? "hover:shadow-2xl" : "hover:opacity-80"
                    }`}
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl transition-opacity duration-300 ${
                        isCenter ? "opacity-5" : "opacity-0"
                      }`}
                    />

                    {/* Quote Icon */}
                    <div
                      className={`absolute top-6 right-6 transition-all duration-300 ${
                        isCenter ? "text-emerald-100" : "text-emerald-50"
                      }`}
                    >
                      <FaQuoteLeft className="text-4xl sm:text-5xl" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                      <span className="text-xs text-gray-500 ml-2">5.0</span>
                    </div>

                    {/* Testimonial Text */}
                    <blockquote
                      className={`text-gray-700 mb-6 relative z-10 leading-relaxed transition-all duration-300 ${
                        isCenter
                          ? "text-base sm:text-lg line-clamp-none"
                          : "text-sm line-clamp-4"
                      }`}
                    >
                      "{testimonial.story}"
                    </blockquote>

                    {/* Item Badge */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 mb-6">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        {/* Simple icon since JSON has no per-item icon */}
                        <FaHeart className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700">
                          Recovered Item
                        </p>
                        <p
                          className={`text-emerald-600 font-bold transition-all duration-300 ${
                            isCenter ? "text-sm sm:text-base" : "text-xs"
                          }`}
                        >
                          {testimonial.item}
                        </p>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-emerald-100">
                      <div className="flex-shrink-0 relative">
                        <div
                          className={`rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold transition-all duration-300 ${
                            isCenter ? "w-14 h-14 text-xl" : "w-12 h-12 text-lg"
                          }`}
                        >
                          {testimonial.name.charAt(0)}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white transition-all duration-300 ${
                            isCenter ? "w-6 h-6" : "w-5 h-5"
                          }`}
                        >
                          <FaStar className="text-white text-xs" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-bold text-gray-900 truncate transition-all duration-300 ${
                            isCenter ? "text-base sm:text-lg" : "text-sm"
                          }`}
                        >
                          {testimonial.name}
                        </h4>
                        <p
                          className={`text-gray-600 truncate transition-all duration-300 ${
                            isCenter ? "text-sm" : "text-xs"
                          }`}
                        >
                          {testimonial.role}
                        </p>
                        <div
                          className={`flex items-center gap-2 text-gray-500 mt-1 transition-all duration-300 ${
                            isCenter ? "text-xs" : "text-xs opacity-70"
                          }`}
                        >
                          <FaMapMarkerAlt className="text-emerald-500" />
                          <span className="truncate">
                            {testimonial.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-emerald-600 w-8"
                    : "bg-emerald-200 hover:bg-emerald-300 w-2"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl p-10 text-white overflow-hidden"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
              <FaAward className="text-white" />
              <span className="font-bold">Overall Rating</span>
            </div>
            <div className="text-5xl font-black mb-2">
              4.9<span className="text-2xl text-white/80">/5</span>
            </div>
            <div className="flex justify-center mb-2 text-2xl gap-1">
              {renderStars(5)}
            </div>
            <div className="text-white/90">Based on 2,847 verified reviews</div>
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
    </div>
  );
};

export default Testimonials;
