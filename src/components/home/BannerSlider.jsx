import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { axiosInstance } from "../../api/api";

const BannerSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const {
    data: slides = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["slides"],
    queryFn: async () => {
      const res = await axiosInstance.get("/highlights");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div className="h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 flex items-center justify-center border-2 border-emerald-100">
        <div className="text-center space-y-4">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-gray-600 font-medium">
            Loading featured content...
          </p>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl bg-gradient-to-r from-red-50 to-orange-50 flex items-center justify-center border-2 border-red-100">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Unable to load slides
          </h3>
          <p className="text-gray-600 mb-4">Please check your connection</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <section
      aria-label="Featured Highlights"
      className="relative w-full overflow-hidden rounded-3xl shadow-2xl"
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        slidesPerView={1}
        loop={true}
        effect="fade"
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]"
      >
        {slides.map(
          ({ title, description, bgImage, actionText, actionLink }, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={bgImage}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 ease-out group-hover:scale-110"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16 max-w-4xl text-left ml-8 sm:ml-12">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div className="inline-block">
                      <span className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-xl border border-emerald-300/30 text-emerald-300 text-sm font-medium">
                        Featured Highlight
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                      {title}
                    </h2>

                    <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl drop-shadow-lg">
                      {description}
                    </p>

                    {actionText && actionLink && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="pt-4"
                      >
                        <a
                          href={actionLink}
                          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 overflow-hidden"
                          aria-label={actionText}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative text-lg">✨</span>
                          <span className="relative">{actionText}</span>
                          <span className="relative ml-2 group-hover:translate-x-2 transition-transform">
                            →
                          </span>
                        </a>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Decorative corner element */}
                <div className="absolute bottom-8 right-8 opacity-20">
                  <div className="text-8xl">📍</div>
                </div>
              </div>
            </SwiperSlide>
          )
        )}

        {/* Navigation buttons */}
        <div
          ref={prevRef}
          className="absolute top-1/2 left-6 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-emerald-500/80 to-teal-500/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
        >
          <span className="text-white text-2xl font-bold group-hover:-translate-x-1 transition-transform">
            ←
          </span>
        </div>
        <div
          ref={nextRef}
          className="absolute top-1/2 right-6 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-emerald-500/80 to-teal-500/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
        >
          <span className="text-white text-2xl font-bold group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </Swiper>

      {/* Custom pagination styles */}
      <style>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #10b981, #0d9488);
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </section>
  );
};

export default BannerSlider;
