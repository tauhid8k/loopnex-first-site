/* ═══════════════════════════════════════════════════════
   Shared landing-page primitives — icons, animation
   wrappers, and small reusable UI pieces.
   ═══════════════════════════════════════════════════════ */
import { useState, useEffect, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import type {
  ServiceIconId,
  ProcessIconId,
  ContactIconId,
} from '#/data/landing'

/* ─── SSR-safe mount hook ────────────────────────────── */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

/* ─── Shared transition curve ────────────────────────── */
export const ease = [0.16, 1, 0.3, 1] as const

/* ─── Animation wrappers ─────────────────────────────── */
export function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const mounted = useHasMounted()
  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 40 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const mounted = useHasMounted()
  return (
    <motion.div
      initial={mounted ? 'hidden' : false}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

/* ─── Animated counter ───────────────────────────────── */
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

export function Counter({
  target,
  suffix = '',
}: {
  target: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(target * easeOutQuart(progress)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

/* ─── FAQ accordion row ──────────────────────────────── */
export function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-(--m3-outline-variant)">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent py-5 text-left"
      >
        <span className="text-base font-medium text-(--m3-on-surface)">
          {q}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 text-(--m3-on-surface-variant)"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-(--m3-on-surface-variant)">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Star rating (shared by testimonials) ───────────── */
export function StarRating({ size = 'h-5 w-5' }: { size?: string }) {
  return (
    <div className="flex gap-1 text-(--m3-primary)">
      {Array.from({ length: 5 }).map((_, j) => (
        <svg key={j} className={`${size} fill-current`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

/* ─── Section heading (DRY pattern) ──────────────────── */
export function SectionHeading({
  chip,
  title,
  highlightedWord,
  highlightClass = 'gradient-text',
  subtitle,
}: {
  chip: string
  title: string
  highlightedWord: string
  highlightClass?: string
  subtitle?: string
}) {
  return (
    <FadeUp className="mb-16 text-center">
      <span className="section-chip mb-4 inline-flex">{chip}</span>
      <h2
        className="mt-4 text-3xl font-bold tracking-tight text-(--m3-on-surface) sm:text-5xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title} <span className={highlightClass}>{highlightedWord}</span>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-lg text-(--m3-on-surface-variant)">
          {subtitle}
        </p>
      )}
    </FadeUp>
  )
}

/* ═══════════════════════════════════════════════════════
   SVG ICON MAP — all icons in one place, looked up by id
   ═══════════════════════════════════════════════════════ */
const svgBase = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

type IconId =
  | ServiceIconId
  | ProcessIconId
  | ContactIconId
  | 'arrow-right'
  | 'send'

const ICON_PATHS: Record<IconId, ReactNode> = {
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  'arrow-right': (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
  send: (
    <>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  book: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
  'check-circle': (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>
  ),
  mail: (
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
}

export function Icon({
  id,
  className = 'h-6 w-6',
  strokeWidth,
}: {
  id: IconId
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      {...svgBase}
      strokeWidth={strokeWidth ?? svgBase.strokeWidth}
      className={className}
    >
      {ICON_PATHS[id]}
    </svg>
  )
}
