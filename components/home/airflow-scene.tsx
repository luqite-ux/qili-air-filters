'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type Props = { active: number; onReady: () => void; onFail: () => void }

const STOP_X = [-2.4, -0.8, 0.8, 2.4]
const CLASSES = [
  { count: 38, color: 0x7a6a53, size: 0.2, speed: 1.5 },
  { count: 56, color: 0x4a86b8, size: 0.15, speed: 1.4 },
  { count: 80, color: 0x1d5fa8, size: 0.11, speed: 1.3 },
  { count: 90, color: 0x1f9d5a, size: 0.11, speed: 1.2 },
  { count: 70, color: 0x2aa6c4, size: 0.08, speed: 1.9 },
]
const LAYER_TINT = ['#e3f3f8', '#d7edf6', '#c9e6f3', '#cdeedd']
const PORE_SPACING = [34, 24, 16, 10]
const START_X = -6.2

function layerTexture(index: number) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = LAYER_TINT[index]
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = 'rgba(11, 100, 130, 0.55)'
  const gap = PORE_SPACING[index]
  for (let y = gap / 2; y < size; y += gap) {
    for (let x = gap / 2 + ((y / gap) % 2 ? gap / 2 : 0); x < size; x += gap) {
      ctx.beginPath()
      ctx.arc(x, y, Math.max(1.2, gap * 0.14), 0, Math.PI * 2)
      ctx.fill()
    }
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export default function AirflowScene({ active, onReady, onFail }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      onFail()
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60)
    camera.position.set(-4.4, 1.5, 11)
    camera.lookAt(0.2, 0, 0)

    const layers = STOP_X.map((x, i) => {
      const map = layerTexture(i)
      const material = new THREE.MeshBasicMaterial({ map, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false })
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 4.2), material)
      mesh.rotation.y = Math.PI / 2
      mesh.position.x = x
      scene.add(mesh)
      return { mesh, material, map }
    })

    const groups = CLASSES.map((cfg, k) => {
      const positions = new Float32Array(cfg.count * 3)
      const state = Array.from({ length: cfg.count }, () => ({
        y: (Math.random() - 0.5) * 3.6,
        z: (Math.random() - 0.5) * 3.0,
        speedScale: 0.7 + Math.random() * 0.6,
        wait: 0,
        phase: Math.random() * Math.PI * 2,
        x: k === 4 ? STOP_X[3] + 0.1 + Math.random() * 3 : START_X + Math.random() * (STOP_X[k] - START_X),
      }))
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const material = new THREE.PointsMaterial({ color: cfg.color, size: cfg.size, sizeAttenuation: true, transparent: true, opacity: 0.92, depthWrite: false })
      const points = new THREE.Points(geometry, material)
      points.frustumCulled = false
      scene.add(points)
      return { cfg, state, positions, geometry, material }
    })

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)

    let last = performance.now()
    let time = 0
    const frame = (now: number, step = true) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (step) time += dt
      groups.forEach((g, k) => {
        const clean = k === 4
        const endX = clean ? 6.4 : STOP_X[k]
        g.state.forEach((p, n) => {
          if (step) {
            if (p.wait > 0) {
              p.wait -= dt
              if (p.wait <= 0) {
                p.x = clean ? STOP_X[3] + 0.1 : START_X
                p.y = (Math.random() - 0.5) * 3.6
                p.z = (Math.random() - 0.5) * 3.0
              }
            } else {
              p.x += g.cfg.speed * p.speedScale * dt
              if (p.x >= endX) {
                p.x = endX
                p.wait = clean ? 0.01 : 2.4 + Math.random() * 2.2
              }
            }
          }
          const stuck = p.wait > 0 && !clean
          const wobble = stuck ? 0 : Math.sin(time * 1.6 + p.phase) * 0.06
          g.positions[n * 3] = stuck ? endX - 0.04 - (n % 5) * 0.02 : p.x
          g.positions[n * 3 + 1] = p.y + wobble
          g.positions[n * 3 + 2] = p.z
        })
        g.geometry.attributes.position.needsUpdate = true
      })
      layers.forEach((layer, i) => {
        const target = i === activeRef.current ? 0.92 : 0.5
        layer.material.opacity += (target - layer.material.opacity) * Math.min(1, dt * 8)
      })
      camera.position.x = -4.4 + Math.sin(time * 0.25) * 0.35
      camera.lookAt(0.2, 0, 0)
      renderer.render(scene, camera)
    }

    frame(performance.now(), false)
    onReady()

    let raf = 0
    let visible = false
    const loop = (now: number) => {
      frame(now)
      raf = requestAnimationFrame(loop)
    }
    const sync = () => {
      const shouldRun = visible && !document.hidden
      if (shouldRun && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(loop)
      } else if (!shouldRun && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    io.observe(host)
    document.addEventListener('visibilitychange', sync)

    const onLost = (event: Event) => {
      event.preventDefault()
      onFail()
    }
    renderer.domElement.addEventListener('webglcontextlost', onLost)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', sync)
      renderer.domElement.removeEventListener('webglcontextlost', onLost)
      layers.forEach((l) => {
        l.mesh.geometry.dispose()
        l.material.dispose()
        l.map.dispose()
      })
      groups.forEach((g) => {
        g.geometry.dispose()
        g.material.dispose()
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [onReady, onFail])

  return <div ref={hostRef} className="absolute inset-0" />
}
