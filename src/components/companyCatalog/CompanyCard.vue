<script setup>
import { Icon } from '@iconify/vue'
import ChipList from '@/components/common/ChipList/ChipList.vue'

defineProps({
  company: Object
})
</script>

<template>
  <div class="company-block">
    <img
      :src="company.picture"
      :alt="company.title"
      width="140"
      height="140"
      class="company-block__img"
    />
    <div>
      <RouterLink
        :to="{ name: 'company', params: { company_id: company.id } }"
        class="company-block__title"
        >{{ company.title }}</RouterLink
      >
      <p class="company-block__description">{{ company.description_short }}</p>
      <ChipList
        v-if="company.companySpecializations.length"
        class="company-block__specialization-list"
        :chips="company.companySpecializations"
      />
    </div>
    <Icon icon="fluent:arrow-right-24-filled" class="company-block__icon" />
  </div>
</template>

<style lang="scss">
.company-block {
  pointer-events: none;
  cursor: pointer;
  position: relative;
  z-index: 0;
  background-color: white;

  padding-block: 24px;
  padding-inline: 20px;
  border-radius: 8px;
  transition: all 150ms ease-in-out;

  display: grid;
  gap: 20px;

  @media (min-width: $tablet-width) {
    padding-block: 40px 32px;
    padding-inline: 30px 15px;
    grid-template-columns: 140px auto 24px;
  }

  &:hover,
  &:focus-within {
    background-color: $hover-color;

    .company-block__icon {
      @media (min-width: $tablet-width) {
        opacity: 1;
        left: 0;
      }
    }

    .company-block__title {
      color: $secondary-color;
    }
  }

  &__img {
    width: 140px;
    height: 100px;
    object-fit: contain;
    object-position: top;

    @media (min-width: $tablet-width) {
      width: 100%;
      height: auto;
    }
  }

  &__title {
    pointer-events: auto;
    font-size: 20px;
    color: $primary-color;
    display: block;
    transition: all 150ms ease-in-out;
    margin-block-end: 10px;

    @media (min-width: $tablet-width) {
      font-size: 24px;
      margin-block-end: 16px;
    }

    &:focus {
      outline: none;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
    }
  }

  &__description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    font-size: 14px;
  }

  &__specialization-list {
    margin-block-start: 16px;
  }

  &__icon {
    position: relative;
    top: 14px;
    left: -6px;
    opacity: 0;
    width: 24px;
    height: 24px;
    color: $secondary-color;
    align-self: flex-end;
    transition: all 150ms ease-in-out;
    display: none;

    @media (min-width: $tablet-width) {
      display: inline;
    }
  }
}
</style>
