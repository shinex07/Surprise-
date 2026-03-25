import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const BASE = import.meta.env.BASE_URL;

const memories = [
  { type: "image", src: `${BASE}img3.jpg`, text: "Somewhere in the sky… we made memories I’ll never forget", special: "sky", orientation: "landscape" },
  { type: "image", src: `${BASE}img1.jpg`, text: "This is you… chaotic, cute, and perfect (I mean the cat btw)", special: "dream", orientation: "portrait" },
  { type: "image", src: `${BASE}img4.jpg`, text: "Our first flight ✈️", special: "sun", orientation: "landscape" },
  { type: "image", src: `${BASE}img2.jpg`, text: "And then there’s this version of you… The one that lights up everything around it ✨", special: "sun", orientation: "portrait" },
  { type: "image", src: `${BASE}img5.jpg`, text: "Remember how peaceful we said this place was?", special: "sun", orientation: "landscape" },
  { type: "video", src: `${BASE}vid1.mp4`, text: "You don’t even realize how good you are 🎤", special: "spotlight" },
  { type: "image", src: `${BASE}img6.jpg`, text: "Our first Eden run", special: "sky", orientation: "landscape" },
  { type: "image", src: `${BASE}img11.jpg`, text: "This just feels warm… like one of those memories you’d want to keep.", special: "dream", orientation: "portrait" },
  { type: "video", src: `${BASE}vid2.mp4`, text: "Kontya Gharachi??", special: "spotlight" },
  { type: "image", src: `${BASE}img10.jpg`, text: "She’ll sit there quietly and still somehow outshine everything.", special: "dream", orientation: "portrait" },
  { type: "video", src: `${BASE}vid3.mp4`, text: "Seriously… this isn’t normal 😭", special: "spotlight" },
  { type: "image", src: `${BASE}img7.jpg`, text: "The first time we met", special: "sun", orientation: "landscape" },
  { type: "image", src: `${BASE}img8.jpg`, text: "Hope you remember the time you were high as hell😭", special: "sky", orientation: "landscape" },
  { type: "image", src: `${BASE}img9.jpg`, text: "Our Sky Christmas", special: "dream", orientation: "landscape" },
  { type: "image", src: `${BASE}img12.jpg`, text: "This is probably my favorite kind of you… just happy.", special: "dream", orientation: "portrait" },
  { type: "image", src: `${BASE}img13.jpg`, text: "And our Christmas together.", special: "dream", orientation: "portrait" },
  { type: "video", src: `${BASE}vid4.mp4`, text: "A little dance session before my message ✨", special: "spotlight" },
];

export default function Journey({ next, onVideoChange }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);
  const current = memories[index];

  // 🎵 control music
  useEffect(() => {
    if (onVideoChange) {
      onVideoChange(current.type === "video");
    }
  }, [current, onVideoChange]);

  // ⏳ progress logic
  useEffect(() => {
    setProgress(0);

    // ❌ DO NOT AUTO PROGRESS FOR VIDEOS
    if (current.type === "video") return;

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          handleNext();
          return 100;
        }
        return p + 0.5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [index]);

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

      {/* 🔥 PROGRESS BAR */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: current.type === "video" ? "100%" : `${progress}%`
          }}
        />
      </div>

      {/* 🎬 MEDIA */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.src}
          className="media-wrapper"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -80) handleNext();
            if (info.offset.x > 80) handleBack();
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
        >
          {current.type === "image" ? (
            <img
              src={current.src}
              className={`media ${current.orientation}`}
              alt=""
              draggable="false"
            />
          ) : (
            <video
              ref={videoRef}
              src={current.src}
              className="video"
              controls
              autoPlay
              muted
              onEnded={handleNext} // ✅ KEY FIX
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ✨ TEXT */}
      <motion.p
        key={current.text}
        className="text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {current.text}
      </motion.p>

      {/* 🎮 NAV */}
      <div className="nav-buttons">

        <button
          onClick={handleBack}
          className="btn dream-btn"
          disabled={index === 0}
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          className="btn sun-btn"
        >
          {index === memories.length - 1 ? "Finish ✨" : "Next →"}
        </button>

      </div>
    </div>
  );
}