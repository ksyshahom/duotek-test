<script setup>
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'

defineProps({
  options: {
    type: Array,
    required: true
  },
  optionLabel: {
    type: String,
    default: 'label'
  }
})

const model = defineModel()

const styles = {
  root: 'simple-select__root',
  input: 'simple-select__input',
  trigger: 'simple-select__trigger',
  list: 'simple-select__list',
  item: 'simple-select__item'
}
</script>

<template>
  <Dropdown
    v-model="model"
    :options="options"
    :optionLabel="optionLabel"
    :pt="styles"
    class="simple-select"
  />
</template>

<style lang="scss">
.simple-select {
  &__root {
    position: relative;

    font-family: 'Rubik', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: black;
  }

  &__input {
    display: block;
    border: 1px solid $input-color;
    border-radius: 4px;
    padding-block: 10px;
    padding-inline: 16px 52px;
    background-color: white;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &:hover {
      border-color: $selected-hover-color;
    }

    &:focus-visible {
      outline: 2px solid $selected-hover-color;
    }
  }

  &__trigger {
    position: absolute;
    top: 12px;
    right: 14px;
    cursor: pointer;
  }

  &__list {
    background-color: white;
    border: 1px solid $input-color;
    border-radius: 4px;
    font-size: 14px;
  }

  &__item {
    padding-block: 4px;
    padding-inline: 16px;

    &:hover {
      background-color: $hover-color;
    }

    &[data-p-focused='true'] {
      background-color: $hover-color;
    }

    &[aria-selected='true'] {
      background-color: $selected-color;

      &[data-p-focused='true'] {
        background-color: $selected-hover-color;
      }
    }
  }
}
</style>
