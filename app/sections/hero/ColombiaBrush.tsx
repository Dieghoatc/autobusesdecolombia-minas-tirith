import { useId } from "react";

// Flag colors, the blue lifted a little so it reads on the dark hero
// (official navy #003893 disappears against the background).
const STROKES = [
  { color: "#FCD116", width: 13, d: "M6 13 C 70 5, 140 17, 210 9 S 280 7, 294 11", delay: 0 },
  { color: "#2456C9", width: 6.5, d: "M10 23 C 80 16, 150 27, 220 20 S 282 18, 290 21", delay: 180 },
  { color: "#CE1126", width: 6.5, d: "M14 31 C 84 25, 154 35, 224 28 S 280 27, 286 29", delay: 320 },
];

interface ColombiaBrushProps {
  children: React.ReactNode;
}

// Wraps a word with a hand-painted underline in the Colombian flag colors
// (yellow over blue and red), drawn in when it mounts.
export function ColombiaBrush({ children }: ColombiaBrushProps) {
  const filterId = useId();

  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 300 40"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.36em] left-[-2%] h-[0.48em] w-[104%] -rotate-1"
      >
        <defs>
          {/* Roughens the stroke edges so they read as a brush */}
          <filter id={filterId} x="-5%" y="-40%" width="110%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="3.5" />
          </filter>
        </defs>
        <g filter={`url(#${filterId})`}>
          {STROKES.map(({ color, width, d, delay }) => (
            <path
              key={color}
              d={d}
              pathLength={1}
              fill="none"
              stroke={color}
              strokeWidth={width}
              strokeLinecap="round"
              className="animate-draw [stroke-dasharray:1] [stroke-dashoffset:1] motion-reduce:animate-none motion-reduce:[stroke-dashoffset:0]"
              style={{ animationDelay: `${300 + delay}ms` }}
            />
          ))}
        </g>
      </svg>
    </span>
  );
}
