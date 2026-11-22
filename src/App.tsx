import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Treatments from "./components/Treatments";
import DentalExperience from "./components/DentalExperience";
import SmileGallery from "./components/SmileGallery";
import Doctors from "./components/Doctors";
import ClinicTour from "./components/ClinicTour";
import Technology from "./components/Technology";
import Testimonials from "./components/Testimonials";
import Booking from "./components/Booking";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // The intro loader covers the page anyway; mount the rest of the sections
  // once the browser is idle so the first paint only builds the hero.
  const [mountRest, setMountRest] = useState(false);
  useEffect(() => {
    const enable = () => setMountRest(true);
    if ("requestIdleCallback" in window) window.requestIdleCallback(enable, { timeout: 1200 });
    else window.setTimeout(enable, 600);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-ivory text-ink">
      <Loader />
      <m.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold via-gold-soft to-gold"
        style={{ scaleX: progress }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        {mountRest && (
          <>
            <About />
            <Features />
            <Treatments />
            <DentalExperience />
            <SmileGallery />
            <Doctors />
            <ClinicTour />
            <Technology />
            <Testimonials />
            <Booking />
            <FAQ />
            <FinalCTA />
          </>
        )}
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
