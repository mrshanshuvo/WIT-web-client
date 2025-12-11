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

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % testimonials.length),
      5000
    );
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
    setTimeout(() => setIsAutoPlaying(true), 8000);
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

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-yellow-400">
        {index < rating ? <FaStar /> : <FaRegStar />}
      </span>
    ));

  const visibleTestimonials = getVisibleTestimonials();

  const cardVariants = {
    left: {
      x: "-40%",
      scale: 0.9,
      opacity: 0.5,
      filter: "blur(1px)",
      zIndex: 10,
    },
    center: { x: "0%", scale: 1, opacity: 1, filter: "blur(0px)", zIndex: 20 },
    right: {
      x: "40%",
      scale: 0.9,
      opacity: 0.5,
      filter: "blur(1px)",
      zIndex: 10,
    },
  };

  return (
    <div className="relative py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      {/* Single soft background blob */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-16 right-10 w-64 h-64 bg-emerald-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-3 border border-emerald-200">
            <FaHeart className="text-emerald-600 text-base" />
            <span className="font-semibold text-emerald-800 text-sm">
              Success Stories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent mb-2">
            Heartwarming Reunions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Real people, real stories of items making their way back home.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative mb-8">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-md border border-emerald-200 flex items-center justify-center hover:bg-emerald-50 hover:scale-105 transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-emerald-600 text-base" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-md border border-emerald-200 flex items-center justify-center hover:bg-emerald-50 hover:scale-105 transition-all duration-200"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-emerald-600 text-base" />
          </button>

          {/* Cards Container */}
          <div
            ref={containerRef}
            className="flex items-center justify-center px-10 sm:px-16 py-6 relative h-[320px] sm:h-[360px]"
          >
            {visibleTestimonials.map((testimonial) => {
              const isCenter = testimonial.position === "center";
              const isLeft = testimonial.position === "left";

              return (
                <motion.div
                  key={`${testimonial.position}-${testimonial.index}`}
                  variants={cardVariants}
                  initial={testimonial.position}
                  animate={testimonial.position}
                  className={`absolute transform -translate-x-1/2 ${
                    isCenter
                      ? "w-full max-w-xl z-20"
                      : "w-full max-w-md z-10 hidden md:block"
                  }`}
                  style={{
                    left: isLeft ? "30%" : isCenter ? "50%" : "70%",
                    cursor: isCenter ? "default" : "pointer",
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      isLeft ? handlePrev() : handleNext();
                    }
                  }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-emerald-100 p-5 sm:p-6 relative overflow-hidden">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 text-emerald-50">
                      <FaQuoteLeft className="text-3xl" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(testimonial.rating)}
                      <span className="text-[11px] text-gray-500 ml-1">
                        5.0
                      </span>
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed line-clamp-4">
                      “{testimonial.story}”
                    </blockquote>

                    {/* Item Badge */}
                    <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 mb-4">
                      <div className="p-1.5 bg-emerald-100 rounded-md">
                        <FaHeart className="text-emerald-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-gray-700">
                          Recovered item
                        </p>
                        <p className="text-emerald-600 font-semibold text-xs sm:text-sm truncate max-w-[180px]">
                          {testimonial.item}
                        </p>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 pt-3 border-t border-emerald-100">
                      <div className="flex-shrink-0 relative">
                        <div className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold w-11 h-11 text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white w-5 h-5">
                          <FaStar className="text-white text-[10px]" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 text-xs truncate">
                          {testimonial.role}
                        </p>
                        <div className="flex items-center gap-1.5 text-gray-500 mt-1 text-[11px]">
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

          {/* Dots + small rating summary */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <div className="flex justify-center gap-1.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-emerald-600 w-6"
                      : "bg-emerald-200 hover:bg-emerald-300 w-2"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-500">
              <FaAward className="text-amber-500" />
              <span>
                Rated <span className="font-semibold text-gray-800">4.9/5</span>{" "}
                by 2,847 users
              </span>
            </div>
          </div>
        </div>

        {/* CTA Section (compact) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-8"
        >
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            Share Your Story
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-5 max-w-xl mx-auto">
            Tell others how WhereIsIt helped you, and inspire more successful
            reunions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button className="group relative px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-[1.03] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="relative flex items-center gap-2">
                <FaUserCircle className="text-sm" />
                Share your story
              </span>
            </button>

            <button className="group px-7 py-3 bg-white text-gray-800 text-sm font-bold rounded-xl border border-emerald-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200">
              <span className="flex items-center gap-2">
                <FaUsers className="text-sm" />
                Browse more stories
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
