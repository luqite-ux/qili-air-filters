import { createClient } from '@supabase/supabase-js'

export function getServerDatabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !serviceRoleKey) return null
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function getAdminSupabase() {
  const database = getServerDatabase()
  if (!database) throw new Error('Supabase server environment is unavailable')
  return database
}

export function getTenantId() {
  return process.env.NEXT_PUBLIC_TENANT_ID?.trim() || null
}
