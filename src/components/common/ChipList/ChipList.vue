<script setup>
defineProps({
  chips: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ul class="chip-list">
    <li v-for="chip of chips" :key="chip.id" class="chip-list__item">
      {{ chip.title }}
    </li>
  </ul>
</template>

<style lang="scss">
.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 4px;

  &__item {
    border-radius: 999px;
    padding-block: 6px;
    padding-inline: 20px;
    background-color: $filter-block-color;
    font-size: 14px;
  }
}
</style>
