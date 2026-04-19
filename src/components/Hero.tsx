"use client"

import Image from 'next/image'
import { siteConfig } from '@/data/site-config'
import { SocialLinks } from './SocialLinks'
import { ScrollReveal } from './animation/ScrollReveal'

const heroBio = `My research focuses on dermatologic epidemiology and health equity, with an emphasis on acne and hidradenitis suppurativa. I build computational tools that support research to address unmet care needs in dermatology. Alongside collaborators who share these goals, this work has contributed to an evidence base for inclusive dermatologic care, with publications in JAMA Dermatology, JAAD, and other high-impact journals.`

export function Hero() {
  return (
    <section className="bg-bg-hero" style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', width: '100%', boxSizing: 'border-box' }}>
        <ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}
               className="md:flex-row md:items-start md:text-left md:gap-10">
            {/* Modest circular headshot */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ position: 'relative', width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e5e5e5' }}>
                <Image
                  src="/images/headshot_2025-09-23.jpg"
                  alt={siteConfig.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  priority
                  sizes="140px"
                />
              </div>
            </div>

            {/* Text content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
                {siteConfig.name}
              </h1>
              <p style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
                Future Physician-Scientist
              </p>
              <p style={{ marginTop: '1rem', lineHeight: 1.7, maxWidth: '600px' }}>
                {heroBio}
              </p>
              <SocialLinks className="mt-5" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
