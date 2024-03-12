<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  totalItems: number;
  perPageCount: number;
}>()

const emit = defineEmits<{ prev: []; next: [] }>()

const fromValue = computed(() => {
  const adjustedPageCount = props.currentPage - 1

  return props.perPageCount * adjustedPageCount + 1
})

const toValue = computed(() => {
  const adjustedPageCount = props.currentPage - 1

  const lastPageItems = props.totalItems % props.perPageCount
  const lastPageItemsCount =
    lastPageItems === 0 ? props.perPageCount : lastPageItems

  return props.isLastPage
    ? props.perPageCount * adjustedPageCount + lastPageItemsCount
    : props.perPageCount * (adjustedPageCount + 1)
})
</script>
<template>
  <div class="pagination">
    <button
      class="pagination__button pagination__button--prev"
      :disabled="isFirstPage"
      type="button"
      @click="emit('prev')"
    >
      ←
    </button>
    <span class="pagination__info"><strong>{{ fromValue }} to {{ toValue }} </strong> of
      {{ totalItems }} services</span>
    <button
      class="pagination__button pagination__button--next"
      :disabled="isLastPage"
      type="button"
      @click="emit('next')"
    >
      →
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  align-items: center;
  display: flex;
  gap: 24px;

  &__info {
    color: #707888;
    font-size: 13px;
    line-height: 20px;
    min-width: 150px;
    text-align: center;

    strong {
      color: #3c4557;
    }
  }

  &__button {
    background-color: transparent;
    border: none;
    cursor: pointer;

    &--prev,
    &--next {
      aspect-ratio: 1;
      border: 1px solid #a6c6ff;
      border-radius: 999px;
      color: #1456cb;
      font-family: inherit;
      font-size: large;
      height: 44px;
      line-height: 1;
    }

    &--prev:disabled,
    &--next:disabled {
      border-color: #e0e0e1;
      color: #adadae;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
