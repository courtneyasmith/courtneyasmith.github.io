import { Fragment } from 'react'

interface FormattedAuthorsProps {
  authors: string
  highlightName?: string
}

function parseAuthors(authors: string): string[] {
  return authors
    .split(',')
    .map((author) => author.trim())
    .filter(Boolean)
    .reduce<string[]>((parsedAuthors, author) => {
      if (/^[A-Z]{1,4}$/.test(author) && parsedAuthors.length > 0) {
        parsedAuthors[parsedAuthors.length - 1] += ` ${author}`
        return parsedAuthors
      }

      parsedAuthors.push(author)
      return parsedAuthors
    }, [])
}

export function FormattedAuthors({
  authors,
  highlightName = 'Smith CA',
}: FormattedAuthorsProps) {
  const parsedAuthors = parseAuthors(authors)

  return (
    <>
      {parsedAuthors.map((author, index) => {
        const isHighlighted = author === highlightName
        const isLast = index === parsedAuthors.length - 1

        return (
          <Fragment key={`${author}-${index}`}>
            <span className="inline-block whitespace-nowrap">
              {isHighlighted ? (
                <strong className="font-semibold">{author}</strong>
              ) : (
                author
              )}
              {!isLast && ','}
            </span>
            {!isLast && ' '}
          </Fragment>
        )
      })}
    </>
  )
}
