import { motion } from "framer-motion";
import "./styles.css";

export default function Intro({ next }) {
  return (
    <div className="container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="title"
      >
        A light entered my life...
      </motion.h1>

      <motion.button
        onClick={next}
        className="btn"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Journey ✨
      </motion.button>
    </div>
  );
}