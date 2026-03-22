import { motion } from "framer-motion";
import { useRef } from "react";
import "./styles.css";

export default function Intro({ next, onStart }) {
  const clickSound = useRef(null);

  const handleClick = () => {
    // 🔔 play soft chime
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }

    // 🎵 start background music
    if (onStart) onStart();

    // slight delay so chime feels natural
    setTimeout(() => {
      next();
    }, 400);
  };

  return (
    <div className="container">
      {/* 🔔 AUDIO FILE */}
      <audio ref={clickSound} src="/click.mp3" preload="auto" />

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="title"
      >
        A light entered my life...
      </motion.h1>

      {/* ✨ BUTTON WITH PULSE */}
      <motion.button
        onClick={handleClick}
        className="btn glow-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 10px rgba(255, 200, 100, 0.4)",
            "0 0 25px rgba(255, 200, 100, 0.8)",
            "0 0 10px rgba(255, 200, 100, 0.4)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Start Journey ✨
      </motion.button>
    </div>
  );
}