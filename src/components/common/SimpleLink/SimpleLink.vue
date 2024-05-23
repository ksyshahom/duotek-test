<script setup>
defineProps({
  as: {
    type: [String, Object],
    default: 'a'
  },
  active: Boolean
})
</script>

<template>
  <Component
    :is="as"
    class="simple-link"
    :class="{ 'simple-link_active': active }"
    :aria-current="active ? 'page' : undefined"
  >
    <slot></slot>
  </Component>
</template>

<style scoped lang="scss">
.simple-link {
  cursor: pointer;
  color: currentColor;
  background-color: transparent;
  padding: none;
  border: none;

  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 1px solid currentColor;
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

  &_active {
    cursor: default;
    opacity: 0.3;
  }
}
</style>
