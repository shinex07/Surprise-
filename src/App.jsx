import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Intro from "./components/Intro";
import Journey from "./components/Journey";
import Final from "./components/Final";
import Loading from "./components/Loading";
import Particles from "./components/Particles";

function App() {
  const [stage, setStage] = useState(-1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const playerRef = useRef(null);

  // ⏳ loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(0);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // 🎵 pause/play based on video
  useEffect(() => {
    if (!playerRef.current) return;

    const action = isVideoPlaying ? "pauseVideo" : "playVideo";

    playerRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: action,
        args: [],
      }),
      "*"
    );
  }, [isVideoPlaying]);

  // 🔊 UNMUTE + FADE IN MUSIC (after user clicks Start)
  const handleStart = () => {
    if (!playerRef.current) return;

    // small cinematic delay
    setTimeout(() => {
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "unMute",
          args: [],
        }),
        "*"
      );

      // start low volume
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "setVolume",
          args: [20],
        }),
        "*"
      );

      // 🎚️ smooth volume ramp
      let vol = 20;
      const fade = setInterval(() => {
        vol += 5;

        playerRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "setVolume",
            args: [vol],
          }),
          "*"
        );

        if (vol >= 70) clearInterval(fade);
      }, 200);
    }, 300);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* ✨ GLOBAL PARTICLES */}
      <Particles />

      {/* 🎵 BACKGROUND MUSIC (FIXED AUTOPLAY) */}
      <iframe
        ref={playerRef}
        width="0"
        height="0"
        src="https://www.youtube.com/embed/UwADziEwCDE?autoplay=1&mute=1&loop=1&playlist=UwADziEwCDE&enablejsapi=1"
        title="background music"
        frameBorder="0"
        allow="autoplay"
        style={{ position: "absolute", opacity: 0 }}
      />

      {/* 🎬 SCREENS */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <AnimatePresence mode="wait">

          {/* LOADING */}
          {stage === -1 && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loading />
            </motion.div>
          )}

          {/* INTRO */}
          {stage === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Intro
                next={() => setStage(1)}
                onStart={handleStart} // 👈 IMPORTANT
              />
            </motion.div>
          )}

          {/* JOURNEY */}
          {stage === 1 && (
            <motion.div
              key="journey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Journey
                next={() => {
                  setIsVideoPlaying(false);
                  setStage(2);
                }}
                onVideoChange={(isVideo) => setIsVideoPlaying(isVideo)}
              />
            </motion.div>
          )}

          {/* FINAL */}
          {stage === 2 && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Final />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;