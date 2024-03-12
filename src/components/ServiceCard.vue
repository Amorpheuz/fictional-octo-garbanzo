<script setup lang="ts">
import { computed } from 'vue'
import KCard from './common/KCard.vue'
import KTag from './common/KTag.vue'
import KMetaItem from './common/KMetaItem.vue'
import KAvatarStack from './common/KAvatarStack.vue'
import ServiceState from './ServiceState.vue'
import { type Service } from '@/composables/useServices'
import { shortenLargeNumber, numberToPercentage } from '@/utils'

const props = defineProps<{
  service: Service;
}>()

const versionCount = computed(() => {
  return props.service.versions.length
})

const serviceDisplayMetrics = computed(() => {
  const metric = props.service.metrics
  if (!metric) {
    return undefined
  }

  return [
    [{ metaName: 'latency', metaValue: `${metric.latency}` }],
    [{ metaName: 'uptime', metaValue: numberToPercentage(metric.uptime) }],
    [
      { metaName: 'requests', metaValue: shortenLargeNumber(metric.requests) },
      { metaName: 'errors', metaValue: numberToPercentage(metric.errors) },
    ],
  ]
})

const versionDevelopersAvatars = computed(() => {
  const avatars: { src: string; alt: string }[] = []
  const developerAvatars: string[] = []

  for (const version of props.service.versions) {
    if (
      version.developer &&
      !developerAvatars.includes(version.developer.id)
    ) {
      developerAvatars.push(version.developer.id)
      avatars.push({
        src: version.developer.avatar,
        alt: version.developer.name,
      })
    }
  }

  return avatars
})
</script>

<template>
  <button
    class="button--unstyled"
    type="button"
  >
    <KCard
      as="article"
      class="scard"
    >
      <template #header>
        <div class="scard__header">
          <ServiceState
            :configured="service.configured"
            :published="service.published"
          />
          <KTag
            v-if="service.configured"
            variant="info"
          >
            <span>{{ versionCount }} versions</span>
          </KTag>
        </div>
      </template>
      <div class="scard__content">
        <h6>
          {{ service.name }}
        </h6>
        <p>
          {{ service.description }}
        </p>
      </div>
      <template #footer>
        <div class="scard__footer">
          <div>
            <template v-if="service.configured">
              <KMetaItem
                v-for="(metric, key) in serviceDisplayMetrics"
                :key="key"
                :values="metric"
                variant="active"
              />
            </template>
            <KMetaItem
              v-else
              variant="default"
            >
              <span class="scard__footer--not-configured">Not configured with runtime yet</span>
            </KMetaItem>
          </div>
          <KAvatarStack :avatars="versionDevelopersAvatars" />
        </div>
      </template>
    </KCard>
  </button>
</template>

<style lang="scss" scoped>
.button--unstyled {
  align-items: unset;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  text-align: unset;
}

.scard {
  background-color: #fff;
  border-radius: 4px;

  &__header {
    align-items: center;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    min-height: 32px;
  }

  &__content {
    > :not([hidden]) ~ :not([hidden]) {
      margin-bottom: 0;
      margin-top: 11px;
    }

    h6 {
      color: #3c4557;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0px;
      line-height: 24px;
      margin: 0;
      text-align: left;
    }

    p {
      -webkit-box-orient: vertical;
      color: #707888;
      display: -webkit-box;
      font-size: 13px;
      font-weight: 400;
      -webkit-line-clamp: 2;
      line-height: 20px;
      overflow: hidden;
    }
  }

  &__footer {
    align-items: end;
    display: flex;
    gap: 16px;
    justify-content: space-between;

    &--not-configured {
      color: #707888;
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
    }
  }
}
</style>
