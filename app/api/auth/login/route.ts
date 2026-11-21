import { randomBytes } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { getAdminSupabase } from '@/lib/supabase/server'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'

export async function POST(request: Request) {
  const form = await request.formData()
  const email = String(form.get('email') ?? '').trim().toLowerCase()
  const password = String(form.get('password') ?? '')
  const fail = (message: string) => NextResponse.redirect(new URL(`/admin/login?error=${encodeURIComponent(message)}`, request.url), 303)
  if (!email || !password) return fail('Email and password are required.')
  const db = getAdminSupabase()
  const { data: user, error } = await db.from('admin_users').select('id,tenant_id,password_hash,is_active').eq('email', email).maybeSingle()
  if (error || !user?.is_active || !await bcrypt.compare(password, user.password_hash)) return fail('Incorrect email or password.')
  const token = randomBytes(32).toString('base64url')
  const expiresAt = new Date(Date.now() + 7 * 86_400_000).toISOString()
  const saved = await db.from('admin_user_sessions').insert({ token, admin_user_id: user.id, expires_at: expiresAt, ip: request.headers.get('x-forwarded-for') ?? '', user_agent: request.headers.get('user-agent') ?? '' })
  if (saved.error) return fail('Unable to create a secure session.')
  const response = NextResponse.redirect(new URL('/admin', request.url), 303)
  const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/', maxAge: 7 * 86_400 }
  response.cookies.set(SESSION_COOKIE, token, options)
  response.cookies.set(TENANT_COOKIE, user.tenant_id, options)
  return response
}
