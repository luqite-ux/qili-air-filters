import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, showWordmark = true, size = 44 }: { className?: string; showWordmark?: boolean; size?: number }) {
  return (
    <Link href="/" aria-label="Qili Air Filters, home" className={cn('group inline-flex min-h-11 items-center gap-3', className)}>
      <span
        className="relative block shrink-0 overflow-hidden rounded-[6px] bg-[#059142]"
        style={{ width: size, height: size }}
      >
        <Image
          src="/images/brand/qili-logo.jpg"
          alt=""
          width={size * 2}
          height={size * 2}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-tight">
          <span className="text-base font-bold tracking-tight">Qili Air Filters</span>
          <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:block">
            Kunshan, China
          </span>
        </span>
      )}
    </Link>
  )
}
