
import { AnimatePresence, motion } from "framer-motion";
import { useOutlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    const outlet = useOutlet();
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
