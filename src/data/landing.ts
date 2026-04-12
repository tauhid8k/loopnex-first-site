/* ═══════════════════════════════════════════════════════
   Landing page data — single source of truth for all
   static content rendered on the home page.
   ═══════════════════════════════════════════════════════ */

export const TRUSTED_BY = [
  'Velora Health',
  'Nexlift',
  'DataWeave',
  'Meridian Finance',
  'CloudForge',
  'Prism Labs',
  'Synthwave AI',
  'Orbitex',
] as const

export const STATS = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: '+', label: 'Years Combined Exp.' },
] as const

export const SERVICES = [
  {
    iconId: 'code' as const,
    title: 'Web Development',
    desc: 'Custom web applications built with modern frameworks, optimized for performance and scalability.',
    accent: 'from-[#A8C7FA] to-[#0842A0]',
  },
  {
    iconId: 'layers' as const,
    title: 'System Architecture',
    desc: 'Robust, scalable system designs that form the backbone of reliable digital infrastructure.',
    accent: 'from-[#DEBCE0] to-[#7B4D80]',
  },
  {
    iconId: 'shield' as const,
    title: 'Cybersecurity',
    desc: 'Comprehensive security audits, penetration testing, and hardened application defenses.',
    accent: 'from-[#A8C7FA] to-[#3E4759]',
  },
  {
    iconId: 'globe' as const,
    title: 'Cloud & DevOps',
    desc: 'Automated CI/CD pipelines, infrastructure as code, and cloud-native deployments.',
    accent: 'from-[#BEC6DC] to-[#0842A0]',
  },
  {
    iconId: 'zap' as const,
    title: 'Performance Optimization',
    desc: 'Deep profiling and tuning to deliver lightning-fast load times and smooth interactions.',
    accent: 'from-[#D3E3FD] to-[#A8C7FA]',
  },
  {
    iconId: 'target' as const,
    title: 'Technical Consulting',
    desc: 'Strategic guidance on technology choices, migrations, and digital transformation roadmaps.',
    accent: 'from-[#DEBCE0] to-[#A8C7FA]',
  },
] as const

export type ServiceIconId = (typeof SERVICES)[number]['iconId']

export const PROCESS = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We dive deep into your goals, audience, and constraints to define a clear project scope.',
    iconId: 'search' as const,
  },
  {
    step: '02',
    title: 'Strategy',
    desc: 'We map out architecture, tech stack, and milestones tailored to your timeline and budget.',
    iconId: 'book' as const,
  },
  {
    step: '03',
    title: 'Build & Iterate',
    desc: 'Rapid iteration with transparent progress updates — you see working software every sprint.',
    iconId: 'code' as const,
  },
  {
    step: '04',
    title: 'Launch & Scale',
    desc: 'Rigorous QA, seamless deployment, and ongoing support as your product grows.',
    iconId: 'check-circle' as const,
  },
] as const

export type ProcessIconId = (typeof PROCESS)[number]['iconId']

