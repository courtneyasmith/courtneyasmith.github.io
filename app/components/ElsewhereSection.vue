<template>
  <section id="beyond" class="scroll-mt-24 pt-4 pb-12">
    <div>
      <ScrollReveal>
        <h2 class="font-semibold text-text-primary text-[clamp(1.25rem,3vw,1.5rem)]">
          People who inspire me
        </h2>
      </ScrollReveal>

      <ul class="mt-5 flex flex-wrap gap-2">
        <li v-for="(person, index) in influences" :key="person.name">
          <ScrollReveal :delay="0.1 + 0.05 * index" :duration="0.5">
            <span class="pill">
              <span class="pill-name">{{ person.name }}</span>
              <span class="pill-role-track">
                <span class="pill-role">{{ person.role }}</span>
              </span>
            </span>
          </ScrollReveal>
        </li>
      </ul>
    </div>

    <div class="mt-12">
      <ScrollReveal>
        <h2 class="font-semibold text-text-primary text-[clamp(1.25rem,3vw,1.5rem)]">
          Things that Bring Joy
        </h2>
      </ScrollReveal>

      <ScrollReveal :delay="0.1">
        <dl class="mt-5">
          <div
            v-for="item in favorites"
            :key="item.label"
            class="favorite grid grid-cols-[100px_1fr] gap-3 py-2"
          >
            <dt class="favorite-label pt-0.5 text-sm text-text-muted">
              {{ item.label }}
            </dt>
            <dd class="text-text-primary leading-relaxed">
              {{ item.detail }}
            </dd>
          </div>
        </dl>
      </ScrollReveal>
    </div>
  </section>
</template>

<style scoped>
/* The solid fill is a gradient layer so it can sweep left-to-right, in the same direction the pill opens. */
.pill {
  display: inline-flex;
  align-items: baseline;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  background-color: var(--color-accent-subtle);
  background-image: linear-gradient(var(--color-accent), var(--color-accent));
  background-repeat: no-repeat;
  background-size: 0% 100%;
  color: var(--color-accent);
  font-weight: 500;
  line-height: 1.4;
  cursor: default;
  transition: background-size 400ms cubic-bezier(0.22, 1, 0.36, 1), color 250ms ease-out, transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* A 0fr to 1fr grid column animates width without measuring the text in JavaScript. */
.pill-role-track {
  display: grid;
  grid-template-columns: 1fr;
  transition: grid-template-columns 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

.pill-role {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 400;
  opacity: 0.85;
  transition: opacity 250ms ease-out 100ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

@media (hover: hover) {
  .pill-role-track {
    grid-template-columns: 0fr;
  }

  .pill-role {
    opacity: 0;
    transform: translateX(-0.5rem);
  }

  li:hover .pill {
    background-size: 100% 100%;
    color: var(--color-bg-primary);
    transform: translateY(-2px);
  }

  li:hover .pill-role-track {
    grid-template-columns: 1fr;
  }

  li:hover .pill-role {
    opacity: 0.9;
    transform: translateX(0);
  }

  .favorite-label {
    transition: color 200ms ease-out;
  }

  .favorite:hover .favorite-label {
    color: var(--color-text-secondary);
  }
}
</style>
