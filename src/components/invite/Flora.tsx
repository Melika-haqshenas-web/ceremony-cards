/**
 * Flora — a small library of hand-built, watercolour-flavoured SVG botanicals
 * used to recreate the pressed-wildflower invitation. Everything is original
 * vector art (no external assets), tinted with soft radial gradients and a
 * faint blur so it reads as loose watercolour rather than flat clip-art.
 *
 * Compositions:
 *   <ScatterField/>  — the dense scattered-wildflower wallpaper
 *   <OvalWreath/>    — an elliptical wreath framing the cover names
 *   <MeadowStrip/>   — a row of tall stems standing along a bottom edge
 *   <CornerSpray/>   — a botanical flourish anchored to one corner
 */

import type { CSSProperties, ReactNode } from 'react';

/* Shared gradient + filter defs. Mount once per SVG via <FloraDefs/>. */
export function FloraDefs() {
  return (
    <defs>
      <radialGradient id="petalPink" cx="40%" cy="35%" r="75%">
        <stop offset="0%" stopColor="#fff0f4" />
        <stop offset="55%" stopColor="#f3a8c0" />
        <stop offset="100%" stopColor="#d8728f" />
      </radialGradient>
      <radialGradient id="petalCoral" cx="40%" cy="35%" r="75%">
        <stop offset="0%" stopColor="#fff2ec" />
        <stop offset="55%" stopColor="#f08a78" />
        <stop offset="100%" stopColor="#d65f54" />
      </radialGradient>
      <radialGradient id="petalLilac" cx="40%" cy="35%" r="75%">
        <stop offset="0%" stopColor="#f6f0ff" />
        <stop offset="60%" stopColor="#c3a9e8" />
        <stop offset="100%" stopColor="#9a78c9" />
      </radialGradient>
      <radialGradient id="petalGold" cx="45%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#fff8df" />
        <stop offset="60%" stopColor="#f3cf72" />
        <stop offset="100%" stopColor="#d9a73f" />
      </radialGradient>
      <radialGradient id="leafGreen" cx="35%" cy="25%" r="85%">
        <stop offset="0%" stopColor="#cfe6bd" />
        <stop offset="60%" stopColor="#84b072" />
        <stop offset="100%" stopColor="#4f7b4a" />
      </radialGradient>
      <radialGradient id="seedCenter" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#fce6a6" />
        <stop offset="100%" stopColor="#c98a3c" />
      </radialGradient>
      <filter id="wc" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="0.35" />
      </filter>
    </defs>
  );
}

type MotifProps = { className?: string; style?: CSSProperties };

/* ---- Individual botanicals (drawn in a ~100×100 viewBox, origin centred) ---- */

/** Five-petal daisy / cosmos bloom. */
function Bloom({ fill }: { fill: string }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <g filter="url(#wc)">
      {petals.map((a) => (
        <ellipse
          key={a}
          cx="50"
          cy="26"
          rx="11"
          ry="22"
          fill={fill}
          transform={`rotate(${a} 50 50)`}
          opacity={0.92}
        />
      ))}
      <circle cx="50" cy="50" r="9" fill="url(#seedCenter)" />
    </g>
  );
}

/** A budding sprig — small stem with two leaves and a tiny bud. */
function Sprig({ fill }: { fill: string }) {
  return (
    <g filter="url(#wc)">
      <path d="M50 92 Q50 55 50 18" stroke="#6f9a5e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M50 64 Q30 56 22 38 Q44 44 50 64Z" fill="url(#leafGreen)" />
      <path d="M50 74 Q70 66 78 48 Q56 54 50 74Z" fill="url(#leafGreen)" />
      <ellipse cx="50" cy="16" rx="8" ry="13" fill={fill} />
      <circle cx="50" cy="16" r="3.5" fill="url(#seedCenter)" />
    </g>
  );
}

/** A tall lily-like flower with sweeping petals (the accent bloom). */
function Lily() {
  return (
    <g filter="url(#wc)">
      <path d="M50 90 Q50 60 50 30" stroke="#6f9a5e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {[-32, 0, 32].map((a) => (
        <path
          key={a}
          d="M50 30 Q40 6 50 -4 Q60 6 50 30Z"
          fill="url(#petalCoral)"
          transform={`rotate(${a} 50 30)`}
        />
      ))}
      {[-16, 16].map((a) => (
        <path
          key={a}
          d="M50 30 Q42 14 50 6 Q58 14 50 30Z"
          fill="url(#petalPink)"
          transform={`rotate(${a} 50 30)`}
          opacity={0.95}
        />
      ))}
      <circle cx="50" cy="28" r="4" fill="url(#seedCenter)" />
    </g>
  );
}

