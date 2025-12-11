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
      <div className="h-[260px] sm:h-[320px] md:h-[380px] rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 flex items-center justify-center border border-emerald-100">
        <div className="text-center space-y-3">
          <div className="text-3xl mb-1">🔍</div>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Loading featured content...
          </p>
          <div className="w-40 h-1 mx-auto bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="h-[260px] sm:h-[320px] md:h-[380px] rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 flex items-center justify-center border border-red-100">
        <div className="text-center p-4">
          <div className="text-3xl mb-2">⚠️</div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            Unable to load slides
          </h3>
          <p className="text-gray-600 mb-3 text-sm">
            Please check your connection
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm rounded-lg font-medium hover:shadow-md transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <section
      aria-label="Featured Highlights"
      className="relative w-full overflow-hidden rounded-2xl shadow-xl"
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        slidesPerView={1}
        loop
        effect="fade"
        speed={700}
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
        className="h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px]"
      >
        {slides.map(
          ({ title, description, bgImage, actionText, actionLink }, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full flex items-center overflow-hidden">
                <img
                  src={bgImage}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-out"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="relative z-10 px-5 sm:px-8 md:px-10 max-w-3xl text-left ml-4 sm:ml-8">
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-emerald-300/40 text-emerald-200 text-xs font-medium">
                      Featured highlight
                    </span>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-snug">
                      {title}
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-xl">
                      {description}
                    </p>

                    {actionText && actionLink && (
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="pt-2"
                      >
                        <a
                          href={actionLink}
                          className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold rounded-lg shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 overflow-hidden"
                          aria-label={actionText}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          <span className="relative text-base">✨</span>
                          <span className="relative">{actionText}</span>
                          <span className="relative ml-1 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </a>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          )
        )}

        {/* Navigation buttons (smaller) */}
        <div
          ref={prevRef}
          className="absolute top-1/2 left-3 sm:left-4 -translate-y-1/2 z-20 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-105 hover:bg-black/55 transition-all duration-200"
        >
          <span className="text-white text-lg font-bold">←</span>
        </div>
        <div
          ref={nextRef}
          className="absolute top-1/2 right-3 sm:right-4 -translate-y-1/2 z-20 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-105 hover:bg-black/55 transition-all duration-200"
        >
          <span className="text-white text-lg font-bold">→</span>
        </div>
      </Swiper>

      {/* Custom pagination styles */}
      <style>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.35);
          opacity: 1;
          margin: 0 4px !important;
          transition: all 0.25s ease;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #10b981, #0d9488);
          transform: scale(1.25);
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }
      `}</style>
    </section>
  );
};

export default BannerSlider;
