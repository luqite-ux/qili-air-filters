'use server'

import { z } from 'zod'
import { deliverInquiry } from '@/lib/inquiry/gateway'
import { getRequestLocale } from '@/lib/i18n'
import { site } from '@/lib/site'

export type InquiryState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  reference?: string
  fieldErrors?: Partial<Record<string, string>>
  values?: Record<string, string>
}

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((v) => (v ? v : undefined))

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid business email.').max(160),
  company: z.string().trim().min(2, 'Please enter your company.').max(160),
  phone: optional(40),
  product: optional(160),
  dimensions: optional(300),
  quantity: optional(100),
  application: optional(160),
  message: optional(2000),
  captchaScope: z.string().regex(/^[A-Za-z0-9_-]{16,160}$/),
  captchaToken: z.string().min(20),
  captchaAnswer: z.string().trim().length(4, 'Enter the 4 characters shown in the image.'),
  sourcePath: optional(200),
})

const fieldNames = ['name', 'email', 'company', 'phone', 'product', 'dimensions', 'quantity', 'application', 'message', 'captchaScope', 'captchaToken', 'captchaAnswer', 'sourcePath']

export async function submitInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const values: Record<string, string> = {}
  for (const key of fieldNames) values[key] = String(formData.get(key) ?? '')

  if (String(formData.get('website') ?? '').length > 0) {
    return { status: 'error', message: 'We could not process this inquiry.', values }
  }

  const parsed = schema.safeParse(values)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0])
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return { status: 'error', message: 'Please check the highlighted fields.', fieldErrors, values }
  }

  const locale = await getRequestLocale()
  const result = await deliverInquiry({ ...parsed.data, locale })

  if (result.ok) {
    return { status: 'success', reference: result.reference }
  }

  if (result.code === 'captcha_failed') {
    return { status: 'error', message: 'The verification code did not match. Please try the new code.', fieldErrors: { captchaAnswer: 'Code did not match.' }, values }
  }
  return {
    status: 'error',
    message: `We could not send your inquiry just now. Please try again, or email ${site.email} and we will reply from there.`,
    values,
  }
}
