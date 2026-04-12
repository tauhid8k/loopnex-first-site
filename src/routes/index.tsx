import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  TRUSTED_BY,
  STATS,
  SERVICES,
  PROCESS,
  PROJECTS,
  PROJECT_CATEGORIES,
  TESTIMONIALS,
  FAQ,
  ABOUT_BULLETS,
  CONTACT_INFO,
} from '#/data/landing'
import {
  useHasMounted,
  ease,
  FadeUp,
  StaggerContainer,
  staggerItem,
  Counter,
  FAQItem,
  StarRating,
  SectionHeading,
  Icon,
} from '#/components/landing'

export const Route = createFileRoute('/')({ component: LandingPage })

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
function LandingPage() {
  const [filter, setFilter] = useState('All')
  const filtered =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)
  const mounted = useHasMounted()

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div className="overflow-x-hidden">
      {/* ═══════════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="hero"
        className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4 pt-24 pb-20"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[-15%] left-[-10%] h-175 w-175 rounded-full bg-[radial-gradient(ellipse,rgba(168,199,250,0.1),transparent_60%)] animate-glow-pulse" />
          <div
            className="absolute top-[10%] right-[-15%] h-150 w-150 rounded-full bg-[radial-gradient(ellipse,rgba(8,66,160,0.15),transparent_60%)]"
            style={{ animationDelay: '1.5s', animationDuration: '4s' }}
          />
          <div
            className="absolute bottom-[-10%] left-[30%] h-125 w-125 rounded-full bg-[radial-gradient(ellipse,rgba(222,188,224,0.06),transparent_60%)] animate-glow-pulse"
            style={{ animationDelay: '3s' }}
          />
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.03]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          <motion.div
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] left-[15%] h-2 w-2 rounded-full bg-(--m3-primary) opacity-30 blur-[1px]"
          />
          <motion.div
            animate={{ y: [15, -15, 15], x: [8, -8, 8] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[35%] right-[20%] h-3 w-3 rounded-full bg-(--m3-tertiary) opacity-20 blur-[1px]"
          />
          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[30%] left-[60%] h-1.5 w-1.5 rounded-full bg-(--m3-secondary) opacity-25"
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="section-chip mb-6 inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-(--m3-primary) animate-glow-pulse" />
              Service-Based Digital Studio
            </span>
          </motion.div>

          <motion.h1
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="text-5xl leading-[1.06] font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            We build <span className="gradient-text">digital products</span>{' '}
            that scale
          </motion.h1>

          <motion.p
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-(--m3-on-surface-variant) sm:text-xl"
          >
            Loopnex is a technical studio specializing in high-performance web
            applications, scalable architecture, and elegant user experiences.
          </motion.p>

          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#services" className="btn-primary">
              Our Services
              <Icon id="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </a>
            <a href="#contact" className="btn-outline">
              Get in Touch
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={mounted ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-(--m3-outline-variant) p-1.5"
          >
            <motion.div className="h-1.5 w-1.5 rounded-full bg-(--m3-primary)" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. TRUSTED BY — Marquee
          ═══════════════════════════════════════════════ */}
      <section className="border-y border-(--m3-outline-variant) bg-(--m3-surface-container-lowest) py-6">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-(--m3-on-surface-variant) opacity-60">
            Trusted by innovative teams
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...TRUSTED_BY, ...TRUSTED_BY].map((name, i) => (
              <span
                key={i}
                className="mx-8 whitespace-nowrap text-lg font-semibold text-(--m3-on-surface) opacity-25 transition-opacity hover:opacity-50 sm:mx-12"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. ABOUT — Split layout with animated stats
          ═══════════════════════════════════════════════ */}
      <section id="about" className="relative px-4 py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={mounted ? { opacity: 0, x: -40 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="section-chip mb-4 inline-flex">Why Loopnex</span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-(--m3-on-surface) sm:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Engineering excellence,{' '}
              <span className="text-(--m3-primary)">delivered</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-(--m3-on-surface-variant)">
              We&rsquo;re not just developers — we&rsquo;re architects of
              scalable, maintainable systems. Every project gets the same rigor
              whether it&rsquo;s an MVP or enterprise platform.
            </p>
            <div className="mt-8 space-y-4">
              {ABOUT_BULLETS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={mounted ? { opacity: 0, x: -20 } : false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--m3-primary-container)">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-3.5 w-3.5 text-white"
                    >
                      <polyline
                        points="20 6 9 17 4 12"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-(--m3-on-surface-variant)">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={mounted ? { opacity: 0, x: 40 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={mounted ? { opacity: 0, scale: 0.9 } : false}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease }}
                className="glass-card flex flex-col items-center justify-center p-8 text-center"
              >
                <span className="stat-number text-4xl text-(--m3-primary)">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-2 text-sm text-(--m3-on-surface-variant)">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. SERVICES — Bento grid
          ═══════════════════════════════════════════════ */}
      <section id="services" className="relative px-4 py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,199,250,0.06),transparent)]" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading
            chip="What We Do"
            title="Services built for"
            highlightedWord="ambitious teams"
            subtitle="End-to-end technical services to design, build, secure, and scale your digital products."
          />
          <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <motion.div
                key={service.title}
                variants={staggerItem}
                className="gradient-border glass-card group relative overflow-hidden p-8"
              >
                <div
                  className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${service.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${service.accent}`}
                >
                  <Icon
                    id={service.iconId}
                    className="h-6 w-6 text-white opacity-90"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-(--m3-on-surface)">
                  {service.title}
                </h3>
                <p className="m-0 text-sm leading-relaxed text-(--m3-on-surface-variant)">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. PROCESS — Connected energy beam timeline
          ═══════════════════════════════════════════════ */}
      <section
        id="process"
        className="relative border-y border-(--m3-outline-variant) bg-(--m3-surface-container-lowest) px-4 py-28"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            chip="How We Work"
            title="From idea to"
            highlightedWord="production"
            highlightClass="text-(--m3-primary)"
          />

          <div className="relative">
            {/* Energy beam connector (desktop) */}
            <div className="pointer-events-none absolute top-13 right-[12.5%] left-[12.5%] hidden h-0.5 lg:block">
              {/* Static base wire */}
              <div className="absolute inset-0 rounded-full bg-(--m3-outline-variant) opacity-30" />
              {/* Gradient wire that draws in */}
              <motion.div
                initial={mounted ? { scaleX: 0, opacity: 0 } : false}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.5 }}
                className="absolute inset-0 origin-left"
              >
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#A8C7FA] via-[#0842A0] to-[#DEBCE0] opacity-60" />
                {/* Traveling energy pulse */}
                <div className="energy-pulse absolute top-1/2 h-3 w-12 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(168,199,250,0.9),transparent_70%)] blur-[3px]" />
              </motion.div>
              {/* Node dots on the wire */}
              {PROCESS.map((_, i) => (
                <motion.div
                  key={i}
                  initial={mounted ? { scale: 0 } : false}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.2, duration: 0.4, ease }}
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-(--m3-primary) shadow-[0_0_8px_rgba(168,199,250,0.6)]"
                  style={{
                    left: `${(i / (PROCESS.length - 1)) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>

            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={mounted ? { opacity: 0, y: 30 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.2, duration: 0.6, ease }}
                  className="relative text-center"
                >
                  <motion.div
                    initial={mounted ? { scale: 0 } : false}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.2, duration: 0.5, ease }}
                    className="relative z-10 mx-auto mb-6 flex h-26 w-26 items-center justify-center"
                  >
                    <div className="absolute inset-0 rounded-full border border-(--m3-outline-variant) bg-(--m3-surface-container)" />
                    <motion.div
                      animate={{ opacity: [0.15, 0.35, 0.15] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      className="absolute -inset-1 rounded-full bg-(--m3-primary) blur-md"
                    />
                    <div className="relative flex h-16 w-16 flex-col items-center justify-center rounded-full bg-(--m3-surface-container-high) text-(--m3-primary)">
                      <Icon id={p.iconId} />
                    </div>
                  </motion.div>

                  <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-(--m3-primary) opacity-70">
                    Step {p.step}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-(--m3-on-surface)">
                    {p.title}
                  </h3>
                  <p className="m-0 text-sm leading-relaxed text-(--m3-on-surface-variant)">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. PORTFOLIO — Filterable project cards
          ═══════════════════════════════════════════════ */}
      <section id="portfolio" className="relative px-4 py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            chip="Our Work"
            title="Projects that"
            highlightedWord="speak for themselves"
          />

          <FadeUp
            delay={0.1}
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  filter === cat
                    ? 'border-(--m3-primary) bg-(--m3-primary) text-(--m3-on-primary)'
                    : 'border-(--m3-outline-variant) bg-transparent text-(--m3-on-surface-variant) hover:border-(--m3-primary) hover:text-(--m3-primary)'
                }`}
              >
                {cat}
              </button>
            ))}
          </FadeUp>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={mounted ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={mounted ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease, delay: i * 0.06 }}
                  className="gradient-border glass-card group overflow-hidden"
                >
                  <div
                    className={`relative flex aspect-16/10 items-center justify-center bg-linear-to-br ${project.gradient} overflow-hidden`}
                  >
                    <svg className="absolute inset-0 h-full w-full opacity-10">
                      <defs>
                        <pattern
                          id={`pgrid-${project.title.replace(/\s/g, '')}`}
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 20 0 L 0 0 0 20"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#pgrid-${project.title.replace(/\s/g, '')})`}
                      />
                    </svg>
                    <Icon
                      id="code"
                      className="relative h-12 w-12 text-white opacity-30 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-(--m3-primary-container) px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-(--m3-on-primary-container)">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-(--m3-on-surface)">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-(--m3-on-surface-variant)">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-(--m3-outline-variant) px-2.5 py-1 text-xs text-(--m3-on-surface-variant)"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          7. TESTIMONIALS — Featured + grid
          ═══════════════════════════════════════════════ */}
      <section id="testimonials" className="relative px-4 py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(168,199,250,0.04),transparent)]" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading
            chip="Testimonials"
            title="Trusted by"
            highlightedWord="industry leaders"
          />

          {TESTIMONIALS.filter((t) => t.featured).map((t) => (
            <FadeUp key={t.author} className="mb-8">
              <div className="glass-card relative mx-auto max-w-3xl overflow-hidden p-10 text-center">
                <div
                  className="pointer-events-none absolute top-4 left-6 text-[120px] leading-none text-(--m3-primary) opacity-[0.06]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  &ldquo;
                </div>
                <div className="mb-4 flex justify-center">
                  <StarRating />
                </div>
                <blockquote className="mb-6 text-lg leading-relaxed text-(--m3-on-surface) italic sm:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-(--m3-primary-container) to-(--m3-primary) text-sm font-bold text-white">
                    {t.initials}
                  </div>
                  <div className="text-left">
                    <p className="m-0 font-semibold text-(--m3-on-surface)">
                      {t.author}
                    </p>
                    <p className="m-0 text-sm text-(--m3-on-surface-variant)">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}

          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.filter((t) => !t.featured).map((t) => (
              <motion.div
                key={t.author}
                variants={staggerItem}
                className="glass-card flex flex-col justify-between p-8"
              >
                <div className="mb-4">
                  <StarRating size="h-4 w-4" />
                </div>
                <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-(--m3-on-surface) italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-(--m3-primary-container) to-(--m3-primary) text-xs font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <p className="m-0 text-sm font-semibold text-(--m3-on-surface)">
                      {t.author}
                    </p>
                    <p className="m-0 text-xs text-(--m3-on-surface-variant)">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          8. FAQ — Accordion
          ═══════════════════════════════════════════════ */}
      <section className="border-y border-(--m3-outline-variant) bg-(--m3-surface-container-lowest) px-4 py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            chip="FAQ"
            title="Common"
            highlightedWord="questions"
            highlightClass="text-(--m3-primary)"
          />
          <FadeUp delay={0.12}>
            <div className="glass-card overflow-hidden p-2 sm:p-6">
              {FAQ.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          9. CTA + CONTACT FORM
          ═══════════════════════════════════════════════ */}
      <section id="contact" className="relative px-4 py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(168,199,250,0.06),transparent)]" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-2">
          <motion.div
            initial={mounted ? { opacity: 0, x: -40 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="section-chip mb-4 inline-flex">
              Ready to Start?
            </span>
            <h2
              className="mt-4 text-3xl font-bold tracking-tight text-(--m3-on-surface) sm:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Let&rsquo;s build something{' '}
              <span className="gradient-text">extraordinary</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-(--m3-on-surface-variant)">
              Whether you have a detailed spec or just an idea — we&rsquo;ll
              help you turn it into a production-grade product your users love.
            </p>

            <div className="mt-8 space-y-4">
              {CONTACT_INFO.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-(--m3-on-surface-variant)"
                >
                  <span className="text-(--m3-primary)">
                    <Icon id={item.iconId} className="h-5 w-5" />
                  </span>
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={mounted ? { opacity: 0, y: 40 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
          >
            <div className="glass-card p-8">
              <h3 className="mb-6 text-xl font-semibold text-(--m3-on-surface)">
                Send us a message
              </h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-(--m3-on-surface-variant)"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-(--m3-on-surface-variant)"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      className="form-input"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-sm font-medium text-(--m3-on-surface-variant)"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project inquiry"
                    className="form-input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-(--m3-on-surface-variant)"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    className="form-input"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                >
                  Send Message
                  <Icon id="send" className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
