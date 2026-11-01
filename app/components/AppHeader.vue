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

const header = ref<HTMLElement | null>(null)
// The menu opens right under the header, measured on opening: the header is 89px on phones and taller where the name wraps, so the old fixed 73px covered its lower edge
const menuTop = ref(0)

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
    menuTop.value = header.value?.offsetHeight ?? 0
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
  <header ref="header" :class="headerClasses">
    <!-- Inline links start at lg, where the font toggle has room for its label; below that, phones and tablets get the menu button and the toggle spelled out in the menu -->
    <nav
      aria-label="Main navigation"
      class="flex items-center justify-between mx-auto w-full max-w-[1100px] px-6"
    >
      <!-- On phones the name scales from 16px at 360 wide to 20px, so it, the font toggle and the menu button share one line (narrower screens wrap it in balanced lines); tracking-normal keeps the reading font's extra letter spacing off the wordmark -->
      <NuxtLink to="/" class="text-balance tracking-normal text-[length:clamp(1rem,7.25vw_-_0.62rem,1.25rem)] md:text-xl font-semibold text-text-primary hover:text-accent transition-colors">
        {{ siteConfig.name }}
      </NuxtLink>

      <div class="flex items-center gap-1 lg:gap-6">
        <ul class="hidden lg:flex items-center gap-6">
          <li v-for="item in navItems" :key="item.href">
            <NuxtLink
              :to="item.href"
              :aria-current="isActive(item.href) ? 'page' : undefined"
              :class="['text-base transition-colors', isActive(item.href) ? 'text-accent font-medium' : 'text-text-secondary hover:text-text-primary']"
            >{{ item.label }}</NuxtLink>
          </li>
        </ul>

        <ReadingFontToggle />

        <button
          ref="menuButton"
          type="button"
          class="lg:hidden p-2 -mr-2 text-text-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
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
      </div>
    </nav>

    <nav
      v-if="isMenuOpen"
      id="mobile-menu"
      ref="mobileMenu"
      aria-label="Mobile navigation"
      class="lg:hidden fixed left-0 right-0 bg-bg-primary z-50"
      :style="{ top: `${menuTop}px`, height: `calc(100dvh - ${menuTop}px)` }"
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
      <div class="mx-6 border-t border-border-subtle" />
      <ReadingFontToggle variant="row" class="mt-4" />
    </nav>
  </header>
</template>
