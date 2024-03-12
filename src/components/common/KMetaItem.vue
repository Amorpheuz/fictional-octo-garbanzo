<script setup lang="ts">
interface MetaValue {
  metaValue: string;
  metaName: string;
}

withDefaults(
  defineProps<{
    variant: 'default' | 'active';
    values?: MetaValue[];
  }>(),
  {
    variant: 'default',
    values: (): MetaValue[] => [],
  },
)
</script>
<template>
  <div class="k-meta-item">
    <div
      class="k-meta-item__dot"
      :class="`k-meta-item__dot--${variant}`"
    />
    <slot>
      <div class="k-meta-item__values">
        <template
          v-for="val in values"
          :key="val.metaName"
        >
          <span class="k-meta-item__separator">·</span>
          <span class="k-meta-item__value">{{ val.metaValue }}</span>
          <span class="k-meta-item__name">{{ val.metaName }}</span>
        </template>
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.k-meta-item {
  align-items: center;
  display: flex;
  gap: 8px;

  &__values {
    align-items: center;
    display: flex;
    gap: 4px;
  }

  &__dot {
    border-radius: 999px;
    height: 6px;
    width: 6px;

    &--default {
      background-color: #b6b6bd;
    }

    &--active {
      background-color: #42d782;
    }
  }

  &__value,
  &__name,
  &__separator {
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
  }

  &__value {
    color: #3c4557;
  }

  &__name,
  &__separator {
    color: #707888;
  }

  &__separator {
    display: none;
  }

  &__name + &__separator {
    display: block;
  }
}
</style>
