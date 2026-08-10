/**
 * FieldworkIllustration — original, in-house editorial illustration for the
 * About page "field work" figure.
 *
 * Drawn entirely from scratch in the RMLingo design language (warm desert
 * sand, deep emerald, rich gold) using abstract shapes only: interpretation
 * receivers, a briefing card with blank terminology lines, and bilingual
 * speech marks. There are no photographs, no identifiable people, no real
 * organization marks, and no readable documents, so the asset carries no
 * third-party content or implied endorsements.
 *
 * The wide 1024x669 canvas matches the banner layout it replaces and scales
 * with `preserveAspectRatio="xMidYMid slice"` like the previous photo.
 */

const SAND = '#F9F6F1'
const EMERALD = '#21453C'
const EMERALD_INK = '#1C362F'
const GOLD = '#EEC14F'
const BRASS = '#93671A'
const HAIRLINE = '#E9E3D8'
const BLANK_LINE = '#F1EBDF'

export default function FieldworkIllustration() {
  return (
    <svg
      viewBox="0 0 1024 669"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      className="h-auto w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Warm sand ground */}
      <rect width="1024" height="669" fill={SAND} />

      {/* Faint drafting grid */}
      <g stroke={HAIRLINE} strokeWidth="1" opacity="0.7">
        {[170, 340, 510, 680, 850].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="669" />
        ))}
        {[110, 220, 330, 440, 550].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1024" y2={y} />
        ))}
      </g>

      {/* Rotated-square ornaments (octagram motif) */}
      <g fill="none">
        <rect
          x="104"
          y="104"
          width="72"
          height="72"
          transform="rotate(45 140 140)"
          stroke={GOLD}
          strokeWidth="1.5"
          opacity="0.75"
        />
        <rect
          x="872"
          y="76"
          width="56"
          height="56"
          transform="rotate(45 900 104)"
          stroke={EMERALD}
          strokeWidth="1.5"
          opacity="0.5"
        />
        <rect
          x="892"
          y="96"
          width="16"
          height="16"
          transform="rotate(45 900 104)"
          stroke={BRASS}
          strokeWidth="1.5"
          opacity="0.9"
        />
      </g>

      {/* Briefing / terminology card (left) — blank lines, no document text */}
      <g>
        {/* Eight-pointed star above the card */}
        <g transform="translate(226 232)" strokeWidth="1.5" fill="none">
          <rect
            x="-28"
            y="-28"
            width="56"
            height="56"
            stroke={BRASS}
            opacity="0.7"
          />
          <rect
            x="-28"
            y="-28"
            width="56"
            height="56"
            transform="rotate(45)"
            stroke={GOLD}
            opacity="0.9"
          />
        </g>

        <rect
          x="80"
          y="290"
          width="296"
          height="248"
          rx="8"
          fill="#FFFFFF"
          stroke={HAIRLINE}
          strokeWidth="2"
        />
        {/* Heading row: gold diamond + blank title line */}
        <rect
          x="112"
          y="328"
          width="12"
          height="12"
          transform="rotate(45 118 334)"
          fill={GOLD}
        />
        <rect
          x="140"
          y="328"
          width="196"
          height="12"
          rx="6"
          fill={BLANK_LINE}
        />

        {/* Blank terminology lines — no readable content */}
        <rect
          x="112"
          y="368"
          width="232"
          height="12"
          rx="6"
          fill={BLANK_LINE}
        />
        <rect
          x="112"
          y="396"
          width="200"
          height="12"
          rx="6"
          fill={BLANK_LINE}
        />
        <rect
          x="112"
          y="424"
          width="216"
          height="12"
          rx="6"
          fill={BLANK_LINE}
        />
        <rect
          x="112"
          y="452"
          width="168"
          height="12"
          rx="6"
          fill={BLANK_LINE}
        />

        {/* Divider + note markers */}
        <line
          x1="112"
          y1="488"
          x2="344"
          y2="488"
          stroke={HAIRLINE}
          strokeWidth="2"
        />
        <rect x="112" y="504" width="14" height="14" rx="3" fill={HAIRLINE} />
        <rect x="136" y="504" width="14" height="14" rx="3" fill={HAIRLINE} />
        <rect x="160" y="504" width="14" height="14" rx="3" fill={GOLD} />
      </g>

      {/* Interpretation receiver (center) */}
      <g>
        {/* Antenna */}
        <line
          x1="620"
          y1="238"
          x2="672"
          y2="176"
          stroke={BRASS}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <circle cx="674" cy="172" r="7" fill={GOLD} />

        {/* Headband */}
        <path
          d="M 436 214 Q 518 138 600 214"
          fill="none"
          stroke={EMERALD}
          strokeWidth="22"
          strokeLinecap="round"
        />

        {/* Ear cups */}
        <rect x="398" y="200" width="70" height="176" rx="34" fill={EMERALD} />
        <rect x="560" y="200" width="70" height="176" rx="34" fill={EMERALD} />

        {/* Receiver screen on the right cup — abstract channel marks */}
        <rect
          x="574"
          y="238"
          width="42"
          height="58"
          rx="7"
          fill={EMERALD_INK}
          stroke={GOLD}
          strokeWidth="2"
        />
        <circle cx="587" cy="258" r="4" fill={GOLD} />
        <circle cx="603" cy="258" r="4" fill={GOLD} opacity="0.55" />
        <circle cx="587" cy="276" r="4" fill={GOLD} opacity="0.55" />
        <circle cx="603" cy="276" r="4" fill={GOLD} />

        {/* Inner highlight on left cup */}
        <rect
          x="412"
          y="218"
          width="42"
          height="140"
          rx="20"
          fill={GOLD}
          opacity="0.16"
        />

        {/* Soft audio arcs */}
        <g
          stroke={BRASS}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        >
          <path d="M 640 300 q 14 -10 0 -20" />
          <path d="M 662 312 q 20 -14 0 -28" />
          <path d="M 684 324 q 26 -18 0 -36" />
        </g>
      </g>

      {/* Bilingual speech marks (right) */}
      <g>
        {/* Arabic speech bubble */}
        <path
          d="M 700 158 h 216 q 26 0 26 26 v 106 q 0 26 -26 26 h -196 l -34 34 l 8 -36 q -22 -6 -22 -26 v -104 q 0 -26 26 -26 z"
          fill="#FFFFFF"
          stroke={HAIRLINE}
          strokeWidth="2"
        />
        <text
          x="808"
          y="268"
          textAnchor="middle"
          fontFamily="'Amiri', 'IBM Plex Sans Arabic', serif"
          fontWeight="700"
          fontSize="84"
          fill={EMERALD}
        >
          لغة
        </text>

        {/* English ⇄ Arabic chip */}
        <rect x="762" y="396" width="212" height="118" rx="24" fill={EMERALD} />
        <text
          x="868"
          y="472"
          textAnchor="middle"
          fontFamily="'Inter', system-ui, sans-serif"
          fontWeight="600"
          fontSize="42"
          letterSpacing="2"
          fill={SAND}
        >
          EN ⇄ AR
        </text>
        <rect
          x="974"
          y="398"
          width="16"
          height="16"
          transform="rotate(45 982 406)"
          fill={GOLD}
        />
      </g>

      {/* Ground rule */}
      <line
        x1="80"
        y1="592"
        x2="944"
        y2="592"
        stroke={BRASS}
        strokeWidth="2"
        opacity="0.8"
      />
      <circle cx="944" cy="592" r="5" fill={GOLD} />
      <circle cx="80" cy="592" r="5" fill={GOLD} />
    </svg>
  )
}
