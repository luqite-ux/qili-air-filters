'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import type { HeroSlide } from '@/lib/content/home'
import { cn } from '@/lib/utils'
import { siteTypographyStyle } from '@/lib/site-content/typography'

const INTERVAL = 7000

export function HeroCarousel({ slides, styles }: { slides: HeroSlide[]; styles?: Record<string, unknown> }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [engaged, setEngaged] = useState(false)
  const touchStart = useRef<number | null>(null)
  const count = slides.length

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const frame = window.requestAnimationFrame(() => setPlaying(!reduce.matches))
    const onChange = () => reduce.matches && setPlaying(false)
    reduce.addEventListener('change', onChange)
    return () => {
      window.cancelAnimationFrame(frame)
      reduce.removeEventListener('change', onChange)
    }
  }, [])

  const running = playing && !engaged

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL)
    return () => window.clearTimeout(timer)
  }, [running, index, count])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      go(index + 1)
    } else if (event.key === 'ArrowLeft') {
      go(index - 1)
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Qili Air Filters highlights"
      className="relative overflow-x-clip border-b border-border bg-mist"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false)
      }}
    >
      <h1 className="sr-only">Qili Air Filters: air filters and filter media manufactured in Kunshan, China</h1>

      <div
        className="grid touch-pan-y"
        aria-live={running ? 'off' : 'polite'}
        onTouchStart={(e) => {
          touchStart.current = e.touches[0]?.clientX ?? null
        }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return
          const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStart.current
          touchStart.current = null
          if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1))
        }}
      >
        {slides.map((slide, i) => {
          const active = i === index
          const side = slide.id === 'range' ? 'right' : slide.id === 'application' ? 'left' : slide.side
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${slide.tabLabel}`}
              aria-hidden={!active}
              inert={!active}
              data-active={active}
              className="hero-slide flex flex-col lg:block lg:h-[clamp(30rem,41.7vw,44rem)] lg:relative"
            >
              <div className="hero-media relative aspect-[2400/1000] w-full lg:absolute lg:inset-0 lg:aspect-auto">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={cn('object-cover', side === 'left' ? 'object-[70%_center]' : 'object-[30%_center]')}
                />
              </div>

              <div className={cn('container-x relative py-8 lg:absolute lg:inset-0 lg:flex lg:items-center lg:py-0', side === 'right' ? 'lg:justify-end' : 'lg:justify-start')}>
                <div className="hero-layer w-full rounded-lg bg-background/95 p-6 sm:p-8 lg:max-w-[28rem] lg:border lg:border-border lg:bg-background/90 lg:p-9 lg:shadow-[0_32px_64px_-36px_oklch(0.35_0.08_235/0.55)] lg:backdrop-blur-md xl:max-w-[31rem]" style={{ ['--layer' as string]: 0 }}>
                  <p className="hero-layer eyebrow flex items-center gap-3" style={{ ['--layer' as string]: 1 }}>
                    <span aria-hidden className="h-px w-8 bg-air" />
                    {slide.eyebrow}
                  </p>
                  <h2 className="hero-layer hero-managed-title mt-4 text-[1.9rem] font-extrabold leading-[1.08] sm:text-4xl xl:text-[2.6rem]" style={{ ['--layer' as string]: 2, ...siteTypographyStyle(styles, `slides.${slide.id}.title`, { 'site-sans': 'var(--font-manrope), sans-serif' }) }}>
                    {slide.title}
                  </h2>
                  <p className="hero-layer mt-4 text-base leading-relaxed text-muted-foreground" style={{ ['--layer' as string]: 3 }}>
                    {slide.body}
                  </p>
                  <div className="hero-layer mt-7 flex flex-col gap-3 sm:flex-row" style={{ ['--layer' as string]: 4 }}>
                    <Link
                      href={slide.cta.href}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      {slide.cta.label}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                    <Link
                      href={slide.secondary.href}
                      className="inline-flex min-h-12 items-center justify-center rounded-sm border border-input bg-white px-6 text-sm font-bold transition-colors hover:bg-mist"
                    >
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-border bg-background">
        <div className="container-x flex items-center gap-3 py-3">
          <div role="group" aria-label="Slide controls" className="flex items-center gap-1">
            <button type="button" onClick={() => go(index - 1)} className="inline-flex size-11 items-center justify-center rounded-sm hover:bg-mist" aria-label="Previous slide">
              <ArrowLeft className="size-5" aria-hidden />
            </button>
            <button type="button" onClick={() => go(index + 1)} className="inline-flex size-11 items-center justify-center rounded-sm hover:bg-mist" aria-label="Next slide">
              <ArrowRight className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex size-11 items-center justify-center rounded-sm hover:bg-mist"
              aria-label={playing ? 'Pause automatic slide rotation' : 'Start automatic slide rotation'}
              aria-pressed={!playing}
            >
              {playing ? <Pause className="size-5" aria-hidden /> : <Play className="size-5" aria-hidden />}
            </button>
          </div>

          <div role="group" aria-label="Choose slide" className="grid flex-1 grid-cols-3 gap-2 sm:gap-4">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-current={i === index}
                aria-label={`Show slide ${i + 1}: ${slide.tabLabel}`}
                className="group relative flex min-h-11 flex-col justify-center gap-1.5 text-left"
              >
                <span className={cn('truncate font-mono text-[0.7rem] uppercase tracking-[0.12em] sm:text-xs', i === index ? 'font-bold text-foreground' : 'text-muted-foreground group-hover:text-foreground')}>
                  <span className="mr-1.5">0{i + 1}</span>
                  <span className="hidden sm:inline">{slide.tabLabel}</span>
                </span>
                <span className="relative h-0.5 w-full overflow-hidden bg-border">
                  {i === index && (
                    <span
                      key={`${index}-${running}`}
                      className="hero-progress-bar absolute inset-0 bg-primary"
                      style={{ ['--hero-interval' as string]: `${INTERVAL}ms`, animationPlayState: running ? 'running' : 'paused' }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