export const PROJECTS = [
  {
    title: 'Velora Health Platform',
    category: 'Web App',
    desc: 'HIPAA-compliant telehealth platform serving 200K+ patients with real-time video, chat, and EHR integration.',
    tags: ['React', 'Node.js', 'AWS', 'TypeScript'],
    gradient: 'from-[#0842A0] to-[#A8C7FA]',
  },
  {
    title: 'Nexlift Analytics Dashboard',
    category: 'Dashboard',
    desc: 'Real-time analytics dashboard processing 2M events/day with interactive visualizations and custom reporting.',
    tags: ['TypeScript', 'TanStack', 'D3.js', 'Turso'],
    gradient: 'from-[#3E4759] to-[#BEC6DC]',
  },
  {
    title: 'DataWeave API Gateway',
    category: 'Backend',
    desc: 'High-throughput data pipeline handling 50K requests/sec with intelligent caching and auto-scaling.',
    tags: ['Node.js', 'SQLite', 'Turso', 'Docker'],
    gradient: 'from-[#7B4D80] to-[#DEBCE0]',
  },
  {
    title: 'Meridian Banking Suite',
    category: 'Web App',
    desc: 'Modern banking interface with multi-currency support, real-time transactions, and PCI DSS compliance.',
    tags: ['React', 'Tailwind', 'Drizzle', 'AWS'],
    gradient: 'from-[#A8C7FA] to-[#0842A0]',
  },
  {
    title: 'CloudForge CLI Toolkit',
    category: 'DevOps',
    desc: 'Infrastructure automation toolkit reducing deployment time by 80% across 15 microservices.',
    tags: ['Docker', 'AWS', 'TypeScript', 'Node.js'],
    gradient: 'from-[#BEC6DC] to-[#3E4759]',
  },
  {
    title: 'Prism Design System',
    category: 'Design System',
    desc: 'Component library serving 12 product teams with 200+ accessible components and automated visual testing.',
    tags: ['React', 'Tailwind', 'TypeScript', 'Vite'],
    gradient: 'from-[#DEBCE0] to-[#A8C7FA]',
  },
] as const

export const PROJECT_CATEGORIES = [
  'All',
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
] as const

export const TESTIMONIALS = [
  {
    quote:
      'Loopnex completely transformed our digital presence. Their technical depth and attention to detail is unmatched. The platform they built handles 10x our projected load without breaking a sweat.',
    author: 'Sarah Chen',
    role: 'CTO, Velora Health',
    initials: 'SC',
    featured: true,
  },
  {
    quote:
      'Working with Loopnex felt like having a world-class engineering team in-house. They shipped faster than we imagined possible.',
    author: 'Marcus Rivera',
    role: 'Founder, Nexlift',
    initials: 'MR',
    featured: false,
  },
  {
    quote:
      'The system architecture they designed has scaled flawlessly from 10K to 2M users without a single rewrite.',
    author: 'Aisha Patel',
    role: 'VP Engineering, DataWeave',
    initials: 'AP',
    featured: false,
  },
] as const

export const FAQ = [
  {
    q: 'How long does a typical project take?',
    a: "Timelines vary based on complexity. A focused MVP takes 6–10 weeks, while enterprise platforms may span 3–6 months. We'll provide a detailed timeline after the discovery phase.",
  },
  {
    q: 'Do you work with startups or only enterprises?',
    a: "Both. We've helped pre-seed startups launch their first product and scaled enterprise systems handling millions of users. Our process adapts to your stage and budget.",
  },
  {
    q: 'What technologies do you specialize in?',
    a: 'Our core stack includes React, TypeScript, Node.js, TanStack, Tailwind CSS, SQLite/Turso, and AWS/Cloudflare. We pick the right tool for each job — never force-fitting a technology.',
  },
  {
    q: 'How do you handle communication and updates?',
    a: 'You get a dedicated project lead, weekly demo calls, access to our project board, and a shared Slack/Discord channel. Full transparency is non-negotiable.',
  },
  {
    q: 'What happens after launch?',
    a: "We offer ongoing support, monitoring, and feature development retainers. Most clients stay with us long-term — we don't disappear after deployment.",
  },
  {
    q: 'Can you work with our existing codebase?',
    a: "Absolutely. We regularly onboard into existing projects, perform code audits, and incrementally modernize legacy systems. We'll assess your codebase and create a clear improvement roadmap.",
  },
] as const

export const ABOUT_BULLETS = [
  'Performance-first engineering — every ms matters',
  'OWASP-compliant security from day one',
  'Transparent process with weekly demos',
  'Long-term partnership, not a one-off project',
] as const

export const CONTACT_INFO = [
  {
    iconId: 'mail' as const,
    label: 'hello@loopnex.dev',
  },
  {
    iconId: 'map-pin' as const,
    label: 'Remote-first, worldwide',
  },
  {
    iconId: 'clock' as const,
    label: 'Usually respond within 24h',
  },
] as const

export type ContactIconId = (typeof CONTACT_INFO)[number]['iconId']
