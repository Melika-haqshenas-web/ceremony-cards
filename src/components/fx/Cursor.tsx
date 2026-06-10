'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cursor aura. The real system cursor stays fully visible — this adds a
 * soft rose-gold glow and a spring-trailing ring *around* the pointer so
 * the mouse is easy to see and feels alive. The ring swells over
 * interactive elements (links, buttons, cards tagged data-cursor="view").
 * Pointer-fine devices only.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Two different springs so the glow and ring separate gracefully.
  const glowX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const glowY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 170, damping: 22, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 170, damping: 22, mass: 0.7 });

  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHovering(Boolean(t.closest('a, button, input, textarea, [data-cursor="view"]')));
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden md:block">
      {/* Soft glow halo */}
      <motion.div
        className="absolute rounded-full bg-rose-300 blur-2xl"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'screen',
        }}
        animate={{
          width: hovering ? 90 : 46,
          height: hovering ? 90 : 46,
          opacity: hovering ? 0.5 : 0.32,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      />
      {/* Trailing ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 54 : 30,
          height: hovering ? 54 : 30,
          borderColor: hovering
            ? 'rgba(231,178,165,0.95)'
            : 'rgba(243,239,232,0.45)',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      />
    </div>
  );
}