/** A simple fern frond. */
function Fern() {
  const leaflets = Array.from({ length: 7 }, (_, i) => 20 + i * 9);
  return (
    <g filter="url(#wc)" stroke="#5d8a4f" strokeLinecap="round">
      <path d="M50 92 Q48 50 52 12" strokeWidth="2" fill="none" />
      {leaflets.map((y, i) => {
        const len = 22 - i * 2;
        return (
          <g key={y}>
            <path d={`M50 ${y} q-${len} -3 -${len + 2} 5`} strokeWidth="1.5" fill="none" />
            <path d={`M50 ${y} q${len} -3 ${len + 2} 5`} strokeWidth="1.5" fill="none" />
          </g>
        );
      })}
    </g>
  );
}

/** A delicate butterfly. */
export function Butterfly({ className, style }: MotifProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <FloraDefs />
      <g filter="url(#wc)">
        <path d="M50 50 Q22 18 14 40 Q12 58 50 54Z" fill="url(#petalCoral)" opacity={0.9} />
        <path d="M50 50 Q78 18 86 40 Q88 58 50 54Z" fill="url(#petalCoral)" opacity={0.9} />
        <path d="M50 52 Q30 70 24 84 Q44 82 50 60Z" fill="url(#petalPink)" opacity={0.9} />
        <path d="M50 52 Q70 70 76 84 Q56 82 50 60Z" fill="url(#petalPink)" opacity={0.9} />
        <ellipse cx="50" cy="52" rx="2.6" ry="14" fill="#5a3b3f" />
        <path d="M50 40 Q46 30 42 27 M50 40 Q54 30 58 27" stroke="#5a3b3f" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

const MOTIFS = { bloomPink: 'url(#petalPink)', bloomLilac: 'url(#petalLilac)', bloomGold: 'url(#petalGold)' } as const;

/** A single stand-alone motif you can drop anywhere. */
export function Motif({
  kind,
  className,
  style,
}: MotifProps & { kind: 'bloom-pink' | 'bloom-lilac' | 'bloom-gold' | 'sprig' | 'lily' | 'fern' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <FloraDefs />
      {kind === 'bloom-pink' && <Bloom fill={MOTIFS.bloomPink} />}
      {kind === 'bloom-lilac' && <Bloom fill={MOTIFS.bloomLilac} />}
      {kind === 'bloom-gold' && <Bloom fill={MOTIFS.bloomGold} />}
      {kind === 'sprig' && <Sprig fill={MOTIFS.bloomPink} />}
      {kind === 'lily' && <Lily />}
      {kind === 'fern' && <Fern />}
    </svg>
  );
}

/* ---- Deterministic scatter (seeded, so SSR and client agree) ---- */

type Scatter = { x: number; y: number; s: number; r: number; k: number };

// A fixed, hand-tuned constellation: percentages across the field, scale,
// rotation, and motif index. Kept static to avoid hydration mismatches.
const FIELD: Scatter[] = [
  { x: 6, y: 8, s: 1.1, r: -18, k: 0 }, { x: 24, y: 4, s: 0.7, r: 22, k: 3 },
  { x: 42, y: 10, s: 0.9, r: 8, k: 1 }, { x: 63, y: 5, s: 0.6, r: -12, k: 5 },
  { x: 82, y: 9, s: 1.0, r: 30, k: 2 }, { x: 93, y: 3, s: 0.6, r: -8, k: 4 },
  { x: 12, y: 24, s: 0.8, r: 14, k: 4 }, { x: 33, y: 22, s: 0.6, r: -24, k: 0 },
  { x: 54, y: 26, s: 1.0, r: 10, k: 2 }, { x: 74, y: 21, s: 0.7, r: -16, k: 3 },
  { x: 90, y: 27, s: 0.9, r: 20, k: 1 }, { x: 4, y: 40, s: 0.7, r: -10, k: 5 },
  { x: 22, y: 44, s: 1.1, r: 16, k: 1 }, { x: 45, y: 41, s: 0.6, r: -20, k: 4 },
  { x: 66, y: 45, s: 0.9, r: 24, k: 0 }, { x: 85, y: 42, s: 0.7, r: -14, k: 3 },
  { x: 10, y: 60, s: 0.9, r: 12, k: 2 }, { x: 30, y: 63, s: 0.7, r: -18, k: 5 },
  { x: 52, y: 59, s: 1.0, r: 8, k: 1 }, { x: 72, y: 64, s: 0.6, r: 26, k: 4 },
  { x: 91, y: 61, s: 0.8, r: -22, k: 0 }, { x: 6, y: 78, s: 0.7, r: 18, k: 3 },
  { x: 26, y: 82, s: 1.0, r: -12, k: 2 }, { x: 47, y: 79, s: 0.6, r: 20, k: 5 },
  { x: 68, y: 83, s: 0.9, r: -16, k: 1 }, { x: 88, y: 80, s: 0.7, r: 14, k: 4 },
  { x: 16, y: 93, s: 0.8, r: -20, k: 0 }, { x: 38, y: 95, s: 0.6, r: 10, k: 2 },
  { x: 60, y: 92, s: 1.0, r: -8, k: 3 }, { x: 80, y: 96, s: 0.7, r: 22, k: 5 },
];

const KINDS = ['bloom-pink', 'bloom-lilac', 'bloom-gold', 'sprig', 'lily', 'fern'] as const;

/** The dense, all-over pressed-wildflower wallpaper. */
export function ScatterField({ className, opacity = 1 }: { className?: string; opacity?: number }) {
  return (
    <div className={className} aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity }}>
      {FIELD.map((f, i) => (
        <Motif
          key={i}
          kind={KINDS[f.k]}
          style={{
            position: 'absolute',
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.s * 64}px`,
            height: `${f.s * 64}px`,
            transform: `translate(-50%,-50%) rotate(${f.r}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ---- Oval wreath framing the cover names ---- */

const WREATH = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  return { a, k: i % KINDS.length };
});

export function OvalWreath({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0 }}>
        {WREATH.map((w, i) => {
          // Ellipse placement (percentages from centre).
          const x = 50 + Math.cos(w.a) * 44;
          const y = 50 + Math.sin(w.a) * 47;
          const scale = i % 3 === 0 ? 0.9 : 0.6;
          return (
            <Motif
              key={i}
              kind={KINDS[w.k]}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: `${scale * 70}px`,
                height: `${scale * 70}px`,
                transform: `translate(-50%,-50%) rotate(${(w.a * 180) / Math.PI + 90}deg)`,
              }}
            />
          );
        })}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

/* ---- A meadow strip of tall stems standing along a bottom edge ---- */

const MEADOW = [
  { x: 4, h: 88, k: 3 }, { x: 11, h: 64, k: 4 }, { x: 18, h: 96, k: 1 },
  { x: 25, h: 72, k: 0 }, { x: 33, h: 100, k: 4 }, { x: 40, h: 66, k: 3 },
  { x: 48, h: 90, k: 1 }, { x: 56, h: 70, k: 4 }, { x: 63, h: 98, k: 5 },
  { x: 70, h: 64, k: 0 }, { x: 78, h: 92, k: 4 }, { x: 85, h: 72, k: 1 },
  { x: 92, h: 86, k: 3 }, { x: 97, h: 60, k: 4 },
];

export function MeadowStrip({ className, height = 150 }: { className?: string; height?: number }) {
  return (
    <div
      className={className}
      aria-hidden
      style={{ position: 'relative', width: '100%', height }}
    >
      {MEADOW.map((m, i) => (
        <Motif
          key={i}
          kind={KINDS[m.k]}
          style={{
            position: 'absolute',
            left: `${m.x}%`,
            bottom: 0,
            width: `${height * 0.42}px`,
            height: `${(m.h / 100) * height}px`,
            transform: 'translateX(-50%)',
            transformOrigin: 'bottom center',
          }}
        />
      ))}
    </div>
  );
}

/* ---- A corner flourish ---- */

export function CornerSpray({
  className,
  corner = 'tl',
}: {
  className?: string;
  corner?: 'tl' | 'tr' | 'bl' | 'br';
}) {
  const flip = corner.includes('r') ? 'scaleX(-1)' : '';
  const vflip = corner.includes('b') ? 'scaleY(-1)' : '';
  const pos: CSSProperties =
    corner === 'tl'
      ? { top: 0, left: 0 }
      : corner === 'tr'
        ? { top: 0, right: 0 }
        : corner === 'bl'
          ? { bottom: 0, left: 0 }
          : { bottom: 0, right: 0 };
  return (
    <div
      className={className}
      aria-hidden
      style={{ position: 'absolute', width: 180, height: 180, transform: `${flip} ${vflip}`.trim(), ...pos }}
    >
      <Motif kind="lily" style={{ position: 'absolute', top: 6, left: 10, width: 84, height: 84, transform: 'rotate(-28deg)' }} />
      <Motif kind="bloom-pink" style={{ position: 'absolute', top: 48, left: 60, width: 56, height: 56 }} />
      <Motif kind="fern" style={{ position: 'absolute', top: 70, left: 4, width: 70, height: 70, transform: 'rotate(20deg)' }} />
      <Motif kind="bloom-gold" style={{ position: 'absolute', top: 4, left: 70, width: 40, height: 40 }} />
    </div>
  );
}
