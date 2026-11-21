'use client'

import { useEffect } from 'react'

const SELECTOR = '[data-reveal]:not([data-revealed])'

export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-motion-hydrated', 'true')

    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (query.matches || !('IntersectionObserver' in window)) {
      root.removeAttribute('data-motion-ready')
      return
    }
    root.setAttribute('data-motion-ready', 'true')

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', 'true')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    const scan = (node: ParentNode) => node.querySelectorAll(SELECTOR).forEach((el) => io.observe(el))
    scan(document)

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches(SELECTOR)) io.observe(node)
          scan(node)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    const onChange = () => {
      if (!query.matches) return
      root.removeAttribute('data-motion-ready')
      io.disconnect()
      mo.disconnect()
    }
    query.addEventListener('change', onChange)

    return () => {
      query.removeEventListener('change', onChange)
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
