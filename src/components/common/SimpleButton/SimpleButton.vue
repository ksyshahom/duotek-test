<script setup>
defineProps({
  as: {
    type: [String, Object],
    default: 'button'
  },
  secondary: Boolean
})
</script>

<template>
  <Component :is="as" class="simple-button" :class="{ 'simple-button_secondary': secondary }">
    <slot></slot>
  </Component>
</template>

<style scoped lang="scss">
.simple-button {
  cursor: pointer;
  color: white;
  background-color: $primary-color;
  border: none;
  border-radius: 4px;

  padding: 6px 20px;

  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 1px solid $primary-color;
  }

  &:hover,
  &:focus-visible {
    opacity: 0.6;
  }
  &:active {
    opacity: 0.3;
  }

  &_secondary {
    background-color: $secondary-color;
  }
}
</style>
