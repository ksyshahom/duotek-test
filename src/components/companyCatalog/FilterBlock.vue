<script setup>
import SimpleSelect from '@/components/common/SimpleSelect/SimpleSelect.vue'

defineProps({
  filters: {
    type: Object, // {companySpecializationList: Array, industryList: Array}
    required: true
  },
  loading: Boolean
})

const model = defineModel() // {companySpecialization: Object, industry: Object}
</script>

<template>
  <form class="company-filter" @submit.prevent>
    <p class="company-filter__filter">
      <label>Отрасль</label>
      <SimpleSelect
        v-model="model.industry"
        :options="filters.industryList"
        optionLabel="title"
        class="company-filter__select"
      />
    </p>
    <p class="company-filter__filter">
      <label>Специализация</label>
      <SimpleSelect
        v-model="model.companySpecialization"
        :options="filters.companySpecializationList"
        optionLabel="title"
        class="company-filter__select"
      />
    </p>
    <div v-if="loading" class="company-filter__loading"></div>
  </form>
</template>

<style lang="scss">
.company-filter {
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: start;
  gap: 24px;
  border-radius: 4px;
  background-color: $filter-block-color;
  padding: 18px 20px;

  @media (min-width: $tablet-width) {
    flex-direction: row;
  }

  @media (min-width: $desktop-width) {
    flex-direction: column;
  }

  &__filter {
    flex-grow: 1;
  }

  &__select {
    margin-block-start: 16px;
  }

  &__loading {
    position: absolute;
    inset: 0;
    background-color: white;
    opacity: 0.5;
  }
}
</style>
