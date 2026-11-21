import { InquiryForm } from '@/components/inquiry/inquiry-form'
import { getCategories } from '@/lib/repositories/products'
import { getApplications } from '@/lib/repositories/applications'

export async function RfqForm({
  captchaScope,
  sourcePath,
  defaultProduct,
  defaultApplication,
  className,
}: {
  captchaScope: string
  sourcePath: string
  defaultProduct?: string
  defaultApplication?: string
  className?: string
}) {
  const [categories, applications] = await Promise.all([getCategories(), getApplications()])
  return (
    <InquiryForm
      captchaScope={captchaScope}
      sourcePath={sourcePath}
      defaultProduct={defaultProduct}
      defaultApplication={defaultApplication}
      className={className}
      productOptions={categories.map((c) => ({ value: c.name, label: c.name }))}
      applicationOptions={applications.map((a) => ({ value: a.name, label: a.name }))}
    />
  )
}
