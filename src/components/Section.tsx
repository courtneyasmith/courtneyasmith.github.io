import { type ReactNode } from 'react'

interface SectionProps {
  title?: string
  id?: string
  as?: 'section' | 'article' | 'div'
  children: ReactNode
  className?: string
}

/**
 * Structural component for consistent vertical padding and optional section headings.
 * Creates visual rhythm between major page blocks through whitespace.
 */
export function Section({
  title,
  id,
  as: Component = 'section',
  children,
  className = '',
}: SectionProps) {
  return (
    <Component id={id} className={`py-16 ${className}`.trim()}>
      {title && (
        <h2
          className="font-semibold mb-6 text-text-primary"
          style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}
        >
          {title}
        </h2>
      )}
      {children}
    </Component>
  )
}
