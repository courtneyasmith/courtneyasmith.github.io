import { ref, onMounted, onBeforeUnmount } from 'vue'

export type ScrollState = 'default' | 'hidden' | 'revealed'

const TOP_LOCK_DISTANCE = 72
const HIDE_DISTANCE = 72
const REVEAL_DISTANCE = 16
const MIN_SCROLL_DELTA = 2

export function useScrollDirection() {
  const scrollState = ref<ScrollState>('default')
  let lastScrollY = 0
  let scrollAnchor = 0
  let direction: 'up' | 'down' | null = null
  let menuOpen = false
  let ticking = false
  let rafId: number | null = null

  function set(next: ScrollState) {
    if (scrollState.value !== next) scrollState.value = next
  }

  function update() {
    ticking = false
    rafId = null
    const y = Math.max(window.scrollY, 0)
    const prev = lastScrollY
    const delta = y - prev

    if (menuOpen) {
      lastScrollY = y; scrollAnchor = y; direction = null
      set('revealed'); return
    }
    if (y <= TOP_LOCK_DISTANCE) {
      lastScrollY = y; scrollAnchor = y; direction = null
      set('default'); return
    }
    if (Math.abs(delta) < MIN_SCROLL_DELTA) return

    const next = delta > 0 ? 'down' : 'up'
    if (direction !== next) { direction = next; scrollAnchor = prev }
    const dist = Math.abs(y - scrollAnchor)
    if (next === 'down' && dist >= HIDE_DISTANCE) set('hidden')
    else if (next === 'up' && dist >= REVEAL_DISTANCE) set('revealed')
    lastScrollY = y
  }

  function onScroll() {
    if (!ticking) { rafId = requestAnimationFrame(update); ticking = true }
  }

  function setMenuOpen(open: boolean) {
    menuOpen = open
    const y = Math.max(window.scrollY, 0)
    if (open) {
      lastScrollY = y; scrollAnchor = y; direction = null
      set('revealed')
    } else if (y <= TOP_LOCK_DISTANCE) {
      lastScrollY = y; scrollAnchor = y; direction = null
      set('default')
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    if (rafId !== null) cancelAnimationFrame(rafId)
  })

  return { scrollState, setMenuOpen }
}
