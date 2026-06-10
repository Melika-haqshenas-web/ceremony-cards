'use client';

/**
 * A fixed film-grain overlay that gives the dark surfaces a tactile,
 * cinematic texture. SVG fractal noise → no image asset needed. Sits
 * above content but ignores pointer events.
 */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[110] opacity-[0.06] mix-blend-soft-light"
    >
      <div
        className="absolute inset-[-50%] h-[200%] w-[200%] animate-grain"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
