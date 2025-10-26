import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
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
    error,
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
      <div className="h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center text-gray-500 text-lg">
        Loading slides...
      </div>
    );

  if (isError)
    return (
      <div className="h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center text-red-500 text-lg">
        Failed to load slides: {error.message}
      </div>
    );

  return (
    <section
      aria-label="Promotional Banner Slider"
      className="relative w-full overflow-hidden rounded-2xl shadow-xl"
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        slidesPerView={1}
        loop={true}
        effect="fade"
        speed={600}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {slides.map(
          ({ title, description, bgImage, actionText, actionLink }, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={bgImage}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />
                <div className="relative z-10 px-4 sm:px-6 md:px-10 max-w-3xl text-center text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg">
                      {title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-4 sm:mb-6 leading-relaxed drop-shadow-md">
                      {description}
                    </p>
                    {actionText && actionLink && (
                      <motion.a
                        href={actionLink}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-6 sm:px-7 py-2 sm:py-3 bg-white text-blue-600 rounded-full font-semibold shadow-md hover:shadow-lg transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        aria-label={actionText}
                      >
                        {actionText}
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          )
        )}

        {/* Navigation buttons */}
        <div
          ref={prevRef}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-20 w-10 h-10 bg-white/70 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition"
        >
          <span className="text-black text-xl font-bold">&#10094;</span>
        </div>
        <div
          ref={nextRef}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-20 w-10 h-10 bg-white/70 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition"
        >
          <span className="text-black text-xl font-bold">&#10095;</span>
        </div>
      </Swiper>
    </section>
  );
};

export default BannerSlider;
