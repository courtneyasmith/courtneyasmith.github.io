<script setup lang="ts">
const isVisible = ref(false)
let ticking = false
let rafId: number | null = null

function update() {
  isVisible.value = window.scrollY > 400
  ticking = false
  rafId = null
}
function onScroll() {
  if (!ticking) {
    rafId = requestAnimationFrame(update)
    ticking = true
  }
}
function scrollToTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  update()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <button
    v-if="isVisible"
    type="button"
    aria-label="Scroll to top"
    class="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-10 h-10 rounded-full flex items-center justify-center bg-scroll-btn text-bg-primary transition-all duration-200 ease-out hover:scale-[1.02] hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
    @click="scrollToTop"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
    </svg>
  </button>
</template>
