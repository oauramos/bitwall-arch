import React, { useState, useEffect, Suspense, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { backgroundRegistry } from './backgrounds'
import type { BitwallConfig } from './types/backgrounds'

declare global {
  interface Window {
    bitwall: {
      onBackgroundChanged: (cb: (config: BitwallConfig) => void) => () => void
      onPauseResume: (cb: (paused: boolean) => void) => () => void
    }
  }
}

// Cap device pixel ratio for performance
const MAX_DPR = 1.5
if (window.devicePixelRatio > MAX_DPR) {
  Object.defineProperty(window, 'devicePixelRatio', {
    get: () => MAX_DPR
  })
}

function WallpaperRenderer(): React.ReactElement {
  const [config, setConfig] = useState<BitwallConfig | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const unsubBg = window.bitwall.onBackgroundChanged((newConfig: BitwallConfig) => {
      setConfig(newConfig)
      setPaused(newConfig.paused)
    })
    const unsubPause = window.bitwall.onPauseResume((p: boolean) => {
      setPaused(p)
    })
    return () => {
      unsubBg()
      unsubPause()
    }
  }, [])

  const bgDef = useMemo(() => {
    if (!config) return null
    return backgroundRegistry.find((bg) => bg.id === config.backgroundId) ?? null
  }, [config?.backgroundId])

  if (!config || !bgDef || paused) {
    return <div style={{ width: '100vw', height: '100vh', background: '#000' }} />
  }

  const Component = bgDef.component

  // Merge default props with saved props
  const mergedProps: Record<string, unknown> = {}
  for (const prop of bgDef.props) {
    mergedProps[prop.key] = config.props[prop.key] ?? prop.default
  }

  return (
    <Suspense fallback={<div style={{ width: '100vw', height: '100vh', background: '#000' }} />}>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Component {...mergedProps} />
      </div>
    </Suspense>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(<WallpaperRenderer />)
