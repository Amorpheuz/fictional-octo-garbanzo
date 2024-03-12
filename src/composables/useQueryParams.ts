import { computed } from 'vue'
import { useRoute, useRouter, type LocationQueryValueRaw } from 'vue-router'

export function useQueryParams() {
  const route = useRoute()
  const router = useRouter()

  const queryParams = computed(() => route.query)

  function addFilter(key:string, value: LocationQueryValueRaw | LocationQueryValueRaw[]) {
    router.replace({ query: { ...route.query, ...{ [key]: value } } })
  }

  function removeFilter(key:string) {
    const newQueryObject = { ...route.query }
    delete newQueryObject[key]
    router.replace({ query: { ...newQueryObject } })
  }

  return {
    queryParams,
    addFilter,
    removeFilter,
  }
}
