import { useEffect, useState } from "react";
import "./styles.css";

export default function Loading() {
  const [particles, setParticles] = useState([]);
  const [sparks, setSparks] = useState([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // generate particles
  useEffect(() => {
    const generated = Array.from({ length: 40 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 6 + 6,
    }));

    setParticles(generated);
  }, []);

  // mouse movement tracking
  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // sparkle burst on click
  const handleClick = (e) => {
    const burst = Array.from({ length: 12 }).map((_, i) => ({
      id: Math.random(),
      x: e.clientX,
      y: e.clientY,
      angle: (Math.PI * 2 * i) / 12,
    }));

    setSparks((prev) => [...prev, ...burst]);

    // remove sparks after animation
    setTimeout(() => {
      setSparks((prev) => prev.slice(burst.length));
    }, 700);
  };

  return (
    <div className="loading-container" onClick={handleClick}>
      {/* ✨ FLOATING PARTICLES */}
      {particles.map((p, i) => {
        const offsetX = (mouse.x - window.innerWidth / 2) * 0.01;

        return (
          <span
            key={i}
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

      {/* ✨ SPARK BURSTS */}
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

      {/* TEXT */}
      <h1 className="loading-text">Entering your world...</h1>
    </div>
  );
}