import { siteConfig } from '@/data/site-config'

export function Footer() {
  const socialLinks = [
    { url: siteConfig.googleScholar, label: 'Google Scholar' },
    { url: siteConfig.orcid, label: 'ORCID' },
    { url: siteConfig.github, label: 'GitHub' },
  ].filter((link) => link.url)

  return (
    <footer className="py-8 mt-12 border-t border-border">
      <div className="text-center">
        <p className="font-medium text-text-primary">{siteConfig.name}</p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-sm text-text-secondary hover:text-accent transition-colors"
        >
          {siteConfig.email}
        </a>

        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-4 mt-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <p className="text-sm text-text-secondary mt-4">&copy; 2026</p>
      </div>
    </footer>
  )
}
