import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
  as: Tag = 'h2',
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  className?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <Reveal variant="fade">
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-air" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <Tag className="mt-4 text-balance text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-[3.25rem]">{title}</Tag>
      </Reveal>
      {children && (
        <Reveal delay={160}>
          <div className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{children}</div>
        </Reveal>
      )}
    </div>
  )
}
