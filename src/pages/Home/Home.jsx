import React, { Suspense } from "react";
import { ClipLoader } from "react-spinners";
import BannerSlider from "./BannerSlider";
import LatestItemsSection from "./LatestItemsSection";
import StatsSection from "./StatsSection";
import HowItWorks from "./HowItWorks";
import FAQSection from "./FAQSection";
import RatingReviews from "./RatingReviews";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <BannerSlider />

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-40">
            <ClipLoader size={40} color="#3B82F6" />
          </div>
        }
      >
        <LatestItemsSection />
      </Suspense>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <StatsSection />
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <HowItWorks />
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Testimonials />
      </motion.section>

      {/* FAQs Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <FAQSection />
      </motion.section>

      {/* Rating & Reviews Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <RatingReviews />
      </motion.section>
    </div>
  );
};

export default Home;
