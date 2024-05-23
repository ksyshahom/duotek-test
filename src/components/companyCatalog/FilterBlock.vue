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
  <form v-if="!loading" class="company-filter" @submit.prevent>
    <p>
      <label>Отрасль</label>
      <SimpleSelect
        v-model="model.industry"
        :options="filters.industryList"
        optionLabel="title"
        class="company-filter__select"
      />
    </p>
    <p>
      <label>Специализация</label>
      <SimpleSelect
        v-model="model.companySpecialization"
        :options="filters.companySpecializationList"
        optionLabel="title"
        class="company-filter__select"
      />
    </p>
  </form>
  <div v-else>loading</div>
</template>

<style lang="scss">
.company-filter {
  display: flex;
  flex-direction: column;
  align-self: start;
  gap: 24px 0;
  border-radius: 4px;
  background-color: $filter-block-color;
  padding: 18px 20px;

  &__select {
    margin-block-start: 16px;
  }
}
</style>
