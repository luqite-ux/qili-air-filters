'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { mainNav } from '@/lib/site'

export function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function NavLinks({ className, onNavigate, orientation = 'horizontal' }: { className?: string; onNavigate?: () => void; orientation?: 'horizontal' | 'vertical' }) {
  const pathname = usePathname()
  return (
    <ul className={cn(orientation === 'horizontal' ? 'flex items-center gap-0.5' : 'flex flex-col', className)}>
      {mainNav.map((item) => {
        const active = isActive(pathname, item.href)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative flex min-h-11 items-center px-3 text-sm font-semibold transition-colors',
                orientation === 'vertical' && 'border-b border-border px-0 py-4 text-2xl font-bold tracking-tight',
                active ? 'text-primary' : 'text-foreground/80 hover:text-foreground',
              )}
            >
              {item.label}
              {orientation === 'horizontal' && (
                <span
                  aria-hidden
                  className={cn('absolute inset-x-3 bottom-1.5 h-0.5 origin-left bg-primary transition-transform duration-300', active ? 'scale-x-100' : 'scale-x-0')}
                />
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
