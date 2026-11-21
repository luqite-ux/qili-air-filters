import { cn } from '@/lib/utils'

const LAYER_X = [190, 320, 450, 580]
const PARTICLES = [
  { r: 6.5, fill: '#7a6a53', ys: [112, 150, 196, 236, 278, 318, 352] },
  { r: 4.6, fill: '#4a86b8', ys: [128, 168, 214, 258, 300, 340] },
  { r: 3.4, fill: '#1d5fa8', ys: [120, 160, 206, 250, 292, 334, 366] },
  { r: 3.4, fill: '#1f9d5a', ys: [136, 182, 226, 270, 314, 350] },
]

/** Static, no-JS airflow explanation. Also the mobile / low-power / reduced-motion / failure fallback for the WebGL scene. */
export function AirflowSvg({ active = 0, className }: { active?: number; className?: string }) {
  return (
    <svg viewBox="0 0 800 460" role="img" aria-label="Air passes through four filtration layers from left to right: a pre-filter, a bag filter, HEPA media and chemical media. Each layer holds back a finer class of contaminant." className={cn('h-auto w-full', className)}>
      <defs>
        <linearGradient id="airflow-air" x1="0" x2="1">
          <stop offset="0" stopColor="#7a6a53" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#2aa6c4" stopOpacity="0.7" />
          <stop offset="1" stopColor="#67d4e8" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {[96, 150, 204, 258, 312, 366].map((y, i) => (
        <line key={y} x1={20} x2={780} y1={y} y2={y} stroke="url(#airflow-air)" strokeWidth={1.6} strokeDasharray="6 10" className="flow-dash" opacity={0.55} style={{ animationDelay: `${i * -0.5}s` }} />
      ))}

      {LAYER_X.map((x, i) => {
        const on = i === active
        const lines = 3 + i * 3
        return (
          <g key={x}>
            <polygon
              points={`${x},96 ${x + 56},64 ${x + 56},392 ${x},424`}
              fill={on ? '#d8f1f7' : '#f1f8fb'}
              fillOpacity={on ? 0.95 : 0.8}
              stroke={on ? '#0b7f9a' : '#7fb6c9'}
              strokeWidth={on ? 2.5 : 1.25}
            />
            {Array.from({ length: lines }).map((_, k) => {
              const t = (k + 1) / (lines + 1)
              return <line key={k} x1={x} x2={x + 56} y1={96 + t * 328} y2={64 + t * 328} stroke={on ? '#0b7f9a' : '#7fb6c9'} strokeOpacity={0.55} strokeWidth={1} />
            })}
            <text x={x + 28} y={448} textAnchor="middle" fontSize={13} fontWeight={on ? 700 : 500} fill={on ? '#0a5a70' : '#4c6674'} fontFamily="var(--font-geist-mono), monospace">
              0{i + 1}
            </text>
          </g>
        )
      })}

      {PARTICLES.map((group, k) =>
        group.ys.map((y, n) => (
          <circle key={`${k}-${n}`} cx={LAYER_X[k] - 10 - ((n * 7) % 28)} cy={y} r={group.r} fill={group.fill} fillOpacity={0.9} />
        )),
      )}

      {[130, 190, 250, 310, 360].map((y, n) => (
        <circle key={y} cx={660 + ((n * 23) % 100)} cy={y} r={2.4} fill="#2aa6c4" fillOpacity={0.85} />
      ))}

      <text x={24} y={34} fontSize={12} fill="#4c6674" fontFamily="var(--font-geist-mono), monospace" letterSpacing="1.5">
        INCOMING AIR
      </text>
      <text x={776} y={34} textAnchor="end" fontSize={12} fill="#0a5a70" fontFamily="var(--font-geist-mono), monospace" letterSpacing="1.5">
        CLEANER AIR
      </text>
    </svg>
  )
}
