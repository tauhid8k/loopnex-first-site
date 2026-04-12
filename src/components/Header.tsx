import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const SECTION_IDS = [
  'hero',
  'about',
  'services',
  'process',
  'portfolio',
  'testimonials',
  'contact',
]

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Process', id: 'process' },
  { label: 'Work', id: 'portfolio' },
  { label: 'Testimonials', id: 'testimonials' },
]

export default function Header() {
  const [active, setActive] = useState('hero')
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => {
      const offset = window.scrollY + 120
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i])
        if (el && el.offsetTop <= offset) {
          setActive(SECTION_IDS[i])
          return
        }
      }
      setActive('hero')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center gap-x-3 py-3 sm:py-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 rounded-full border border-(--chip-line) bg-(--chip-bg) px-4 py-2 text-sm font-bold text-(--m3-on-surface) no-underline shadow-[0_8px_24px_rgba(168,199,250,0.06)]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-linear-to-br from-(--m3-primary) to-(--m3-primary-container)">
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
              <path d="M4 3v10l4-3 4 3V3z" fill="white" opacity="0.9" />
            </svg>
          </span>
          Loopnex
        </Link>

        <div className="ml-4 hidden items-center gap-x-5 text-sm font-semibold sm:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={scrollTo(item.id)}
              className={`nav-link ${isHome && active === item.id ? 'is-active' : ''}`}
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/todos"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Todos
          </Link>
        </div>

        <a
          href="#contact"
          onClick={scrollTo('contact')}
          className="btn-primary ml-auto hidden text-xs sm:inline-flex"
        >
          Contact Us
        </a>
      </nav>
    </header>
  )
}
