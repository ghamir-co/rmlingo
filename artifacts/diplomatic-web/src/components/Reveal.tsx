import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  x?: number
  className?: string
  once?: boolean
}

/** Scroll-triggered fade/slide reveal. Institutional, fast, tasteful. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  className,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-12% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
