/**
 * WaxSeal — a realistic gold wax seal: an irregular poured-wax blob with a
 * pressed inner ring and an embossed monogram, lit from the top-left. Pure
 * SVG so it scales crisply at any size. Used by the envelope intro and the
 * closing sign-off.
 */

type Props = {
  initials: string;
  /** Pixel size of the seal. */
  size?: number;
  className?: string;
};

export function WaxSeal({ initials, size = 96, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="wax-body" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#f4d27a" />
          <stop offset="45%" stopColor="#deac4c" />
          <stop offset="78%" stopColor="#c08f33" />
          <stop offset="100%" stopColor="#9c6f22" />
        </radialGradient>
        <radialGradient id="wax-press" cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#cf9c3c" />
          <stop offset="70%" stopColor="#bd8b30" />
          <stop offset="100%" stopColor="#a87a26" />
        </radialGradient>
        <filter id="wax-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>

      {/* drop shadow */}
      <ellipse cx="51" cy="56" rx="44" ry="44" fill="#5b3d10" opacity="0.18" filter="url(#wax-soft)" />

      {/* irregular poured-wax blob */}
      <path
        filter="url(#wax-soft)"
        fill="url(#wax-body)"
        d="M50 5
           C63 4 75 11 83 22
           C90 31 96 40 95 51
           C94 63 88 75 77 84
           C67 92 54 95 43 92
           C30 89 17 82 10 70
           C4 60 3 47 8 36
           C14 22 30 8 50 5 Z"
      />

      {/* pressed inner disc */}
      <circle cx="50" cy="49" r="33" fill="url(#wax-press)" />
      {/* inner ridge: dark inset + light outer to read as embossed */}
      <circle cx="50" cy="49" r="33" fill="none" stroke="#8a6320" strokeWidth="1.6" opacity="0.55" />
      <circle cx="50" cy="49" r="30" fill="none" stroke="#f3d488" strokeWidth="1" opacity="0.5" />

      {/* monogram, embossed */}
      <text
        x="50"
        y="49"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="26"
        fontWeight="500"
        fill="#7d5916"
        style={{ letterSpacing: '0.5px' }}
      >
        {initials}
      </text>
      {/* top-left sheen */}
      <ellipse cx="36" cy="30" rx="20" ry="13" fill="#fff" opacity="0.16" filter="url(#wax-soft)" transform="rotate(-25 36 30)" />
    </svg>
  );
}
