<script setup>
import SimpleLink from '@/components/common/SimpleLink/SimpleLink.vue'
import { computed } from 'vue'

const props = defineProps({
  length: Number,
  loading: Boolean
})

const model = defineModel() // current page

const pages = computed(() => {
  let pagesArr = [] // Number[] - отрицательное число обозночает ...

  if (props.length <= 7) {
    // если элементов 7 или менее, то ... не добавляем
    for (let i = 1; i <= props.length; i++) {
      pagesArr.push(i)
    }
  } else {
    if (
      // если текущее значение - 2 первых или 2 последних, то отображаем по 3 с конца и начала, а посередине ...
      model.value === 1 ||
      model.value === 2 ||
      model.value === props.length - 1 ||
      model.value === props.length
    ) {
      pagesArr = [1, 2, 3, -1, props.length - 2, props.length - 1, props.length]
    } else if (model.value === 3 || model.value === 4) {
      // если текущее значение 3 или 4, то отображаем первые 5 , ... и последний
      pagesArr = [1, 2, 3, 4, 5, -1, props.length]
    } else if (model.value === props.length - 3 || model.value === props.length - 2) {
      // если текущее значение 3 или 4 с конца, то отображаем первый, ... и последние 5
      pagesArr = [
        1,
        -1,
        props.length - 4,
        props.length - 3,
        props.length - 2,
        props.length - 1,
        props.length
      ]
    } else {
      // в противном случае отображаем первый, ..., предыдущий, текущий, следующий, ... и последний
      pagesArr = [1, -1, model.value - 1, model.value, model.value + 1, -2, props.length]
    }
  }

  return pagesArr
})
</script>

<template>
  <ul class="pagination">
    <template v-for="page in pages" :key="page">
      <li v-if="page < 0" class="pagination__item pagination__item_dot" aria-hidden="true">...</li>
      <li
        v-else-if="page === model"
        class="pagination__item pagination__item_current"
        aria-current="page"
      >
        {{ page }}
      </li>
      <li v-else class="pagination__item">
        <SimpleLink as="button" @click="model = page" :aria-label="`На старницу ${page}`">
          {{ page }}
        </SimpleLink>
      </li>
    </template>
    <div v-if="loading" class="pagination__loading"></div>
  </ul>
</template>

<style lang="scss">
.pagination {
  position: relative;
  display: flex;
  gap: 0 24px;
  justify-content: center;
  align-items: center;

  &__item {
    display: flex;
    color: $primary-color;

    &_dot,
    &_current {
      color: $additional-text-color;
    }

    &_current {
      justify-content: center;
      align-items: center;
      min-width: 40px;
      padding-inline: 6px;
      height: 40px;
      border-radius: 4px;
      background-color: $filter-block-color;
    }
  }

  &__loading {
    position: absolute;
    inset: 0;
    background-color: white;
    opacity: 0.5;
  }
}
</style>
