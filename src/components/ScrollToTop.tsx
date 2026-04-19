'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const isVisibleRef = useRef(false)
  const ticking = useRef(false)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const updateVisibility = () => {
      const nextVisible = window.scrollY > 400

      if (nextVisible !== isVisibleRef.current) {
        isVisibleRef.current = nextVisible
        setIsVisible(nextVisible)
      }

      ticking.current = false
      rafId.current = null
    }

    const handleScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(updateVisibility)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateVisibility()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  const scrollToTop = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })
  }, [])

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40
                 w-10 h-10 rounded-full
                 flex items-center justify-center
                 transition-all duration-200 ease-out
                 hover:scale-[1.02] hover:opacity-80
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
      style={{
        backgroundColor: 'var(--color-scroll-btn)',
        color: 'var(--color-bg-primary)'
      }}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  )
}
