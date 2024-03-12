<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant: 'info' | 'default';
  }>(),
  {
    variant: 'default',
  },
)

const tagClass = computed(() => {
  return `k-tag--${props.variant}`
})
</script>
<template>
  <div
    class="k-tag"
    :class="tagClass"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.k-tag {
  border-radius: 999px;
  display: inline;
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  padding: 8px 16px;
  text-align: center;

  &--default {
    background-color: #B6B6BD;
    color: #000;
  }

  &--info {
    background-color: #f2f6fe;
    color: #5888db;
  }
}
</style>
