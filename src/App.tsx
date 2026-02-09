import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { backgroundRegistry } from './backgrounds'
import { BackgroundList } from './components/BackgroundList'
import { SettingsPanel } from './components/SettingsPanel'
import { PreviewPanel } from './components/PreviewPanel'
import type { BitwallConfig } from './types/backgrounds'
import './App.css'

export default function App(): React.ReactElement {
  const [config, setConfig] = useState<BitwallConfig>({
    backgroundId: 'aurora',
    props: {},
    paused: false
  })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    window.bitwall.getConfig().then((saved) => {
      if (saved && typeof saved === 'object') {
        setConfig(saved as BitwallConfig)
      }
      setLoaded(true)
    })
  }, [])

  const selectedBg = backgroundRegistry.find((bg) => bg.id === config.backgroundId)

  const handleSelectBackground = useCallback((id: string) => {
    const bg = backgroundRegistry.find((b) => b.id === id)
    if (!bg) return
    // Build default props for the new background
    const defaultProps: Record<string, unknown> = {}
    for (const prop of bg.props) {
      defaultProps[prop.key] = prop.default
    }
    setConfig((prev) => ({
      ...prev,
      backgroundId: id,
      props: defaultProps
    }))
  }, [])

  const handlePropChange = useCallback((key: string, value: unknown) => {
    setConfig((prev) => ({
      ...prev,
      props: { ...prev.props, [key]: value }
    }))
  }, [])

  const handleApply = useCallback(() => {
    window.bitwall.applyBackground(config)
  }, [config])

  if (!loaded) {
    return <div className="app loading">Loading...</div>
  }

  return (
    <div className="app">
      <div className="left-panel">
        <h1 className="app-title">BitWall</h1>
        <BackgroundList
          backgrounds={backgroundRegistry}
          selectedId={config.backgroundId}
          onSelect={handleSelectBackground}
        />
      </div>
      <div className="right-panel">
        {selectedBg && (
          <>
            <div className="preview-section">
              <h2>{selectedBg.name}</h2>
              <p className="bg-description">{selectedBg.description}</p>
              <Suspense fallback={<div className="preview-placeholder">Loading preview...</div>}>
                <PreviewPanel background={selectedBg} props={config.props} />
              </Suspense>
            </div>
            <div className="settings-section">
              <SettingsPanel
                background={selectedBg}
                currentProps={config.props}
                onPropChange={handlePropChange}
              />
            </div>
            <button className="apply-btn" onClick={handleApply}>
              Apply Wallpaper
            </button>
          </>
        )}
      </div>
    </div>
  )
}
