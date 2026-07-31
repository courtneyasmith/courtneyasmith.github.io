<script setup lang="ts">
const heroBio = `I've focused on dermatologic epidemiology and health equity, with an emphasis on acne and hidradenitis suppurativa. I build computational tools that address unmet care needs in dermatology. Alongside collaborators who share these goals, this work has contributed to an evidence base for inclusive dermatologic care, with publications in JAMA Dermatology, JAAD, and other high-impact journals.`
</script>

<template>
  <section class="bg-bg-hero py-16">
    <div class="mx-auto w-full max-w-[900px] px-6">
      <ScrollReveal>
        <div class="flex flex-col items-center gap-6 text-center">
          <div class="shrink-0">
            <div class="relative h-[140px] w-[140px] overflow-hidden rounded-full border-2 border-border">
              <img
                src="/images/headshot_2025-09-23.jpg"
                :alt="siteConfig.name"
                width="140"
                height="140"
                class="h-full w-full object-cover object-top"
              >
            </div>
          </div>

          <div class="min-w-0 flex-1">
            <h1 class="text-4xl font-bold leading-[1.2] tracking-tight">
              {{ siteConfig.name }}
            </h1>
            <p class="mt-2 text-lg text-text-secondary">
              {{ siteConfig.title }}
            </p>
            <p class="mt-4 max-w-[600px] leading-[1.7]">
              {{ heroBio }}
            </p>
            <SocialLinks class="mt-5" />
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>
