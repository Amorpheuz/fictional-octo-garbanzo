<script setup lang="ts">
withDefaults(defineProps<{
  as: string
}>(), { as: 'div' })
</script>

<template>
  <component
    :is="as"
    class="k-card"
  >
    <div class="k-card__header">
      <slot name="header" />
    </div>
    <div class="k-card__content">
      <slot />
    </div>
    <div class="k-card__footer">
      <slot name="footer" />
    </div>
  </component>
</template>

<style lang="scss" scoped>
.k-card{
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 28px;

  &__content{
    flex-grow: 1;
  }

  &__footer{
    margin-top: auto;
  }
}
</style>
