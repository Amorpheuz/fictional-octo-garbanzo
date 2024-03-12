<script lang="ts" setup>
const inputModel = defineModel({ type: String })

withDefaults(
  defineProps<{
    label:string;
    placeholder?: string;
  }>(),
  { placeholder: 'Text goes here' },
)
</script>
<template>
  <label
    :aria-label="label"
    class="input-wrapper"
  >
    <slot name="icon" />

    <input
      v-model="inputModel"
      class="search-input"
      :placeholder="placeholder"
    >
  </label>
</template>

<style lang="scss" scoped>
.input-wrapper {
  align-items: center;
  background-color: #fff;
  border: 1px solid #e7e7ec;
  border-radius: 8px;
  cursor: text;
  display: grid;
  gap: 4px;
  grid-template-columns: 20px 1fr;
  padding: 8px 16px 8px 10px;

  &:focus-within {
    border-color: inherit;
  }
}

.search-input {
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #6f7787;
  }
}
</style>
