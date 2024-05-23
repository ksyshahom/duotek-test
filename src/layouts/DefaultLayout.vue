<script setup>
import DefaultHeader from '@/components/layout/DefaultHeader.vue'
import DefaultFooter from '@/components/layout/DefaultFooter.vue'
</script>

<template>
  <div class="layout">
    <DefaultHeader />
    <main class="layout__main main">
      <slot></slot>
    </main>
    <DefaultFooter />
  </div>
</template>

<style lang="scss">
.layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  &__main {
    flex-grow: 1;
    padding-block: 44px;

    @media (min-width: $tablet-width) {
      padding-block: 75px 44px;
    }
  }
}
</style>
