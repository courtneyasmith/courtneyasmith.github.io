interface ContainerProps {
  size?: 'prose' | 'content' | 'full'
  children: React.ReactNode
  className?: string
}

const sizeMaxWidths = {
  prose: '42rem',    // 672px — optimal for text-heavy pages
  content: '56rem',  // 896px — mixed content with room for sidebars
  full: '64rem',     // 1024px — grid layouts, maximum content width
} as const

/**
 * Centered wrapper with responsive horizontal padding.
 * Controls max-width for content while maintaining readable line lengths.
 * Uses inline styles to ensure compatibility with Tailwind v4.
 */
export function Container({
  size = 'content',
  children,
  className = '',
}: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth: sizeMaxWidths[size],
        marginInline: 'auto',
        paddingInline: 'clamp(1.5rem, 5vw, 3rem)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  )
}
