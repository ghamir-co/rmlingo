/**
 * ScriptBackground — signature visual element for RMLingo.
 * Pure CSS typographic palimpsest: Arabic (Amiri) and English (Playfair)
 * words layered asymmetrically at low opacity over the ivory ground.
 * All navy on ivory. Renders as absolute inset-0, behind section content.
 */

type ScriptWord = {
  text: string
  top: string
  left: string
  size: number
  rotate: number
  opacity: number
  arabic?: boolean
  weight?: number
  italic?: boolean
}

const WORDS: ScriptWord[] = [
  {
    text: 'الترجمة',
    top: '6%',
    left: '4%',
    size: 300,
    rotate: -4,
    opacity: 0.06,
    arabic: true,
  },
  {
    text: 'Translation',
    top: '14%',
    left: '52%',
    size: 180,
    rotate: 3,
    opacity: 0.07,
    italic: true,
  },
  {
    text: 'الدبلوماسية',
    top: '40%',
    left: '38%',
    size: 240,
    rotate: 5,
    opacity: 0.05,
    arabic: true,
  },
  {
    text: 'Diplomacy',
    top: '52%',
    left: '8%',
    size: 150,
    rotate: -5,
    opacity: 0.08,
  },
  {
    text: 'اللغة',
    top: '70%',
    left: '60%',
    size: 200,
    rotate: 6,
    opacity: 0.06,
    arabic: true,
  },
  {
    text: 'Language',
    top: '78%',
    left: '20%',
    size: 110,
    rotate: -3,
    opacity: 0.07,
    italic: true,
  },
  {
    text: 'التفاهم',
    top: '24%',
    left: '70%',
    size: 170,
    rotate: -5,
    opacity: 0.05,
    arabic: true,
  },
  {
    text: 'Understanding',
    top: '88%',
    left: '44%',
    size: 130,
    rotate: 4,
    opacity: 0.06,
  },
  {
    text: 'السلام',
    top: '62%',
    left: '2%',
    size: 220,
    rotate: 4,
    opacity: 0.05,
    arabic: true,
  },
  {
    text: 'Peace',
    top: '34%',
    left: '20%',
    size: 90,
    rotate: -2,
    opacity: 0.09,
    italic: true,
  },
  {
    text: 'التواصل',
    top: '92%',
    left: '74%',
    size: 160,
    rotate: -4,
    opacity: 0.06,
    arabic: true,
  },
  {
    text: 'Communication',
    top: '46%',
    left: '78%',
    size: 100,
    rotate: 5,
    opacity: 0.07,
  },
  {
    text: 'الثقافة',
    top: '12%',
    left: '78%',
    size: 150,
    rotate: -3,
    opacity: 0.05,
    arabic: true,
  },
  {
    text: 'Culture',
    top: '60%',
    left: '30%',
    size: 120,
    rotate: 2,
    opacity: 0.06,
  },
  {
    text: 'التعاون',
    top: '30%',
    left: '88%',
    size: 140,
    rotate: 4,
    opacity: 0.05,
    arabic: true,
  },
  {
    text: 'الشرق الأوسط',
    top: '82%',
    left: '52%',
    size: 130,
    rotate: -5,
    opacity: 0.05,
    arabic: true,
  },
  {
    text: 'Middle East',
    top: '18%',
    left: '32%',
    size: 110,
    rotate: 3,
    opacity: 0.06,
  },
]

export default function ScriptBackground() {
  return (
    <div
      className="script-palimpsest absolute inset-0 overflow-hidden pointer-events-none z-0 select-none"
      aria-hidden="true"
    >
      {WORDS.map((w, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: w.top,
            left: w.left,
            fontFamily: w.arabic ? "'Amiri', serif" : 'var(--app-font-serif)',
            fontSize: `${w.size}px`,
            color: 'hsl(var(--foreground))',
            opacity: w.opacity,
            transform: `rotate(${w.rotate}deg)`,
            fontWeight: w.weight ?? (w.arabic ? 700 : 400),
            fontStyle: w.italic ? 'italic' : 'normal',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            letterSpacing: w.arabic ? '0' : '-0.01em',
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  )
}
