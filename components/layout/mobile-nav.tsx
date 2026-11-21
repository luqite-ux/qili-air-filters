'use client'

import { useState } from 'react'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowRight, Menu, X } from 'lucide-react'
import { NavLinks } from '@/components/layout/nav-links'
import { site } from '@/lib/site'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-input bg-white xl:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[oklch(0.35_0.05_240/0.3)] backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(24rem,100vw)] flex-col bg-background p-6 shadow-2xl data-[state=open]:animate-in data-[state=open]:slide-in-from-right focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="eyebrow">Menu</Dialog.Title>
            <Dialog.Close className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-input bg-white" aria-label="Close menu">
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav aria-label="Mobile" className="mt-6 flex-1 overflow-y-auto">
            <NavLinks orientation="vertical" onNavigate={() => setOpen(false)} />
          </nav>
          <div className="mt-6 space-y-3 border-t border-border pt-6">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-between rounded-sm bg-primary px-5 text-sm font-bold text-primary-foreground"
            >
              Request a Quote <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a href={`mailto:${site.email}`} className="block min-h-11 py-2 text-sm text-muted-foreground">
              {site.email}
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
