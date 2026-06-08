export function parseAuthors(authors: string): string[] {
  return authors
    .split(',')
    .map((author) => author.trim())
    .filter(Boolean)
    .reduce<string[]>((parsed, author) => {
      if (/^[A-Z]{1,4}$/.test(author) && parsed.length > 0) {
        parsed[parsed.length - 1] += ` ${author}`
        return parsed
      }
      parsed.push(author)
      return parsed
    }, [])
}
