import { ref, computed, onMounted, onBeforeUnmount, type Ref } from 'vue'

type Direction = 'up' | 'down' | 'left' | 'right'

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
}

export function useScrollReveal(
  el: Ref<HTMLElement | null>,
  opts: { direction?: Direction; delay?: number; duration?: number } = {},
) {
  const { direction = 'up', delay = 0, duration = 0.7 } = opts
  const visible = ref(false)
  const reduced = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el.value) {
      visible.value = true
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.value = true
            observer?.disconnect()
          }
        }
      },
      { rootMargin: '-100px' },
    )
    observer.observe(el.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  const style = computed(() => {
    // Reduced motion: fade only, no slide (drops vestibular-triggering transform).
    if (reduced.value) {
      return {
        opacity: visible.value ? 1 : 0,
        transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }
    }
    const o = offsets[direction]
    return {
      opacity: visible.value ? 1 : 0,
      transform: visible.value ? 'translate(0,0)' : `translate(${o.x}px, ${o.y}px)`,
      transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }
  })

  return { style }
}
