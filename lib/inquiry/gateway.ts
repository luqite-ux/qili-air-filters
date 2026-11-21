export type InquiryPayload = {
  name: string
  email: string
  company: string
  phone?: string
  product?: string
  dimensions?: string
  quantity?: string
  application?: string
  message?: string
  captchaScope: string
  captchaToken: string
  captchaAnswer: string
  locale: string
  sourcePath?: string
}

export type InquiryResult = { ok: true; reference: string } | { ok: false; code: 'not_connected' | 'captcha_failed' | 'rate_limited' | 'unknown' }

/*
 * Integration boundary.
 * Replace this body with: captcha verification for payload.captchaScope, rate limiting,
 * tenant-scoped persistence and notification delivery. The server action and form
 * already handle every result shape declared above.
 */
export async function deliverInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  const { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } = await import('@/lib/inquiry-captcha')
  const { getServerDatabase, getTenantId } = await import('@/lib/supabase/server')
  const secret = process.env.CAPTCHA_SECRET?.trim()
  const tenantId = getTenantId()
  const db = getServerDatabase()
  if (!secret || !tenantId || !db) return { ok: false, code: 'not_connected' }
  try {
    const context = createSupabaseCaptchaContextFromEnv()
    const captcha = await verifyCaptchaSubmission({
      secret,
      tenantId,
      siteScope: context.siteScope,
      scope: payload.captchaScope,
      token: payload.captchaToken,
      answer: payload.captchaAnswer,
      store: context.store,
    })
    if (!captcha.ok) return { ok: false, code: 'captcha_failed' }
    const subjectParts = [payload.product, payload.application, payload.quantity].filter(Boolean)
    const { data, error } = await db.from('inquiries').insert({
      tenant_id: tenantId,
      name: payload.name,
      email: payload.email,
      company: payload.company,
      phone: payload.phone || '',
      subject: subjectParts.join(' · ') || 'Website inquiry',
      message: [
        payload.message,
        payload.dimensions ? `Dimensions / specification: ${payload.dimensions}` : '',
        payload.sourcePath ? `Source page: ${payload.sourcePath}` : '',
      ].filter(Boolean).join('\n\n'),
      status: 'new',
    }).select('id').single()
    if (error || !data?.id) return { ok: false, code: 'unknown' }
    return { ok: true, reference: String(data.id).slice(0, 8).toUpperCase() }
  } catch {
    return { ok: false, code: 'unknown' }
  }
}
