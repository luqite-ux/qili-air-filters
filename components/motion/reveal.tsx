import type { CSSProperties, ElementType, ReactNode } from 'react'

type Variant = 'up' | 'fade' | 'left' | 'right' | 'scale' | 'mask' | 'line' | 'line-y'

type RevealProps = {
  as?: ElementType
  variant?: Variant
  delay?: number
  index?: number
  className?: string
  children?: ReactNode
  id?: string
  'aria-hidden'?: boolean
  style?: CSSProperties
}

/** Server-safe: visible by default. Each instance is observed on its own by MotionRoot. */
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, index, className, children, style, ...rest }: RevealProps) {
  const resolvedDelay = index !== undefined ? (index % 4) * 90 + delay : delay
  return (
    <Tag
      data-reveal={variant}
      className={className}
      style={{ ['--reveal-delay' as string]: `${resolvedDelay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
