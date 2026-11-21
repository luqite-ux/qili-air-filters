'use client'

import { useState } from 'react'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/lib/repositories/products'

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const current = images[index]
  const many = images.length > 1
  const step = (dir: number) => setIndex((i) => (i + dir + images.length) % images.length)

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <div className="layer-sheet relative aspect-square overflow-hidden rounded-lg bg-white">
          <Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="(min-width:1024px) 46vw, 92vw" priority className="h-full w-full object-contain" />
          <Dialog.Trigger
            className="absolute bottom-3 right-3 inline-flex h-11 items-center gap-2 rounded-sm border border-border bg-white/90 px-4 text-sm font-semibold backdrop-blur hover:bg-white"
            aria-label={`Enlarge image of ${name}`}
          >
            <Maximize2 className="size-4" aria-hidden />
            Enlarge
          </Dialog.Trigger>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[oklch(0.35_0.05_240/0.45)] backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed inset-4 z-50 flex flex-col rounded-lg bg-white p-4 shadow-2xl focus:outline-none sm:inset-10">
            <div className="flex items-center justify-between gap-4">
              <Dialog.Title className="text-base font-bold">{name}</Dialog.Title>
              <Dialog.Close className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-input" aria-label="Close enlarged image">
                <X className="size-5" aria-hidden />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">Enlarged product image. Press Escape to close.</Dialog.Description>
            <div className="relative mt-3 min-h-0 flex-1">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            {many && (
              <div className="mt-3 flex justify-center gap-2">
                <button type="button" onClick={() => step(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-input" aria-label="Previous image">
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button type="button" onClick={() => step(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-input" aria-label="Next image">
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {many && (
        <ul className="mt-3 flex gap-2" aria-label="Product images">
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === index}
                className={cn('relative h-20 w-20 overflow-hidden rounded-sm border bg-white', i === index ? 'border-primary' : 'border-border')}
              >
                <Image src={image.src} alt="" width={160} height={160} className="h-full w-full object-contain" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
