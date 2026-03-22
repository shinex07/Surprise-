import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./styles.css";

export default function Final({ onEnter }) {
  const fullText = `I don’t think I say this enough or say it at all, but you genuinely mean a lot to me. You’ve been there through everything.. the highs that felt unreal and the lows that felt impossible and somehow you always knew how to make things a little lighter. Having someone like you in my life isn’t something I take for granted.

You’re insanely talented in ways you probably don’t even fully realize. The way you sing? It’s actually crazy how good you are, like it just feels effortless, but it hits every time. And your drawings… there’s something so uniquely YOU about them, they’re honestly beautiful. You’ve got this quiet kind of creativity that just stands out without trying.

And then there’s all the little things that probably seem small to you but meant a lot to me like helping me find winged lights, showing me the maps, just being there in those moments, not just the game but in my life itself. Those are the memories that stick, you know? The ones that feel simple but end up meaning everything. It was never the game but the person with whom I spent time with.

I’m really grateful for you. Not just for what you do, but for who you are. Once again, Happy Birthday

I hope this year brings you everything you deserve and more ✨

- The dumbass, Saksham`;

  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  // 🎵 resume music
  useEffect(() => {
    if (onEnter) onEnter();
  }, []);

  // ✍️ typing effect (FIXED)
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setDone(true); // ✅ stop cursor later
      }
    }, 18);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="title"
      >
        Happy Birthday Kanish 💙
      </motion.h1>

      <p className="text" style={{ whiteSpace: "pre-line" }}>
        {displayedText}
        {!done && <span className="cursor">|</span>}
      </p>

      <button
        className="btn glow-btn"
        onClick={() => window.location.reload()}
      >
        Play Again ✨
      </button>
    </div>
  );
}