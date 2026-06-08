<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)
const { scrollState, setMenuOpen } = useScrollDirection()

const menuButton = ref<HTMLButtonElement | null>(null)
const mobileMenu = ref<HTMLElement | null>(null)

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/about', label: 'About' },
  { href: '/cv', label: 'CV' },
]

function isActive(href: string) {
  return href === '/' ? route.path === '/' : route.path.startsWith(href)
}
function closeMenu() { isMenuOpen.value = false }

const headerClasses = computed(() => [
  'sticky top-0 z-50 py-6 border-b bg-bg-primary transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform',
  scrollState.value === 'default' && 'translate-y-0 border-border shadow-none',
  scrollState.value === 'hidden' && '-translate-y-[calc(100%+1px)] border-transparent shadow-none',
  scrollState.value === 'revealed' && 'translate-y-0 border-border-subtle shadow-sm',
])

const headerHeight = 73

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeMenu()
    menuButton.value?.focus()
    return
  }
  if (e.key !== 'Tab') return
  const focusable = mobileMenu.value?.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )
  if (!focusable || focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
}

watch(isMenuOpen, (open) => {
  setMenuOpen(open)
  if (open) {
    const prevOverflow = document.body.style.overflow
    document.body.dataset.prevOverflow = prevOverflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeydown)
    nextTick(() => mobileMenu.value?.querySelector<HTMLAnchorElement>('a[href]')?.focus())
  } else {
    document.body.style.overflow = document.body.dataset.prevOverflow ?? ''
    document.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header :class="headerClasses">
    <nav
      aria-label="Main navigation"
      class="flex items-center justify-between"
      :style="{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', width: '100%', boxSizing: 'border-box' }"
    >
      <NuxtLink to="/" class="text-xl font-semibold text-text-primary hover:text-accent transition-colors">
        {{ siteConfig.name }}
      </NuxtLink>

      <ul class="hidden md:flex items-center gap-6">
        <li v-for="item in navItems" :key="item.href">
          <NuxtLink
            :to="item.href"
            :aria-current="isActive(item.href) ? 'page' : undefined"
            :class="['text-base transition-colors', isActive(item.href) ? 'text-accent font-medium' : 'text-text-secondary hover:text-text-primary']"
          >{{ item.label }}</NuxtLink>
        </li>
      </ul>

      <button
        ref="menuButton"
        type="button"
        class="md:hidden p-2 -mr-2 text-text-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path v-if="isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>

    <nav
      v-if="isMenuOpen"
      id="mobile-menu"
      ref="mobileMenu"
      aria-label="Mobile navigation"
      class="md:hidden fixed left-0 right-0 bg-bg-primary z-50"
      :style="{ top: `${headerHeight}px`, height: `calc(100dvh - ${headerHeight}px)` }"
    >
      <ul class="flex flex-col py-4">
        <li v-for="item in navItems" :key="item.href">
          <NuxtLink
            :to="item.href"
            :aria-current="isActive(item.href) ? 'page' : undefined"
            :class="['block px-6 py-3 text-base transition-colors', isActive(item.href) ? 'text-accent font-medium bg-bg-secondary' : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary']"
            @click="closeMenu"
          >{{ item.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
