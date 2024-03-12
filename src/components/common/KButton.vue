<script setup lang="ts"></script>
<template>
  <button>
    <slot name="icon" />
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  border-radius: 999px;
  border-width: 0px;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  gap: 8px;
  line-height: 20px;
  overflow: hidden;
  padding: 12px 24px 12px 16px;
  text-align: center;

  :first-child:has(+ *) {
    flex-shrink: 0;
  }

  :last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
