/**
 * Типы для работы с Supabase
 * 
 * Этот файл содержит TypeScript типы для таблиц базы данных.
 * Обновите эти типы в соответствии со структурой ваших таблиц в Supabase.
 */

/**
 * Базовый тип для записи в таблице
 * Все таблицы должны расширять этот тип или иметь похожую структуру
 */
export interface DatabaseRecord {
  id: string | number
  created_at?: string
  updated_at?: string
}


//  Пример типа для таблицы
//  Замените на реальную структуру вашей таблицы

 export interface TableGames extends DatabaseRecord {
  id: number,
  name: string,
  status: 'planned'|'completed'|'playing'|'dropped',
  link: string
 }

/**
 * Тип для ответа Supabase с данными
 */
export type SupabaseResponse<T> = {
  data: T | null
  error: Error | null
}

/**
 * Тип для ответа Supabase с массивом данных
 */
export type SupabaseArrayResponse<T> = {
  data: T[] | null
  error: Error | null
  count?: number | null
}

/**
 * Тип для параметров запроса с фильтрацией
 */
export interface QueryOptions {
  limit?: number
  offset?: number
  orderBy?: {
    column: string
    ascending?: boolean
  }
}

/**
 * Тип для фильтров запроса
 * Можно расширить под конкретные нужды
 */
export interface QueryFilters {
  [key: string]: any
}

