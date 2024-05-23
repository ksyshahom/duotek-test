<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'

const props = defineProps({
  error: String,
  initialValue: String
})

const emit = defineEmits(['submitSearch'])

const emitSearch = (event) => {
  const formData = new FormData(event.target)
  emit('submitSearch', formData.get('search'))
}

const input = ref()

onMounted(() => {
  input.value.value = props.initialValue
})
</script>

<template>
  <form class="search" @submit.prevent="emitSearch" role="search">
    <div class="search__input-wrapper">
      <input
        ref="input"
        name="search"
        placeholder="Поиск продукта или отрасли"
        class="search__input"
      />
      <Icon icon="tabler:search" class="search__input-icon" />
    </div>
    <button type="submit" class="search__button">Найти</button>
    <div v-if="error" class="search__error">{{ error }}</div>
  </form>
</template>

<style lang="scss">
.search {
  position: relative;
  display: flex;

  &__input-wrapper {
    position: relative;
    flex-grow: 1;
  }

  &__input {
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: black;
    width: 100%;
    border-radius: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;

    border: 1px solid $input-color;
    padding-block: 10px;
    padding-inline: 48px 16px;
    background-color: white;
    transition: all 150ms ease-in-out;

    &:hover {
      border-color: $selected-hover-color;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid $selected-hover-color;
      outline-offset: -2px;
    }

    &::placeholder {
      color: $additional-text-color;
    }
  }

  &__input-icon {
    position: absolute;
    top: 8px;
    left: 12px;
    width: 24px;
    height: 24px;
    color: $additional-text-color;
  }

  &__button {
    cursor: pointer;
    flex-shrink: 0;
    width: min-content;
    padding-inline: 18px;
    color: white;
    border: none;
    border-radius: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: $primary-color;
    transition: all 150ms ease-in-out;

    &:hover {
      opacity: 0.6;
    }

    &:active {
      opacity: 0.3;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      opacity: 0.6;
      outline: 2px solid white;
    }
  }

  &__error {
    position: absolute;
    bottom: -14px;
    left: 0;
    color: $secondary-color;
    font-size: 10px;
  }
}
</style>
