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

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollState, setScrollState] = useState<ScrollState>('default')
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Scroll detection
  useEffect(() => {
    const threshold = window.innerWidth < 768 ? 60 : 100

    const updateScrollState = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY.current
      const scrollingUp = currentScrollY < lastScrollY.current

      if (currentScrollY < threshold) {
        setScrollState('default')
      } else if (scrollingDown && currentScrollY > threshold) {
        setScrollState('hidden')
      } else if (scrollingUp) {
        setScrollState('revealed')
      }

      lastScrollY.current = currentScrollY
      ticking.current = false
    }

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollState)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen, closeMenu])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const headerClasses = [
    'py-6 transition-all duration-300 ease-out',
    scrollState === 'default' && 'border-b border-border',
    scrollState === 'hidden' && 'fixed top-0 left-0 right-0 z-50 -translate-y-full',
    scrollState === 'revealed' && 'fixed top-0 left-0 right-0 z-50 translate-y-0 bg-bg-primary shadow-sm',
  ].filter(Boolean).join(' ')

  // Calculate header height for mobile menu offset
  const headerHeight = scrollState === 'default' ? 73 : 73

  return (
    <>
      {/* Spacer when header is fixed */}
      {scrollState !== 'default' && <div className="h-[73px]" aria-hidden="true" />}

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
            type="button"
            className="md:hidden p-2 -mr-2 text-text-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
            aria-label="Menu"
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
            id="mobile-menu"
            className="md:hidden fixed inset-0 bg-bg-primary z-50"
            style={{ top: `${headerHeight}px` }}
          >
            <ul className="flex flex-col py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
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
