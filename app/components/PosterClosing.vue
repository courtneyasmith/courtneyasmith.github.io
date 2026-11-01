<script setup lang="ts">
// Each poster page passes its own column width and the card whose note names that meeting
withDefaults(defineProps<{ columnClass?: string; vcard?: string }>(), {
  columnClass: '',
  vcard: '/courtney-a-smith.vcf',
})

// Credentials stay together, so a phone wraps after "Smith," instead of leaving "MS" alone on a line
const [closingPerson, ...closingCredentials] = siteConfig.name.split(', ')
</script>

<template>
  <section class="closing" aria-labelledby="closing-heading">
    <Container size="prose" :class="columnClass">
      <div class="closing-head">
        <img src="/images/headshot_2025-09-23_192.jpg" alt="" width="80" height="80" class="closing-photo">
        <div>
          <h2 id="closing-heading" class="closing-name">{{ closingPerson }}, <span class="nowrap">{{ closingCredentials.join(', ') }}</span></h2>
          <p class="closing-role">Incoming dermatology resident, Harvard Combined Dermatology Residency</p>
        </div>
      </div>
      <p class="closing-bio">I build computational tools to understand and reduce disparities in dermatologic care access, burden, and outcomes.</p>
      <div class="closing-actions">
        <!-- No download attribute: iOS Safari only offers the contact preview for a plain link -->
        <a :href="vcard" class="btn-primary">Add to contacts</a>
        <a :href="`mailto:${siteConfig.email}`" class="btn-secondary">Email me</a>
      </div>
      <p class="closing-links">
        <NuxtLink to="/">Website</NuxtLink>
        <NuxtLink to="/research">Research</NuxtLink>
        <NuxtLink to="/publications">Publications</NuxtLink>
        <a :href="siteConfig.cvPdfPath" target="_blank" rel="noopener noreferrer">CV (PDF)</a>
      </p>
    </Container>
  </section>
</template>

<style scoped>
/* The poster pages run paragraphs to the column edge, not the global 65ch cap */
p {
  max-width: none;
}

.nowrap {
  white-space: nowrap;
}

.closing {
  margin-top: 4.5rem;
  padding-block: 3rem;
  border-top: 1px solid var(--color-border-subtle);
  background-color: var(--color-bg-secondary);
}

.closing-head {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.closing-photo {
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  object-fit: cover;
}

.closing-name {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
}

.closing-role {
  margin-top: 0.25rem;
  font-size: 0.9375rem;
  line-height: 1.45;
  color: var(--color-text-secondary);
}

.closing-bio {
  margin-top: 1.25rem;
  line-height: 1.7;
}

.closing-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.closing-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  margin-top: 1.5rem;
  font-size: 0.9375rem;
}

@media (min-width: 640px) {
  .closing-head {
    gap: 1.25rem;
  }

  .closing-photo {
    width: 5rem;
    height: 5rem;
  }
}
</style>
