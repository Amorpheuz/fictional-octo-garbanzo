<script setup lang="ts">
import { computed, ref } from 'vue'
import { type Service } from '@/composables/useServices'
import { timeAgo } from '@/utils'

const props = defineProps<{
  service: Service | null;
}>()

const sortedVersions = computed(() => {
  if (!props.service) {
    return []
  }

  const service = { ...props.service }

  return service.versions.sort((a, b) => {
    const aDate = new Date(a.updated_at)
    const bDate = new Date(b.updated_at)

    if (aDate < bDate) {
      return 1
    }
    if (aDate > bDate) {
      return -1
    }
    return 0
  })
})

const dialog = ref<HTMLDialogElement | null>(null)

const open = () => {
  if (dialog.value) {
    dialog.value.showModal()
  }
}

const close = () => {
  if (dialog.value) {
    dialog.value.close()
  }
}

defineExpose({
  open,
  close,
})
</script>
<template>
  <dialog
    ref="dialog"
    @keypress.esc="close"
  >
    <div
      v-if="service"
      class="dialog__service"
    >
      <div class="service__info">
        <div>
          <h3>{{ service.name }}</h3>
          <p role="doc-subtitle">
            {{ service.description }}
          </p>
        </div>
        <button
          class="close"
          @click="close"
        >
          X
        </button>
      </div>
      <div class="versions">
        <h6>Versions ({{ service.versions.length }})</h6>
        <table class="versions__table">
          <tbody>
            <tr
              v-for="version in sortedVersions"
              :key="version.id"
              class="versions__row"
            >
              <th class="versions__header">
                {{ version.name }}
              </th>
              <td class="versions__description">
                {{ version.description }}
              </td>
              <td class="versions__type">
                <span
                  class="tag"
                  :class="`tag--${service.type}`"
                >
                  {{ service.type }}
                </span>
              </td>
              <td class="versions__developer">
                <div
                  v-if="version.developer"
                  class="developer"
                >
                  <img
                    :alt="version.developer.name"
                    class="developer__avatar"
                    :src="version.developer.avatar"
                  >
                  <div class="developer__details">
                    <p>{{ version.developer.name }}</p>
                    <div>{{ timeAgo(version.updated_at) }}</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <span v-else> No service selected </span>
  </dialog>
</template>

<style lang="scss" scoped>
dialog {
  background: none;
  border: none;
  outline: none;
  padding: 16px;
}

.dialog {
  &__service {
    background-color: #fff;
    border-radius: 4px;
    padding: 24px;

    > :not([hidden]) ~ :not([hidden]) {
      margin-bottom: 0;
      margin-top: 48px;
    }
  }
}

.close{
    background: none;
    border: none;
    cursor: pointer;
    font-size: large;
    font-weight: bold;
  }

.service {
  &__info {
    align-items: start;
    display: flex;
    justify-content: space-between;
    max-width: 750px;
    min-width: 680px;

    h3 {
      color: #3c4557;
      font-size: 24px;
      font-weight: 700;
      line-height: 24px;
      margin: 0;
    }
    p {
      color: #3c4557;
      font-size: 14px;
      line-height: 18px;
    }
  }

  @media screen and (max-width: 640px) {
    &__info{
      min-width: 0;
    }
  }

}

.versions {
  > :not([hidden]) ~ :not([hidden]) {
    margin-bottom: 0;
    margin-top: 14px;
  }

  h6 {
    color: #0b172d;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin: 0;
  }

  &__table {
    border-collapse: collapse;
    width: 100%;

    tbody {
      display: table;
      width: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    &__table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
  }

  &__header,
  &__description,
  &__type,
  &__developer {
    border: 0px solid #f1f1f5;
    border-bottom-width: 1px;
    padding: 4px;
    vertical-align: text-top;
  }

  &__header,
  &__description,
  &__type {
    padding: 8px 4px;
    text-align: left;
  }

  &__description {
    color: #8a8a8a;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    max-width: 350px;
  }

  &__row:last-child {
    .versions__header,
    .versions__description,
    .versions__type,
    .versions__developer {
      border: 0px solid #f1f1f5;
    }
  }

  &__header {
    color: #262626;
    font-size: 13px;
    font-weight: 600;
    line-height: 24px;
  }

  &__type {
    .tag {
      border-radius: 4px;
      padding: 4px 6px;

      &--REST {
        background-color: #bdd3f9;
        color: #1155cb;
        font-size: 10px;
        font-weight: 500;
        line-height: 14px;
      }

      &--HTTP {
        background-color: #f8f8fa;
        color: #1155cb;
        font-size: 10px;
        font-weight: 500;
        line-height: 14px;
      }
    }
  }
}

.developer {
  display: flex;
  gap: 6px;

  &__avatar {
    aspect-ratio: 1;
    border-radius: 999px;
    height: 20px;
    margin-top: 2px;
  }

  &__details {
    p {
      color: #3c4557;
      font-size: 13px;
      font-weight: 600;
      line-height: 24px;
      margin: 0;
    }
    div {
      color: #8a8a8a;
      font-size: 12px;
      line-height: 16px;
    }
  }
}
</style>
