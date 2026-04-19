'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { siteConfig } from '@/data/site-config'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/about', label: 'About' },
  { href: '/cv', label: 'CV' },
]

type ScrollState = 'default' | 'hidden' | 'revealed'

const TOP_LOCK_DISTANCE = 72
const HIDE_DISTANCE = 72
const REVEAL_DISTANCE = 16
const MIN_SCROLL_DELTA = 2

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollState, setScrollState] = useState<ScrollState>('default')
  const lastScrollY = useRef(0)
  const scrollAnchor = useRef(0)
  const scrollDirection = useRef<'up' | 'down' | null>(null)
  const scrollStateRef = useRef<ScrollState>('default')
  const isMenuOpenRef = useRef(false)
  const ticking = useRef(false)
  const rafId = useRef<number | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLElement>(null)

  const setScrollStateIfChanged = useCallback((nextState: ScrollState) => {
    if (scrollStateRef.current === nextState) return

    scrollStateRef.current = nextState
    setScrollState(nextState)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen
    const currentScrollY = Math.max(window.scrollY, 0)

    if (isMenuOpen) {
      lastScrollY.current = currentScrollY
      scrollAnchor.current = currentScrollY
      scrollDirection.current = null
      setScrollStateIfChanged('revealed')
      return
    }

    if (currentScrollY <= TOP_LOCK_DISTANCE) {
      lastScrollY.current = currentScrollY
      scrollAnchor.current = currentScrollY
      scrollDirection.current = null
      setScrollStateIfChanged('default')
    }
  }, [isMenuOpen, setScrollStateIfChanged])

  // Scroll detection - stable layout, rAF-throttled, and ref-backed to avoid stale state churn.
  useEffect(() => {
    const updateScrollState = () => {
      ticking.current = false
      rafId.current = null

      const currentScrollY = Math.max(window.scrollY, 0)
      const previousScrollY = lastScrollY.current
      const scrollDelta = currentScrollY - previousScrollY

      if (isMenuOpenRef.current) {
        lastScrollY.current = currentScrollY
        scrollAnchor.current = currentScrollY
        scrollDirection.current = null
        setScrollStateIfChanged('revealed')
        return
      }

      if (currentScrollY <= TOP_LOCK_DISTANCE) {
        lastScrollY.current = currentScrollY
        scrollAnchor.current = currentScrollY
        scrollDirection.current = null
        setScrollStateIfChanged('default')
        return
      }

      if (Math.abs(scrollDelta) < MIN_SCROLL_DELTA) {
        return
      }

      const nextDirection = scrollDelta > 0 ? 'down' : 'up'

      if (scrollDirection.current !== nextDirection) {
        scrollDirection.current = nextDirection
        scrollAnchor.current = previousScrollY
      }

      const distanceFromAnchor = Math.abs(currentScrollY - scrollAnchor.current)

      if (nextDirection === 'down' && distanceFromAnchor >= HIDE_DISTANCE) {
        setScrollStateIfChanged('hidden')
      } else if (nextDirection === 'up' && distanceFromAnchor >= REVEAL_DISTANCE) {
        setScrollStateIfChanged('revealed')
      }

      lastScrollY.current = currentScrollY
    }

    const handleScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(updateScrollState)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollState()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
      ticking.current = false
      rafId.current = null
    }
  }, [setScrollStateIfChanged])

  // Mobile menu focus management and keyboard handling
  useEffect(() => {
    if (!isMenuOpen) return

    const firstLink = mobileMenuRef.current?.querySelector<HTMLAnchorElement>('a[href]')
    firstLink?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        menuButtonRef.current?.focus()
        return
      }

      if (e.key !== 'Tab') return

      const focusable = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen, closeMenu])

  // Prevent body scroll when menu is open (preserve previous overflow)
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const headerClasses = [
    'sticky top-0 z-50 py-6 border-b bg-bg-primary transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform',
    scrollState === 'default' && 'translate-y-0 border-border shadow-none',
    scrollState === 'hidden' && '-translate-y-[calc(100%+1px)] border-transparent shadow-none',
    scrollState === 'revealed' && 'translate-y-0 border-border-subtle shadow-sm',
  ].filter(Boolean).join(' ')

  const headerHeight = 73

  return (
    <>
      <header className={headerClasses}>
        <nav
          aria-label="Main navigation"
          style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', width: '100%', boxSizing: 'border-box' }}
          className="flex items-center justify-between"
        >
          <Link
            href="/"
            className="text-xl font-semibold text-text-primary hover:text-accent transition-colors"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`text-base transition-colors ${
                    isActive(item.href)
                      ? 'text-accent font-medium'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden p-2 -mr-2 text-text-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav
            ref={mobileMenuRef}
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="md:hidden fixed inset-0 bg-bg-primary z-50"
            style={{ top: `${headerHeight}px` }}
          >
            <ul className="flex flex-col py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`block px-6 py-3 text-base transition-colors ${
                      isActive(item.href)
                        ? 'text-accent font-medium bg-bg-secondary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
