interface PageHeaderProps {
  title: string
  intro?: string
  centered?: boolean
}

/**
 * Consistent page header with H1 title and optional intro paragraph.
 * Used across all inner pages for visual consistency.
 */
export function PageHeader({ title, intro, centered = false }: PageHeaderProps) {
  return (
    <header className={`pt-12 pb-8 ${centered ? 'text-center' : ''}`}>
      <h1
        className="font-semibold text-text-primary"
        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
      >
        {title}
      </h1>
      {intro && (
        <p
          className={`mt-4 text-text-secondary leading-relaxed ${centered ? 'mx-auto' : ''}`}
          style={{ maxWidth: '65ch' }}
        >
          {intro}
        </p>
      )}
    </header>
  )
}
