'use client'

import { useActionState, useId } from 'react'
import { CheckCircle2, CircleAlert, Send } from 'lucide-react'
import { submitInquiry, type InquiryState } from '@/app/actions/inquiry'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

const initialState: InquiryState = { status: 'idle' }

type Option = { value: string; label: string }

export type InquiryFormProps = {
  /** Every inquiry surface needs its own scope so image codes never cross between forms. */
  captchaScope: string
  sourcePath?: string
  productOptions: Option[]
  applicationOptions: Option[]
  defaultProduct?: string
  defaultApplication?: string
  className?: string
}

function Field({ id, label, required, error, hint, children, className }: { id: string; label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required ? <span className="ml-0.5 text-destructive" aria-hidden> *</span> : <span className="ml-2 text-xs font-normal text-muted-foreground">Optional</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function InquiryForm({ captchaScope, sourcePath, productOptions, applicationOptions, defaultProduct, defaultApplication, className }: InquiryFormProps) {
  const [state, action, pending] = useActionState(submitInquiry, initialState)
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`
  const v = state.values ?? {}
  const err = state.fieldErrors ?? {}
  const describe = (name: string) => (err[name] ? `${id(name)}-error` : undefined)

  if (state.status === 'success') {
    return (
      <div role="status" className={cn('layer-sheet rounded-xl p-8 sm:p-12', className)}>
        <CheckCircle2 className="size-10 text-primary" aria-hidden />
        <h3 className="mt-5 text-2xl font-extrabold">Inquiry received</h3>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Thank you. Our team will review your requirement and reply to the business email you provided.
        </p>
        {state.reference && <p className="mt-5 font-mono text-sm text-air-ink">Reference {state.reference}</p>}
      </div>
    )
  }

  return (
    <form action={action} noValidate className={cn('layer-sheet rounded-xl p-6 sm:p-10', className)} aria-busy={pending}>
      <input type="hidden" name="sourcePath" value={sourcePath ?? ''} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === 'error' && state.message && (
        <div role="alert" className="mb-8 flex items-start gap-3 rounded-sm border border-destructive/40 bg-destructive/5 p-4 text-sm">
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden />
          <p>{state.message}</p>
        </div>
      )}

      <div className="grid gap-x-6 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
        <Field id={id('name')} label="Your name" required error={err.name}>
          <input id={id('name')} name="name" type="text" autoComplete="name" required defaultValue={v.name} className="field-control" aria-invalid={!!err.name} aria-describedby={describe('name')} />
        </Field>
        <Field id={id('email')} label="Business email" required error={err.email}>
          <input id={id('email')} name="email" type="email" autoComplete="email" inputMode="email" required defaultValue={v.email} className="field-control" aria-invalid={!!err.email} aria-describedby={describe('email')} />
        </Field>
        <Field id={id('company')} label="Company" required error={err.company}>
          <input id={id('company')} name="company" type="text" autoComplete="organization" required defaultValue={v.company} className="field-control" aria-invalid={!!err.company} aria-describedby={describe('company')} />
        </Field>

        <Field id={id('phone')} label="Phone / WhatsApp" error={err.phone}>
          <input id={id('phone')} name="phone" type="tel" autoComplete="tel" inputMode="tel" defaultValue={v.phone} className="field-control" aria-invalid={!!err.phone} aria-describedby={describe('phone')} />
        </Field>
        <Field id={id('product')} label="Product or category" error={err.product}>
          <select id={id('product')} name="product" defaultValue={v.product ?? defaultProduct ?? ''} className="field-control">
            <option value="">Select a product family</option>
            {productOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id('application')} label="Target application" error={err.application}>
          <select id={id('application')} name="application" defaultValue={v.application ?? defaultApplication ?? ''} className="field-control">
            <option value="">Select an application</option>
            {applicationOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id('dimensions')} label="Dimensions / specification" error={err.dimensions} className="md:col-span-1 xl:col-span-2" hint="Width × height × depth in mm, media, frame, filter stage">
          <input id={id('dimensions')} name="dimensions" type="text" defaultValue={v.dimensions} className="field-control" aria-invalid={!!err.dimensions} aria-describedby={err.dimensions ? describe('dimensions') : `${id('dimensions')}-hint`} />
        </Field>
        <Field id={id('quantity')} label="Quantity" error={err.quantity} hint="Pieces, rolls or containers">
          <input id={id('quantity')} name="quantity" type="text" defaultValue={v.quantity} className="field-control" aria-invalid={!!err.quantity} aria-describedby={err.quantity ? describe('quantity') : `${id('quantity')}-hint`} />
        </Field>

        <Field id={id('message')} label="Message" error={err.message} className="md:col-span-2 xl:col-span-3">
          <textarea id={id('message')} name="message" rows={5} defaultValue={v.message} className="field-control resize-y" aria-invalid={!!err.message} aria-describedby={describe('message')} />
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
        <InquiryCaptchaField refreshKey={state.values?.captchaToken ? [...state.values.captchaToken].reduce((sum, character) => sum + character.charCodeAt(0), 0) : 0} className="md:max-w-md" />

        <div className="flex flex-col gap-3 md:items-end">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-8 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
          >
            {pending ? <Spinner className="size-4" /> : <Send className="size-4" aria-hidden />}
            {pending ? 'Sending…' : 'Send inquiry'}
          </button>
          <p className="text-xs text-muted-foreground md:text-right">We use your details only to reply to this inquiry.</p>
        </div>
      </div>
    </form>
  )
}
