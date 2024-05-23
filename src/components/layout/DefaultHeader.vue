<script setup>
import SimpleLink from '@/components/common/SimpleLink/SimpleLink.vue'
import DefaultHeaderNav from '@/components/layout/DefaultHeaderNav.vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()

const navLinks = [
  { label: 'Тендеры', href: '#' },
  { label: 'Компании', to: { name: 'company-list' } },
  { label: 'Продукты', href: '#' },
  { label: 'Кейсы', href: '#' },
  { label: 'Блог', href: '#' }
]

const isPageFromHeaderNav = (pageName) =>
  pageName && navLinks.some((link) => link.to?.name === pageName)

// определяет, темный ли отображать хедер, темный если находимся на одной из страниц, на которые есть ссылка в меню хедера
const darkHeader = ref(isPageFromHeaderNav(route.name))
const logoImgSrc = ref(
  isPageFromHeaderNav(route.name) ? '/img/logo-light.svg' : '/img/logo-dark.svg'
)

watch(
  () => route.name,
  (newName) => {
    darkHeader.value = isPageFromHeaderNav(newName)
    logoImgSrc.value = isPageFromHeaderNav(newName) ? '/img/logo-light.svg' : '/img/logo-dark.svg'
  }
)

const isNavMenuOpened = ref(false)
</script>

<template>
  <header class="header container-self" :class="{ header_dark: darkHeader }">
    <RouterLink
      :to="{ name: 'home' }"
      :aria-current="route.name == 'home' ? 'page' : undefined"
      class="header__logo-link"
    >
      <img :src="logoImgSrc" alt="На главную" width="160" height="50" class="header__logo-img" />
    </RouterLink>

    <DefaultHeaderNav
      :nav-links="navLinks"
      :opened="isNavMenuOpened"
      @close-menu="isNavMenuOpened = false"
    />

    <SimpleLink href="#" class="header__login">
      <span class="header__login-label">Вход и регистрация</span>
      <Icon icon="ic:round-login" class="header__login-img" />
    </SimpleLink>

    <SimpleLink as="button" class="header__menu-button" @click="isNavMenuOpened = true">
      <span class="header__menu-button-label">Открыть меню</span>
      <Icon icon="ic:round-menu" class="header__menu-button-img" />
    </SimpleLink>
  </header>
</template>

<style lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 1;

  padding-block-start: 22px;
  padding-block-end: 24px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0 40px;

  border-block-end: 1px solid $header-border-color;
  background-color: white;
  color: $primary-color;

  &_dark {
    background-color: $primary-color;
    color: white;
  }

  &__logo-link {
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 0;
    transition: all 150ms ease-in-out;

    &:focus {
      outline: none;
    }
    &:focus-visible {
      outline: 1px solid $primary-color;
    }

    &:not([aria-current='page']) {
      &:hover,
      &:focus-visible {
        opacity: 0.6;
      }

      &:active {
        opacity: 0.3;
      }
    }

    &[aria-current='page'] {
      cursor: default;
    }
  }

  &__logo-img {
    color: $primary-color;
    width: 80px;
    height: 25px;

    @media (min-width: $desktop-width) {
      width: 160px;
      height: 50px;
    }
  }

  &__login {
    display: none;

    @media (min-width: $tablet-width) {
      display: inline-flex;
    }
  }

  &__login-label {
    @include visually-hidden;

    @media (min-width: $desktop-width) {
      @include not-visually-hidden;
    }
  }

  &__login-img {
    width: 24px;
    height: 24px;

    @media (min-width: $desktop-width) {
      display: none;
    }
  }

  &__menu-button {
    display: inline-flex;

    @media (min-width: $tablet-width) {
      display: none;
    }
  }

  &__menu-button-label {
    @include visually-hidden;
  }

  &__menu-button-img {
    width: 24px;
    height: 24px;
  }
}
</style>
