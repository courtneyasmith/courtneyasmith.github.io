<script setup lang="ts">
const heroBio = `My research focuses on dermatologic epidemiology and health equity, with an emphasis on acne and hidradenitis suppurativa. I build computational tools that support research to address unmet care needs in dermatology. Alongside collaborators who share these goals, this work has contributed to an evidence base for inclusive dermatologic care, with publications in JAMA Dermatology, JAAD, and other high-impact journals.`
</script>

<template>
  <section class="bg-bg-hero" :style="{ padding: '4rem 0' }">
    <div :style="{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', width: '100%', boxSizing: 'border-box' }">
      <ScrollReveal>
        <div
          class="md:flex-row md:items-start md:text-left md:gap-10"
          :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }"
        >
          <div :style="{ flexShrink: 0 }">
            <div :style="{ position: 'relative', width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e5e5e5' }">
              <img
                src="/images/headshot_2025-09-23.jpg"
                :alt="siteConfig.name"
                width="140"
                height="140"
                :style="{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }"
              >
            </div>
          </div>

          <div :style="{ flex: 1, minWidth: 0 }">
            <h1 :style="{ fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2 }">
              {{ siteConfig.name }}
            </h1>
            <p :style="{ marginTop: '0.5rem', fontSize: '1.125rem', color: 'var(--color-text-secondary)' }">
              Physician-Scientist
            </p>
            <p :style="{ marginTop: '1rem', lineHeight: 1.7, maxWidth: '600px' }">
              {{ heroBio }}
            </p>
            <SocialLinks class="mt-5" />
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>
