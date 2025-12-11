import React, { Suspense } from "react";
import { ClipLoader } from "react-spinners";
import BannerSlider from "../../components/home/BannerSlider";

// Lazy load sections
const LatestItemsSection = React.lazy(() =>
  import("../../components/home//LatestItemsSection")
);
const HowItWorks = React.lazy(() =>
  import("../../components/home//HowItWorks")
);
const FAQSection = React.lazy(() =>
  import("../../components/home//FAQSection")
);
const Testimonials = React.lazy(() =>
  import("../../components/home//Testimonials")
);
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Reusable motion section
const MotionSection = ({ children, delay = 0.3 }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="my-10"
  >
    {children}
  </motion.section>
);

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero / Banner */}
      <BannerSlider />

      {/* Latest Items */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-40">
            <ClipLoader size={40} color="#3B82F6" />
          </div>
        }
      >
        <LatestItemsSection />
      </Suspense>

      {/* How It Works */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-32">
            <ClipLoader size={35} color="#3B82F6" />
          </div>
        }
      >
        <MotionSection delay={0.4}>
          <HowItWorks />
        </MotionSection>
      </Suspense>

      {/* Testimonials */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-32">
            <ClipLoader size={35} color="#3B82F6" />
          </div>
        }
      >
        <MotionSection delay={0.45}>
          <Testimonials />
        </MotionSection>
      </Suspense>

      {/* FAQ */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-32">
            <ClipLoader size={35} color="#3B82F6" />
          </div>
        }
      >
        <MotionSection delay={0.5}>
          <FAQSection />
        </MotionSection>
      </Suspense>
    </div>
  );
};

export default Home;
