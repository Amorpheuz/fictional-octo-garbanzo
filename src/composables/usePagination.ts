import { ref, computed, toValue, type Ref, onMounted } from 'vue'
import { useQueryParams } from './useQueryParams'

export default function usePagination<T>(itemsRef: Ref<T[]>, pageSize: number) {
  const { queryParams, addFilter } = useQueryParams()

  const currentPage = ref<number>(1)
  const pageCount = computed(() => {
    const items = toValue(itemsRef)
    return Math.ceil(items.length / pageSize)
  })

  onMounted(() => {
    if (queryParams.value.page && typeof queryParams.value.page === 'string') {
      currentPage.value = parseInt(queryParams.value.page)
    }
  })

  function goToPage(page: number) {
    if (page > 0 && page <= pageCount.value) {
      currentPage.value = page
      addFilter('page', page)
      return
    }
    currentPage.value = 1
  }

  const paginatedItems = computed(() => {
    const items = toValue(itemsRef)
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return items.slice(startIndex, endIndex)
  })

  const isFirstPage = computed(() => currentPage.value === 1)

  const isLastPage = computed(() => currentPage.value === pageCount.value)

  return {
    currentPage,
    pageCount,
    isFirstPage,
    isLastPage,
    goToPage,
    paginatedItems,
  }
}
