import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./styles.css";

export default function Final({ onEnter }) {
  const fullText = `I don't think I say this enough or say it at all, but you genuinely mean a lot to me. You've been there through everything... the highs that felt unreal and the lows that felt impossible, and somehow you always knew how to make things a little lighter. Having someone like you in my life isn't something I take for granted.

You're insanely talented in ways you probably don’t even fully realize. The way you sing? It's actually crazy how good you are, it feels effortless, but it hits every time. And your drawings… there’s something so uniquely YOU about them, they're honestly beautiful. You’ve got this quiet kind of creativity that just stands out without trying.

And then there are all the little things that might seem small to you but meant a lot to me — helping me find winged lights and the maps, just being there in those moments. Not just the game, but in my life too. Those are the memories that stick, you know? The ones that feel simple but end up meaning everything. It was never the game, it was the person I was spending that time with.

I'm really grateful for you. Not just for what you do, but for who you are.

I know life hasn't always been fair to you, but you've handled it in ways most people couldn't. And if you ever start thinking you're broken or "not normal" again… yeah, I’m going to beat the everlivingshit out of you — but seriously, talk to me when things get bad. I mean that. You don't have to carry everything alone.

Once again, Happy Birthday.

I hope this year brings you everything you deserve and more ✨

- The dumbass, Saksham`;

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  // 🎵 resume music
  useEffect(() => {
    onEnter && onEnter();
  }, []);

  // ✍️ BETTER typing effect (no spacing bugs)
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 18);

      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [index]);

  return (
    <div className="container">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="title"
      >
        Happy Birthday Kanish 💙
      </motion.h1>

      <p className="text" style={{ whiteSpace: "pre-line" }}>
        {displayedText}
        {!done && <span className="cursor">|</span>}
      </p>

      <motion.button
        className="btn glow-btn"
        onClick={() => window.location.reload()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Play Again ✨
      </motion.button>
    </div>
  );
}