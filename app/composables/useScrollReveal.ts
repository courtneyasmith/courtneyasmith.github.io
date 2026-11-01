import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

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
  let observer: IntersectionObserver | null = null

  onMounted(() => {
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

  // The hidden start state lives in main.css behind the reveal-ready class the head script sets, so server HTML stays readable when scripts never run; this only feeds it the offset and timing. Reduced motion drops the slide there too, in CSS, because the server cannot know the preference
  const o = offsets[direction]
  const style = {
    '--reveal-x': `${o.x}px`,
    '--reveal-y': `${o.y}px`,
    transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  }

  return { style, visible }
}
