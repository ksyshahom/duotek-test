<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <Icon icon="lucide:loader-circle" class="loader" />
</template>

<style lang="scss">
.loader {
  width: 36px;
  height: 36px;
  animation: spin 1s infinite linear;
}
</style>
