import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Accurate SVG rendering of the national flag of Rwanda (Law No. 34/2001).
 * Three horizontal bands: blue (top, half height), yellow (middle quarter),
 * green (bottom quarter), with a golden 24-ray sun in the upper fly corner.
 */
export function FlagRwanda({
  className,
  rounded = "rounded-lg",
}: {
  className?: string;
  rounded?: string;
}) {
  // 24 sun rays, alternating long/short, generated procedurally.
  const cx = 74;
  const cy = 26;
  const rInner = 6.5;
  const rLong = 17;
  const rShort = 12.5;
  const rays: string[] = [];
  for (let i = 0; i < 24; i++) {
    const angle = (i * Math.PI) / 12;
    const r = i % 2 === 0 ? rLong : rShort;
    const x1 = cx + rInner * Math.cos(angle);
    const y1 = cy + rInner * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    rays.push(`M${x1.toFixed(2)},${y1.toFixed(2)} L${x2.toFixed(2)},${y2.toFixed(2)}`);
  }

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-full", rounded, className)}
      role="img"
      aria-label="Flag of Rwanda"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Blue band (top half) */}
      <rect x="0" y="0" width="100" height="50" fill="#00A1DE" />
      {/* Yellow band (middle quarter) */}
      <rect x="0" y="50" width="100" height="25" fill="#FAD201" />
      {/* Green band (bottom quarter) */}
      <rect x="0" y="75" width="100" height="25" fill="#20603D" />
      {/* Sun: rays + disk */}
      <g stroke="#FAD201" strokeWidth="2.4" strokeLinecap="round">
        {rays.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={rInner} fill="#FAD201" />
      {/* Subtle inner highlight on the sun disk for depth */}
      <circle cx={cx} cy={cy} r={rInner - 2} fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
