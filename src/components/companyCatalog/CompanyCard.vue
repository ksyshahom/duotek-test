<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  company: Object
})
</script>

<template>
  <div class="candidate-block">
    <div class="candidate-block__img-wrapper">
      <img
        :src="company.picture"
        :alt="company.title"
        width="140"
        height="140"
        class="candidate-block__img"
      />
    </div>
    <div>
      <RouterLink
        :to="{ name: 'company', params: { company_id: company.id } }"
        class="candidate-block__title"
        >{{ company.title }}</RouterLink
      >
      <p class="candidate-block__description">{{ company.description_short }}</p>
      <ul v-if="company.companySpecializations.length" class="candidate-block__specialization-list">
        <li
          v-for="specialization of company.companySpecializations"
          :key="specialization.id"
          class="candidate-block__specialization-item"
        >
          {{ specialization.title }}
        </li>
      </ul>
    </div>
    <Icon icon="fluent:arrow-right-24-filled" class="candidate-block__icon" />
  </div>
</template>

<style lang="scss">
.candidate-block {
  pointer-events: none;
  cursor: pointer;
  position: relative;
  z-index: 0;
  background-color: white;

  padding-block: 40px 32px;
  padding-inline: 30px 15px;
  border-radius: 8px;

  display: grid;
  gap: 20px;
  grid-template-columns: 140px auto 24px;

  &:hover,
  &:focus-within {
    background-color: $hover-color;

    .candidate-block__icon {
      opacity: 1;
    }

    .candidate-block__title {
      color: $secondary-color;
    }
  }

  &__img-wrapper {
    width: 100%;
  }

  &__img {
    width: auto;
    height: auto;
    object-fit: contain;
    object-position: top;
  }

  &__title {
    pointer-events: auto;
    font-size: 24px;
    color: $primary-color;
    margin-block-end: 16px;
    display: block;

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
    display: flex;
    flex-wrap: wrap;
    gap: 10px 4px;
  }

  &__specialization-item {
    border-radius: 999px;
    padding-block: 6px;
    padding-inline: 20px;
    background-color: $filter-block-color;
    font-size: 14px;
  }

  &__icon {
    position: relative;
    top: 14px;
    opacity: 0;
    width: 24px;
    height: 24px;
    color: $secondary-color;
    align-self: flex-end;
  }
}
</style>
