import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ProductImage, VisualKind } from '@/lib/repositories/products'

function Pleats({ x, y, w, h, n = 9 }: { x: number; y: number; w: number; h: number; n?: number }) {
  return (
    <g stroke="currentColor" strokeWidth="1.5" opacity="0.55">
      {Array.from({ length: n }, (_, i) => {
        const px = x + ((i + 0.5) * w) / n
        return <line key={i} x1={px} y1={y} x2={px} y2={y + h} />
      })}
    </g>
  )
}

function Schematic({ kind }: { kind: VisualKind }) {
  const frame = 'fill-white stroke-current'
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full text-air-ink" fill="none" role="img" aria-label="Filter structure schematic">
      <ellipse cx="120" cy="214" rx="82" ry="8" fill="currentColor" opacity="0.08" />
      {kind === 'hightemp' && (
        <g>
          <rect x="50" y="62" width="140" height="130" rx="3" className={frame} strokeWidth="3" />
          <Pleats x={58} y={70} w={124} h={114} n={10} />
          <g stroke="oklch(0.62 0.15 40)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
            <path d="M82 52c-6-8 6-12 0-20" />
            <path d="M120 52c-6-8 6-12 0-20" />
            <path d="M158 52c-6-8 6-12 0-20" />
          </g>
        </g>
      )}
      {kind === 'oilmist' && (
        <g>
          <rect x="50" y="62" width="140" height="130" rx="3" className={frame} strokeWidth="3" />
          <Pleats x={58} y={70} w={124} h={114} n={8} />
          <g fill="oklch(0.72 0.1 210)" opacity="0.85">
            <circle cx="80" cy="44" r="4" />
            <circle cx="108" cy="34" r="3" />
            <circle cx="138" cy="46" r="5" />
            <circle cx="164" cy="36" r="3" />
            <path d="M98 200c0-6 5-10 5-10s5 4 5 10a5 5 0 0 1-10 0Z" />
          </g>
        </g>
      )}
      {kind === 'media' && (
        <g>
          <path d="M60 170h120l14 16H46Z" fill="currentColor" opacity="0.1" />
          <rect x="70" y="70" width="100" height="100" rx="4" className={frame} strokeWidth="3" />
          <ellipse cx="120" cy="70" rx="50" ry="14" className={frame} strokeWidth="3" />
          <ellipse cx="120" cy="70" rx="14" ry="4" fill="currentColor" opacity="0.35" />
          <path d="M70 100c30 10 70 10 100 0M70 130c30 10 70 10 100 0" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
          <path d="M170 170c18 0 24 8 40 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {kind === 'household' && (
        <g>
          <ellipse cx="120" cy="64" rx="56" ry="16" className={frame} strokeWidth="3" />
          <path d="M64 64v110c0 9 25 16 56 16s56-7 56-16V64" className={frame} strokeWidth="3" />
          <Pleats x={70} y={78} w={100} h={100} n={11} />
          <ellipse cx="120" cy="64" rx="22" ry="6" fill="currentColor" opacity="0.3" />
        </g>
      )}
      {kind === 'unit' && (
        <g>
          <rect x="44" y="60" width="152" height="136" rx="4" className={frame} strokeWidth="3" />
          <rect x="62" y="78" width="116" height="100" rx="2" fill="currentColor" opacity="0.07" stroke="currentColor" strokeWidth="2" />
          <Pleats x={66} y={82} w={108} h={92} n={12} />
          <path d="M44 60l14-14h152l-14 14M196 60l14-14v136l-14 14" stroke="currentColor" strokeWidth="3" fill="white" />
        </g>
      )}
      {(kind === 'panel' || kind === 'bag' || kind === 'hepa' || kind === 'chemical' || kind === 'pad') && (
        <g>
          <rect x="50" y="62" width="140" height="130" rx="3" className={frame} strokeWidth="3" />
          <Pleats x={58} y={70} w={124} h={114} n={9} />
        </g>
      )}
    </svg>
  )
}

export function ProductVisual({
  image,
  kind,
  sizes,
  priority,
  className,
}: {
  image?: ProductImage
  kind: VisualKind
  sizes: string
  priority?: boolean
  className?: string
}) {
  return (
    <div className={cn('relative aspect-square w-full overflow-hidden bg-white', className)}>
      {image ? (
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} priority={priority} className="h-full w-full object-contain" />
      ) : (
        <div className="grid h-full w-full place-items-center bg-[linear-gradient(160deg,white,var(--mist))] p-[12%]">
          <Schematic kind={kind} />
        </div>
      )}
    </div>
  )
}
