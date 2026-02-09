import { useState, useEffect, useCallback } from 'react'
import type { BitwallConfig } from '../types/backgrounds'

const DEFAULT_CONFIG: BitwallConfig = {
  backgroundId: 'aurora',
  props: {},
  paused: false
}

export function useConfig() {
  const [config, setConfig] = useState<BitwallConfig>(DEFAULT_CONFIG)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    window.bitwall.getConfig().then((saved) => {
      if (saved && typeof saved === 'object') {
        setConfig(saved as BitwallConfig)
      }
      setLoaded(true)
    })
  }, [])

  const save = useCallback(async (newConfig: BitwallConfig) => {
    setConfig(newConfig)
    await window.bitwall.saveConfig(newConfig)
  }, [])

  return { config, setConfig, save, loaded }
}
