import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./styles.css";

// ✅ BASE URL (works for both local + GitHub)
const BASE = import.meta.env.BASE_URL;

const memories = [
  {
    type: "image",
    src: `${BASE}img3.jpg`,
    text: "Somewhere in the sky… we made memories I’ll never forget",
    special: "sky",
    orientation: "landscape",
  },
  {
    type: "image",
    src: `${BASE}img1.jpg`,
    text: "This is you… chaotic, cute, and perfect (I mean the cat btw)",
    special: "dream",
    orientation: "portrait",
  },
  {
    type: "image",
    src: `${BASE}img4.jpg`,
    text: "Our first flight ✈️",
    special: "sun",
    orientation: "landscape",
  },
  {
    type: "image",
    src: `${BASE}img2.jpg`,
    text: "And then there’s this version of you… The one that lights up everything around it ✨",
    special: "sun",
    orientation: "portrait",
  },
  {
    type: "image",
    src: `${BASE}img5.jpg`,
    text: "Remember how peaceful we said this place was?",
    special: "sun",
    orientation: "landscape",
  },
  {
    type: "video",
    src: `${BASE}vid1.mp4`,
    text: "You don’t even realize how good you are 🎤",
    special: "spotlight",
  },
  {
    type: "image",
    src: `${BASE}img6.jpg`,
    text: "Our first Eden run",
    special: "sky",
    orientation: "landscape",
  },
  {
    type: "video",
    src: `${BASE}vid2.mp4`,
    text: "Kontya Gharachi??",
    special: "spotlight",
  },
  {
    type: "video",
    src: `${BASE}vid3.mp4`,
    text: "Seriously… this isn’t normal 😭",
    special: "spotlight",
  },
  {
    type: "image",
    src: `${BASE}img7.jpg`,
    text: "The first time we met",
    special: "sun",
    orientation: "landscape",
  },
  {
    type: "image",
    src: `${BASE}img8.jpg`,
    text: "Hope you remember the time you were high as hell😭",
    special: "sky",
    orientation: "landscape",
  },
  {
    type: "image",
    src: `${BASE}img9.jpg`,
    text: "Our Sky Christmas",
    special: "dream",
    orientation: "landscape",
  },
  {
    type: "video",
    src: `${BASE}vid4.mp4`,
    text: "A little dance session before my message ✨",
    special: "spotlight",
  },
];

export default function Journey({ next, onVideoChange }) {
  const [index, setIndex] = useState(0);

  const current = memories[index];

  // 🎵 notify App when media changes
  useEffect(() => {
    if (onVideoChange) {
      onVideoChange(current.type === "video");
    }
  }, [current, onVideoChange]);

  const handleNext = () => {
    if (index < memories.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      next();
    }
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={`container ${current.special}`}>
      
      {/* MEDIA */}
      <motion.div
        key={current.src}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {current.type === "image" ? (
          <img
            src={current.src}
            className={`media ${current.orientation}`}
          />
        ) : (
          <video
            src={current.src}
            className="video"
            controls
            autoPlay
            muted
          />
        )}
      </motion.div>

      {/* TEXT */}
      <motion.p
        key={current.text}
        className="text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {current.text}
      </motion.p>

      {/* 🎬 CINEMATIC BUTTONS */}
      <div className="nav-buttons">
        
        {/* 🌸 BACK */}
        <motion.button
          onClick={handleBack}
          className="btn dream-btn"
          disabled={index === 0}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 10px rgba(255, 150, 200, 0.4)",
              "0 0 25px rgba(255, 150, 200, 0.8)",
              "0 0 10px rgba(255, 150, 200, 0.4)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ← Back
        </motion.button>

        {/* ☀️ NEXT */}
        <motion.button
          onClick={handleNext}
          className="btn sun-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 10px rgba(255, 200, 100, 0.4)",
              "0 0 30px rgba(255, 200, 100, 0.9)",
              "0 0 10px rgba(255, 200, 100, 0.4)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {index === memories.length - 1 ? "Finish ✨" : "Next →"}
        </motion.button>

      </div>
    </div>
  );
}