import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";

const FooterCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      ref={ref}
      className="py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-black"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-3 sm:px-0 text-center">
        <motion.div
          className="flex items-center justify-center space-x-2 text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Heart className="h-5 w-5 text-red-500 animate-pulse" />
          <span className="font-medium">
            Made with love for book lovers worldwide
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FooterCTA;
