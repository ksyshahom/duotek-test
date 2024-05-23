<script setup>
import SimpleLink from '@/components/common/SimpleLink/SimpleLink.vue'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps({
  navLinks: {
    type: Array,
    required: true
  },
  opened: Boolean
})

defineEmits(['closeMenu'])

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)
</script>

<template>
  <Teleport :disabled="!isMobile" to="body">
    <div v-if="!isMobile || opened" class="header-menu">
      <SimpleLink as="button" @click="$emit('closeMenu')" class="header-menu__close-button">
        <span class="header-menu__close-button-label">Закрыть меню</span>
        <Icon icon="ic:round-close" class="header-menu__close-button-img" />
      </SimpleLink>
      <nav>
        <ul class="header-menu__list">
          <li v-for="link of navLinks" :key="link.label">
            <SimpleLink
              :as="link.to ? 'RouterLink' : 'a'"
              :href="link.href"
              :to="link.to"
              :active="link.to ? link.to.name == route.name : false"
              @click="$emit('closeMenu')"
              >{{ link.label }}</SimpleLink
            >
          </li>
          <template v-if="isMobile">
            <li><hr class="header-menu__divider" /></li>
            <li>
              <SimpleLink href="#" @click="$emit('closeMenu')">Вход и регистрация</SimpleLink>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </Teleport>
</template>

<style lang="scss">
.header-menu {
  position: fixed;
  inset: 0;
  z-index: 2;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;

  @media (min-width: $tablet-width) {
    position: static;
    display: block;
    background-color: transparent;
    padding: 0;
  }

  &__close-button {
    align-self: flex-end;
    margin-block-end: 20px;

    @media (min-width: $tablet-width) {
      display: none;
    }
  }

  &__close-button-label {
    @include visually-hidden;
  }

  &__close-button-img {
    width: 24px;
    height: 24px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-wrap: wrap;

    @media (min-width: $tablet-width) {
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    @media (min-width: $desktop-width) {
      gap: 20px 40px;
    }
  }

  &__divider {
    border: none;
  }
}
</style>
