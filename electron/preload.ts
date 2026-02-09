import { contextBridge, ipcRenderer } from 'electron'

export interface BitwallAPI {
  getConfig: () => Promise<unknown>
  saveConfig: (config: unknown) => Promise<boolean>
  applyBackground: (config: unknown) => void
  pauseResume: (paused: boolean) => void
  onBackgroundChanged: (callback: (config: unknown) => void) => () => void
  onPauseResume: (callback: (paused: boolean) => void) => () => void
}

const api: BitwallAPI = {
  getConfig: () => ipcRenderer.invoke('get-config'),
  saveConfig: (config) => ipcRenderer.invoke('save-config', config),
  applyBackground: (config) => ipcRenderer.send('apply-background', config),
  pauseResume: (paused) => ipcRenderer.send('pause-resume', paused),
  onBackgroundChanged: (callback) => {
    const handler = (_event: Electron.IpcRendererEvent, config: unknown): void => {
      callback(config)
    }
    ipcRenderer.on('background-changed', handler)
    return () => ipcRenderer.removeListener('background-changed', handler)
  },
  onPauseResume: (callback) => {
    const handler = (_event: Electron.IpcRendererEvent, paused: boolean): void => {
      callback(paused)
    }
    ipcRenderer.on('pause-resume', handler)
    return () => ipcRenderer.removeListener('pause-resume', handler)
  }
}

contextBridge.exposeInMainWorld('bitwall', api)
