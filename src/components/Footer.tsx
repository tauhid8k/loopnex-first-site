export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-(--m3-outline-variant) bg-(--m3-surface-container-lowest) px-4 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-(--m3-primary) to-(--m3-primary-container)">
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path d="M4 3v10l4-3 4 3V3z" fill="white" opacity="0.9" />
                </svg>
              </span>
              <span className="text-lg font-bold text-(--m3-on-surface)">
                Loopnex
              </span>
            </div>
            <p className="m-0 max-w-xs text-sm leading-relaxed text-(--m3-on-surface-variant)">
              A technical studio building high-performance digital products for
              ambitious teams.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-(--m3-on-surface)">
              Services
            </h4>
            <ul className="m-0 list-none space-y-2.5 p-0 text-sm text-(--m3-on-surface-variant)">
              <li>
                <a
                  href="/#services"
                  className="no-underline transition hover:text-(--m3-primary)"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="no-underline transition hover:text-(--m3-primary)"
                >
                  System Architecture
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="no-underline transition hover:text-(--m3-primary)"
                >
                  Cloud & DevOps
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="no-underline transition hover:text-(--m3-primary)"
                >
                  Cybersecurity
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-(--m3-on-surface)">
              Company
            </h4>
            <ul className="m-0 list-none space-y-2.5 p-0 text-sm text-(--m3-on-surface-variant)">
              <li>
                <a
                  href="/#about"
                  className="no-underline transition hover:text-(--m3-primary)"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#process"
                  className="no-underline transition hover:text-(--m3-primary)"
                >
                  Process
                </a>
              </li>
              <li>
                <a
                  href="/#testimonials"
                  className="no-underline transition hover:text-(--m3-primary)"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="no-underline transition hover:text-(--m3-primary)"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-(--m3-on-surface)">
              Connect
            </h4>
            <ul className="m-0 list-none space-y-2.5 p-0 text-sm text-(--m3-on-surface-variant)">
              <li>
                <a
                  href="mailto:hello@loopnex.dev"
                  className="no-underline transition hover:text-(--m3-primary)"
                >
                  hello@loopnex.dev
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--m3-outline-variant) text-(--m3-on-surface-variant) transition hover:border-(--m3-primary) hover:text-(--m3-primary)"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M12.6 1h2.2L10 6.48 15.64 15h-4.41L7.78 9.82 3.23 15H1l5.14-5.84L.72 1h4.52l3.12 4.73L12.6 1zm-.77 12.67h1.22L4.57 2.26H3.26l8.57 11.41z"
                  />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--m3-outline-variant) text-(--m3-on-surface-variant) transition hover:border-(--m3-primary) hover:text-(--m3-primary)"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--m3-outline-variant) text-(--m3-on-surface-variant) transition hover:border-(--m3-primary) hover:text-(--m3-primary)"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-(--m3-outline-variant) pt-6 sm:flex-row">
          <p className="m-0 text-xs text-(--m3-on-surface-variant)">
            &copy; {year} Loopnex. All rights reserved.
          </p>
          <p className="m-0 text-xs text-(--m3-on-surface-variant)">
            Crafted with precision & modern tech.
          </p>
        </div>
      </div>
    </footer>
  )
}
