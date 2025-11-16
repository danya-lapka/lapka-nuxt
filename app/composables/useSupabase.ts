import type { 
  DatabaseRecord, 
  SupabaseResponse, 
  SupabaseArrayResponse,
  QueryOptions,
  QueryFilters
} from '~/types/supabase'

/**
 * Composable для работы с Supabase
 * 
 * @example
 * // Получение всех записей из таблицы
 * const { data, loading, error, fetchAll } = useSupabase<MyTableType>('my_table')
 * await fetchAll()
 * 
 * @example
 * // Получение записи по ID
 * const { data, loading, error, fetchById } = useSupabase<MyTableType>('my_table')
 * await fetchById('123')
 * 
 * @example
 * // Получение с фильтрацией и сортировкой
 * const { data, loading, error, fetchFiltered } = useSupabase<MyTableType>('my_table')
 * await fetchFiltered(
 *   { status: 'active' },
 *   { limit: 10, orderBy: { column: 'created_at', ascending: false } }
 * )
 */

export function useSupabase<T extends DatabaseRecord>(tableName: string) {
  const client = useSupabaseClient()
  
  const data = ref<T[] | null>(null)
  const singleData = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const count = ref<number | null>(null)

  /**
   * Получить все записи из таблицы
   * 
   * @param options - Опции для запроса (лимит, оффсет, сортировка)
   * @returns Promise с данными
   */
  const fetchAll = async (options?: QueryOptions): Promise<SupabaseArrayResponse<T>> => {
    loading.value = true
    error.value = null

    try {
      let query = client
        .from(tableName)
        .select('*', { count: 'exact' })

      // Применяем сортировку
      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending ?? true 
        })
      }

      // Применяем лимит
      if (options?.limit) {
        query = query.limit(options.limit)
      }

      // Применяем оффсет
      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
      }

      const response = await query

      if (response.error) {
        throw new Error(response.error.message)
      }

      data.value = response.data as T[]
      count.value = response.count ?? null

      return {
        data: response.data as T[],
        error: null,
        count: response.count ?? null
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      error.value = new Error(errorMessage)
      data.value = null
      count.value = null

      return {
        data: null,
        error: error.value
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Получить запись по ID
   * 
   * @param id - ID записи
   * @returns Promise с данными
   */
  const fetchById = async (id: string | number): Promise<SupabaseResponse<T>> => {
    loading.value = true
    error.value = null

    try {
      const response = await client
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single()

      if (response.error) {
        throw new Error(response.error.message)
      }

      singleData.value = response.data as T

      return {
        data: response.data as T,
        error: null
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      error.value = new Error(errorMessage)
      singleData.value = null

      return {
        data: null,
        error: error.value
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Получить записи с фильтрацией
   * 
   * @param filters - Объект с фильтрами (ключ - название колонки, значение - значение для фильтрации)
   * @param options - Опции для запроса
   * @returns Promise с данными
   */
  const fetchFiltered = async (
    filters: QueryFilters,
    options?: QueryOptions
  ): Promise<SupabaseArrayResponse<T>> => {
    loading.value = true
    error.value = null

    try {
      let query = client
        .from(tableName)
        .select('*', { count: 'exact' })

      // Применяем фильтры
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value)
        }
      })

      // Применяем сортировку
      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending ?? true 
        })
      }

      // Применяем лимит
      if (options?.limit) {
        query = query.limit(options.limit)
      }

      // Применяем оффсет
      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
      }

      const response = await query

      if (response.error) {
        throw new Error(response.error.message)
      }

      data.value = response.data as T[]
      count.value = response.count ?? null

      return {
        data: response.data as T[],
        error: null,
        count: response.count ?? null
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
      error.value = new Error(errorMessage)
      data.value = null
      count.value = null

      return {
        data: null,
        error: error.value
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Очистить данные и ошибки
   */
  const clear = () => {
    data.value = null
    singleData.value = null
    error.value = null
    count.value = null
    loading.value = false
  }

  return {
    // Реактивные данные
    data: readonly(data),
    singleData: readonly(singleData),
    loading: readonly(loading),
    error: readonly(error),
    count: readonly(count),
    
    // Методы
    fetchAll,
    fetchById,
    fetchFiltered,
    clear
  }
}

