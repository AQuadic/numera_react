import { AnimatePresence, motion } from "framer-motion";
import { useOutlet, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const outlet = useOutlet();
  const location = useLocation();

  useEffect(() => {
    // Use instant scroll for accessibility/UX consistency — change to 'smooth' if preferred
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);
  return (
    <div>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="min-h-[80vh]"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;
