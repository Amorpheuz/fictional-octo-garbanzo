<script setup lang="ts">
import { computed, ref } from 'vue'
import KButton from './common/KButton.vue'
import KInput from './common/KInput.vue'
import KPagination from './common/KPagination.vue'
import ServiceCard from './ServiceCard.vue'
import ServiceInfo from './ServiceInfo.vue'
import useServices, { PER_COUNT_PAGE, type Service } from '@/composables/useServices'
import { useQueryParams } from '@/composables/useQueryParams'

// Import services from the composable
const {
  loading,
  paginatedItems,
  currentPage,
  goToPage,
  isFirstPage,
  isLastPage,
  services,
} = useServices()
const { addFilter, removeFilter, queryParams } = useQueryParams()

// Set the search string to a Vue ref
const searchQuery = computed(() => queryParams.value.q)

const updateSearchString = (value: string) => {
  // goToPage(1)
  if (!value) {
    removeFilter('q')
  } else {
    addFilter('q', value)
  }
}

const dialog = ref<InstanceType<typeof ServiceInfo> | null>(null)
const selectedService = ref<Service|null>(null)

const openServiceInfo = (service: Service) => {
  if (dialog.value) {
    selectedService.value = service
    dialog.value.open()
  }
}

const createService = () => {
  alert('Service created')
}
</script>
<template>
  <div class="service-catalog">
    <div class="header">
      <div class="header__title">
        <h1>Service Hub</h1>
        <p role="doc-subtitle">
          Organize services, manage and track versioning and API service
          documentation.
          <a
            href="https://docs.konghq.com/konnect/servicehub/"
            rel="noopener noreferrer"
            target="_blank"
          >Learn more</a>
        </p>
      </div>
      <div class="header__actions">
        <KInput
          data-testid="search-input"
          label="Search services"
          :model-value="searchQuery"
          placeholder="Search"
          @update:model-value="updateSearchString"
        >
          <template #icon>
            <svg
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#a)">
                <path
                  clip-rule="evenodd"
                  d="M12.094 14.379a6.857 6.857 0 1 1 2.286-2.286l2.715 2.716c.66.66.667 1.62 0 2.286-.66.66-1.63.656-2.285 0l-2.716-2.716Zm-3.57-1.284a4.571 4.571 0 1 0 0-9.143 4.571 4.571 0 0 0 0 9.143Z"
                  fill="#B9BABB"
                  fill-rule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path
                    d="M1.667 1.666h16v16h-16z"
                    fill="#fff"
                  />
                </clipPath>
              </defs>
            </svg>
          </template>
        </KInput>
        <KButton
          class="create-service-button"
          type="button"
          @click="createService"
        >
          <template #icon>
            <svg
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                fill="#fff"
                height="12"
                rx="1"
                width="2.769"
                x="8.615"
                y="4"
              />
              <rect
                fill="#fff"
                height="12"
                rx="1"
                transform="rotate(90 16 8.615)"
                width="2.769"
                x="16"
                y="8.615"
              />
            </svg>
          </template>
          <span>Service Package</span>
        </KButton>
      </div>
    </div>
    <ul
      v-if="paginatedItems.length"
      class="catalog"
    >
      <li
        v-for="service in paginatedItems"
        :key="service.id"
        class="service"
      >
        <ServiceCard
          class="service__card"
          :service="service"
          @click="openServiceInfo(service)"
        />
      </li>
    </ul>
    <div
      v-else-if="loading"
      class="catalog catalog--loading"
      data-testid="loading"
    >
      Loading...
    </div>
    <div
      v-else
      class="catalog catalog--empty"
      data-testid="no-results"
    >
      {{
        searchQuery
          ? `No results found for "${searchQuery}"`
          : "No services found"
      }}
    </div>
    <div
      v-if="paginatedItems.length"
      class="footer"
    >
      <KPagination
        :current-page="currentPage"
        :is-first-page="isFirstPage"
        :is-last-page="isLastPage"
        :per-page-count="PER_COUNT_PAGE"
        :total-items="services.length"
        @next="goToPage(currentPage + 1)"
        @prev="goToPage(currentPage - 1)"
      />
    </div>
  </div>
  <ServiceInfo
    ref="dialog"
    :service="selectedService"
  />
</template>

<style lang="scss" scoped>
.service-catalog {
  margin: 40px auto;
  max-width: 1366px;
  padding: 0 40px;

  > :not([hidden]) ~ :not([hidden]) {
    margin-bottom: 0;
    margin-top: 24px;
  }

  .header {
    align-items: start;
    display: flex;
    gap: 16px;
    justify-content: space-between;

    &__title > h1 {
      color: #3c4557;
      font-size: 32px;
      font-weight: 700;
      line-height: 36px;
      margin: 0;
    }

    &__title > p {
      color: #3c4557;
      font-size: 16px;
      line-height: 24px;
    }

    &__title > :not([hidden]) ~ :not([hidden]) {
      margin-bottom: 0;
      margin-top: 16px;
    }

    &__actions {
      display: flex;
      gap: 24px;
    }
  }

  .create-service-button {
    background-color: #07a88d;
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    .header {
      flex-direction: column;

      &__actions {
        width: 100%;

        input {
          flex-grow: 1;
        }
      }
    }
  }
}

.catalog {
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  list-style: none;
  margin: 0;
  min-height: 776px;
  padding: 0;
  place-content: start;

  &--loading {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 776px;
  }

  &--empty {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 776px;
  }
}

@media screen and (max-width: 640px) {
  .catalog {
    grid-template-columns: 1fr;
  }
}

.service {
  height: 232px;

  &__card {
    display: grid;
    height: 100%;
    width: 100%;
  }
}

.footer {
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: center;
}
</style>
