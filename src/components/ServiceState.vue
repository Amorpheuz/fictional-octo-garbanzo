<script setup lang="ts">
import { type Service } from '@/composables/useServices'

defineProps<{
  configured: Service['configured'];
  published: Service['published'];
}>()
</script>
<template>
  <div class="service-state">
    <template v-if="!configured">
      <svg
        v-once
        id="spinner"
        class="icon icon--in-progress"
        fill="none"
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 10a5 5 0 1 0 5-5"
          stroke="#FABE5F"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </svg>
      <span>In progress</span>
    </template>
    <template v-else-if="published">
      <svg
        v-once
        id="check"
        fill="none"
        height="20"
        viewBox="0 0 21 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m14.667 7-6 6-3-3"
          stroke="#14B59A"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.25"
        />
      </svg>
      <span>Published to portal</span>
    </template>
    <template v-else>
      <svg
        v-once
        id="cross"
        fill="none"
        height="20"
        viewBox="0 0 21 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m14.167 6.5-7 7M14.167 13.5l-7-7"
          stroke="#ADB6C8"
          stroke-linecap="round"
          stroke-width="2"
        />
      </svg>
      <span>Unpublished</span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.service-state {
  align-items: center;
  color: #707888;
  display: flex;
  font-size: 12px;
  font-weight: 400;
  gap: 5px;
  line-height: 16px;

  .icon {
    &--in-progress {
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
