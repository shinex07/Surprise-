import { useEffect, useState } from "react";
import "./styles.css";

export default function Particles() {
  const [particles, setParticles] = useState([]);
  const [sparks, setSparks] = useState([]);
  const [mouseX, setMouseX] = useState(0);

  // ✨ Generate particles
  useEffect(() => {
    const generated = Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      size: Math.random() * 6 + 3,       // 3px–9px
      duration: Math.random() * 5 + 7,   // 7s–12s
    }));

    setParticles(generated);
  }, []);

  // 🖱️ mouse parallax (horizontal only, smoother)
  useEffect(() => {
    const handleMove = (e) => {
      setMouseX(e.clientX);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // 💥 click sparks (FIXED)
  const handleClick = (e) => {
    const newBurst = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + Math.random(), // UNIQUE id (IMPORTANT FIX)
      x: e.clientX,
      y: e.clientY,
      angle: (Math.PI * 2 * i) / 16,
    }));

    setSparks((prev) => [...prev, ...newBurst]);

    // remove THIS burst only
    setTimeout(() => {
      setSparks((prev) =>
        prev.filter((s) => !newBurst.find((b) => b.id === s.id))
      );
    }, 700);
  };

  return (
    <div className="particles-layer" onClick={handleClick}>
      
      {/* ✨ FLOATING PARTICLES */}
      {particles.map((p) => {
        const offsetX = (mouseX - window.innerWidth / 2) * 0.015;

        return (
          <span
            key={p.id}
            className="particle"
            style={{
              left: `calc(${p.left}% + ${offsetX}px)`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        );
      })}

      {/* 💥 SPARK BURSTS */}
      {sparks.map((s) => (
        <span
          key={s.id}
          className="spark"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            transform: `translate(-50%, -50%) rotate(${s.angle}rad)`,
          }}
        />
      ))}
    </div>
  );
}