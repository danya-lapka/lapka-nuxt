import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/supabase'

let supabaseClient: any | null = null

export const useSupabaseClientBrowser = () => {
  const config = useRuntimeConfig()

  if (!supabaseClient) {
    const supabaseUrl = config.public.supabaseUrl
    const supabaseKey = config.public.supabaseAnonKey

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase URL or anon key in runtimeConfig.public')
    }

    supabaseClient = createClient<Database>(supabaseUrl, supabaseKey)
  }

  return supabaseClient
}
