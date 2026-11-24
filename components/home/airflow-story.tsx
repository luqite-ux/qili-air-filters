'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { AirflowSvg } from '@/components/home/airflow-svg'
import { cn } from '@/lib/utils'

const AirflowScene = dynamic(() => import('@/components/home/airflow-scene'), { ssr: false })

type Layer = { id: string; stage: string; title: string; text: string }

function canUseWebgl() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (!window.matchMedia('(min-width: 768px)').matches) return false
  if (nav.connection?.saveData) return false
  if (nav.deviceMemory && nav.deviceMemory < 4) return false
  if (nav.hardwareConcurrency && nav.hardwareConcurrency < 4) return false
  const probe = document.createElement('canvas')
  const gl = probe.getContext('webgl2') ?? probe.getContext('webgl')
  if (!gl) return false
  gl.getExtension('WEBGL_lose_context')?.loseContext()
  return true
}

export function AirflowStory({ layers }: { layers: Layer[] }) {
  const [active, setActive] = useState(0)
  const [eligible, setEligible] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setEligible(canUseWebgl()))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const onReady = useCallback(() => setReady(true), [])
  const onFail = useCallback(() => {
    setFailed(true)
    setReady(false)
  }, [])

  const showScene = eligible && !failed

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <figure className="layer-sheet relative overflow-hidden rounded-xl p-4 sm:p-6 lg:col-span-7">
        <div className="relative aspect-[800/460] w-full">
          <div className={cn('absolute inset-0 transition-opacity duration-700', showScene && ready ? 'opacity-0' : 'opacity-100')} aria-hidden={showScene && ready}>
            <AirflowSvg active={active} />
          </div>
          {showScene && <AirflowScene active={active} onReady={onReady} onFail={onFail} />}
        </div>
        <figcaption className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-[#7a6a53]" aria-hidden />Coarse dust</span>
          <span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-[#4a86b8]" aria-hidden />Fine dust</span>
          <span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-[#1d5fa8]" aria-hidden />Fine particles</span>
          <span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-[#1f9d5a]" aria-hidden />Gaseous contaminants</span>
          <span className="ml-auto">Illustration, not measured data</span>
        </figcaption>
      </figure>

      <ol className="lg:col-span-5" aria-label="Filtration stages">
        {layers.map((layer, i) => {
          const on = i === active
          return (
            <li key={layer.id} className="border-t border-border last:border-b">
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={on}
                className="group flex min-h-11 w-full gap-5 py-5 text-left"
              >
                <span className={cn('mt-1 font-mono text-xs tracking-[0.14em]', on ? 'text-primary' : 'text-muted-foreground')}>{layer.stage}</span>
                <span className="flex-1">
                  <span className={cn('block text-lg font-bold transition-colors', on ? 'text-foreground' : 'text-foreground/70')}>{layer.title}</span>
                  <span className={cn('grid transition-all duration-500', on ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 lg:grid-rows-[0fr]')}>
                    <span className="overflow-hidden text-sm leading-relaxed text-muted-foreground">{layer.text}</span>
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
