<script setup>
import SimpleLink from '@/components/common/SimpleLink/SimpleLink.vue'
import SimpleButton from '@/components/common/SimpleButton/SimpleButton.vue'
import { footerLinks } from '@/data/footer-links'
</script>

<template>
  <footer class="footer container-self">
    <nav class="footer__nav">
      <ul class="footer__nav-section" v-for="section of footerLinks.nav" :key="section.label">
        <li>
          <SimpleLink :as="section.to ? 'RouterLink' : 'a'" :href="section.href" :to="section.to">{{
            section.label
          }}</SimpleLink>
        </li>
        <li v-for="link of section.children" :key="link.label">
          <hr v-if="link.as == 'divider'" class="footer__nav-divider" />
          <SimpleButton
            v-else-if="link.as == 'button'"
            :secondary="link.secondary"
            class="footer__nav-button"
            >{{ link.label }}</SimpleButton
          >
          <SimpleLink
            v-else
            :as="link.to ? 'RouterLink' : 'a'"
            :href="link.href"
            :to="link.to"
            class="footer__nav-link"
            >{{ link.label }}</SimpleLink
          >
        </li>
      </ul>
    </nav>
    <div class="footer__project-info project-info">
      <ul class="project-info__socials">
        <li v-for="link of footerLinks.social" :key="link.label">
          <SimpleLink :href="link.href" target="_blank" class="project-info__social-link">
            <img
              :src="link.img.src"
              :alt="link.label"
              :height="link.img.size.height"
              :width="link.img.size.width"
            />
          </SimpleLink>
        </li>
      </ul>
      <div class="project-info__files">
        <li>
          <SimpleLink href="#">О проекте </SimpleLink>
        </li>
        <li>
          <SimpleLink href="#">Пользовательское соглашение </SimpleLink>
        </li>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  padding-block: 40px;

  background-color: white;
  border-block-start: 1px solid $header-border-color;

  @media (min-width: $tablet-width) {
    padding-block-start: 80px;
    padding-block-end: 88px;
  }

  &__nav {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;

    @media (min-width: $tablet-width) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: $desktop-width) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  &__nav-section {
    display: flex;
    flex-direction: column;
    gap: 16px 0;
  }

  &__nav-divider {
    border: none;
  }

  &__nav-button {
    font-size: 14px;
  }

  &__nav-link {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    color: $secondary-text-color;
  }

  &__project-info {
    margin-block-start: 40px;

    @media (min-width: $desktop-width) {
      margin-block-start: 18px;
    }
  }
}

.project-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px 40px;

  @media (min-width: $tablet-width) {
    flex-direction: row;
  }

  &__socials,
  &__files {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__socials {
    gap: 0 20px;
  }

  &__files {
    gap: 0 34px;
    flex-wrap: wrap;
    font-size: 12px;
    color: $additional-text-color;
  }

  &__social-link {
    display: inline-flex;
  }
}
</style>
