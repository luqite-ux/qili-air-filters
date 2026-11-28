'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'

type CompanyVideoPlayerProps = {
  src: string
  poster: string
  title: string
  durationLabel?: string
}

export function CompanyVideoPlayer({
  src,
  poster,
  title,
  durationLabel = '01:33',
}: CompanyVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const video = videoRef.current
        if (!entry || !video) return
        if (!entry.isIntersecting && !video.paused) {
          video.pause()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const handleStart = async () => {
    const video = videoRef.current
    if (!video) return
    setHasError(false)
    setHasStarted(true)
    try {
      await video.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  const handleRetry = () => {
    setHasError(false)
    setHasStarted(false)
    setIsPlaying(false)
    const video = videoRef.current
    if (video) {
      video.load()
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-foreground/95"
    >
      {hasError ? (
        <div className="relative h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={title}
            className="h-full w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/65 p-6 text-center text-white">
            <p className="max-w-md text-sm font-medium sm:text-base">
              Video stream could not be loaded on this connection.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <RotateCcw className="size-4" aria-hidden />
                Retry playback
              </button>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-md border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Open MP4 directly
              </a>
            </div>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls={hasStarted}
            playsInline
            preload="metadata"
            aria-label={title}
            onPlay={() => {
              setHasStarted(true)
              setIsPlaying(true)
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={() => {
              setHasError(true)
              setIsPlaying(false)
            }}
            className="h-full w-full object-cover"
          />

          {!hasStarted && !isPlaying && (
            <button
              type="button"
              onClick={handleStart}
              aria-label={`Play ${title}`}
              className="group absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-foreground/70 via-foreground/25 to-foreground/10 p-6 text-white transition-colors hover:via-foreground/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-105 sm:size-20">
                <Play className="ml-1 size-7 fill-current sm:size-8" aria-hidden />
              </span>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground/75 px-3.5 py-1.5 font-mono text-xs tracking-wider text-white/95 backdrop-blur-sm">
                <span>{durationLabel}</span>
                <span aria-hidden className="text-white/50">·</span>
                <span>Watch company film</span>
              </span>
            </button>
          )}
        </>
      )}
    </div>
  )
}
