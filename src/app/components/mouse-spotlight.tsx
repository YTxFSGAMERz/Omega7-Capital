'use client'

import { useEffect, useRef } from 'react'

/**
 * MouseSpotlight — A subtle radial gradient spotlight that follows the cursor.
 *
 * Design: monochromatic black/white palette, Crimson Pro serif aesthetic.
 * - Light mode:  rgba(0,0,0,0.03) vignette
 * - Dark mode:   rgba(255,255,255,0.04) vignette
 *
 * Uses requestAnimationFrame + lerp for smooth, lagged tracking.
 * Only active on devices that support hover (desktop).
 * Fades in after 1 s to avoid a flash on page load.
 */

export default function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  // ── Animation state (stored outside React to avoid re-renders) ──────
  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    rafId: 0,
    isDark: false,
    visible: false,
  })

  useEffect(() => {
    const spotlight = spotlightRef.current
    const state = stateRef.current

    // Bail out on touch-primary devices
    if (!window.matchMedia('(hover: hover)').matches) return

    // ── Helpers ────────────────────────────────────────────────────────
    const LERP_FACTOR = 0.15 // ease factor per frame (~0.15 s feel at 60 fps)

    function lerp(from: number, to: number, factor: number): number {
      return from + (to - from) * factor
    }

    function isDarkMode(): boolean {
      return document.documentElement.classList.contains('dark')
    }

    function buildGradient(x: number, y: number): string {
      const color = state.isDark
        ? 'rgba(255,255,255,0.04)'
        : 'rgba(0,0,0,0.03)'

      return `radial-gradient(600px circle at ${x}px ${y}px, ${color}, transparent 40%)`
    }

    // ── Animation loop ─────────────────────────────────────────────────
    function animate() {
      const dx = Math.abs(state.targetX - state.currentX)
      const dy = Math.abs(state.targetY - state.currentY)

      // Only update DOM when position actually changed (saves repaints)
      if (dx > 0.1 || dy > 0.1) {
        state.currentX = lerp(state.currentX, state.targetX, LERP_FACTOR)
        state.currentY = lerp(state.currentY, state.targetY, LERP_FACTOR)

        if (spotlight) {
          spotlight.style.background = buildGradient(
            state.currentX,
            state.currentY,
          )
        }
      }

      state.rafId = requestAnimationFrame(animate)
    }

    // ── Mouse handler (only updates target — RAF does the smooth move) ─
    function onMouseMove(e: MouseEvent) {
      state.targetX = e.clientX
      state.targetY = e.clientY

      // Make visible on first move
      if (!state.visible) {
        state.visible = true
        spotlight?.classList.add('visible')
      }
    }

    // ── Theme observer — update gradient color when dark mode toggles ──
    function handleThemeChange() {
      state.isDark = isDarkMode()
      // Immediately repaint with new color at current position
      if (spotlight) {
        spotlight.style.background = buildGradient(
          state.currentX,
          state.currentY,
        )
      }
    }

    const themeObserver = new MutationObserver(handleThemeChange)

    // ── Bootstrap ──────────────────────────────────────────────────────
    state.isDark = isDarkMode()
    state.currentX = window.innerWidth / 2
    state.currentY = window.innerHeight / 2
    state.targetX = state.currentX
    state.targetY = state.currentY

    // Set initial gradient (centered) so the first frame isn't blank
    if (spotlight) {
      spotlight.style.background = buildGradient(state.currentX, state.currentY)
    }

    // Start animation loop
    state.rafId = requestAnimationFrame(animate)

    // Listen
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Observe class changes on <html> for dark mode toggling
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // ── Cleanup ────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(state.rafId)
      window.removeEventListener('mousemove', onMouseMove)
      themeObserver.disconnect()
    }
  }, [])

  return <div ref={spotlightRef} className="mouse-spotlight" aria-hidden="true" />
}
