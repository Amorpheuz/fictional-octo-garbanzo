import { ref, onBeforeMount, watch } from 'vue'
import axios from 'axios'
import { useQueryParams } from './useQueryParams'
import usePagination from './usePagination'

export const PER_COUNT_PAGE = 9

export interface Version {
  id: string;
  name: string;
  description: string;
  developer?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  type: 'REST' | 'HTTP';
  published: boolean;
  configured: boolean;
  versions: Version[];
  metrics?: {
    latency: number;
    uptime: number;
    requests: number;
    errors: number;
  };
}

// This composable is a simplified example for the exercise **and could likely be improved**.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

export default function useServices() {
  const services = ref<Service[]>([])
  const loading = ref<boolean>(false)
  const error = ref<boolean>(false)

  const { queryParams } = useQueryParams()
  const { paginatedItems, currentPage, goToPage, isFirstPage, isLastPage, pageCount } = usePagination(services, PER_COUNT_PAGE)

  watch(
    () => queryParams.value.q,
    async () => {
      await getServices()
      goToPage(1)
    },
  )

  const getServices = async (): Promise<void> => {
    try {
      // Initialize loading state
      loading.value = true

      const urlQueries = new URLSearchParams()

      if (typeof queryParams.value.q === 'string') {
        urlQueries.append('q', queryParams.value.q)
      }

      const searchQuery = `/api/services${urlQueries.size ? `?${urlQueries.toString()}` : ''}`

      // Fetch data from the API
      const { data } = await axios.get(searchQuery)

      // Store data in Vue ref
      services.value = data
    } catch (err: any) {
      error.value = true
    } finally {
      // Reset loading state
      loading.value = false
    }
  }

  onBeforeMount(async (): Promise<void> => {
    // Fetch services from the API
    await getServices()
  })

  // Return stateful data
  return {
    services,
    loading,
    error,
    paginatedItems,
    currentPage,
    goToPage,
    isFirstPage,
    isLastPage,
    pageCount,
  }
}
