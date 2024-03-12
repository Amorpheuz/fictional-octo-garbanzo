<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    limit?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  }>(),
  { limit: 2, avatars: () => [] },
)

const remainingAvatarsLength = computed(() => {
  return Math.max(props.avatars.length - props.limit, 0)
})

const remainingAvatarNames = computed(() => {
  return remainingAvatarsLength.value
    ? props.avatars
      .slice(props.limit)
      .map((avatar) => avatar.alt)
      .join(', ')
    : ''
})

const avatarsToShow = computed(() => {
  return props.avatars.slice(0, props.limit)
})
</script>
<template>
  <div class="avatar-stack">
    <div
      v-if="remainingAvatarsLength"
      class="avatar-stack__extras"
      :title="remainingAvatarNames"
    >
      +{{ remainingAvatarsLength }}
    </div>
    <img
      v-for="avatar in avatarsToShow"
      :key="avatar.src"
      :alt="avatar.alt"
      class="avatar-stack__avatar"
      :src="avatar.src"
      :title="avatar.alt"
    >
  </div>
</template>

<style lang="scss" scoped>
.avatar-stack {
  align-items: center;
  direction: rtl;
  display: flex;
  flex-direction: row-reverse;

  &__extras {
    align-items: center;
    aspect-ratio: 1;
    background-color: #f1f1f8;
    border-radius: 999px;
    color: #777d8a;
    direction: ltr;
    display: inline-flex;
    font-size: 12px;
    font-weight: 600;
    height: 36px;
    justify-content: center;
    letter-spacing: 2px;
    line-height: 24px;
  }

  &__avatar {
    aspect-ratio: 1;
    border-radius: 999px;
    height: 36px;
  }

  &__avatar + &__avatar,
  &__extras + &__avatar {
    margin-left: -12px;
  }
}
</style>
