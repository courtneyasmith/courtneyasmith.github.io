<script setup lang="ts">
const featuredPublicationIds = [
  'acne-incidence-and-severity-in-transgender-individuals',
  'incidence-of-hidradenitis-suppurativa-in-transgender-and-cisgender-individuals-a',
  'permanent-hair-removal-in-gender-diverse-adults-assigned-male-at-birth-a-cross-s',
  'smoking-cessation-and-persistence-in-skin-cancer-survivors-a-cross-sectional-stu',
  'video-synchronous-isotretinoin-management-is-associated-with-lower-risk-of-patie',
]

const selectedPublications = featuredPublicationIds
  .map((id) => publications.find((p) => p.id === id))
  .filter((p): p is (typeof publications)[number] => p !== undefined && p.kind !== 'submitted')
</script>

<template>
  <div>
    <Hero />

    <section class="py-16">
      <div class="mx-auto w-full max-w-[1100px] px-6">
        <ScrollReveal>
          <h2 class="mb-8 text-2xl font-semibold">
            Research
          </h2>
        </ScrollReveal>

        <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
          <ResearchThemeCard
            v-for="(theme, index) in researchThemes.slice(0, 3)"
            :key="theme.id"
            :theme="theme"
            :index="index"
          />
        </div>
      </div>
    </section>

    <section class="bg-bg-secondary py-16">
      <div class="mx-auto w-full max-w-[800px] px-6">
        <ScrollReveal>
          <h2 class="mb-8 text-2xl font-semibold">
            Selected Publications
          </h2>
        </ScrollReveal>

        <ScrollReveal :delay="0.1">
          <div class="rounded-lg border border-border-subtle bg-bg-primary p-6">
            <PublicationItem v-for="pub in selectedPublications" :key="pub.id" :publication="pub" />
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="0.15">
          <p class="mt-6">
            <NuxtLink
              to="/publications"
              class="inline-flex items-center gap-1 text-accent hover:text-accent-hover"
            >
              View all publications <span aria-hidden="true">→</span>
            </NuxtLink>
          </p>
        </ScrollReveal>
      </div>
    </section>
  </div>
</template>
