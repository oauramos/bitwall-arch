import { BrowserWindow, screen } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { BitwallConfig } from './config'
import { lowerWallpaperWindow } from './kde-integration'

let wallpaperWindow: BrowserWindow | null = null

export function createWallpaperWindow(config: BitwallConfig): BrowserWindow {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { x, y, width, height } = primaryDisplay.bounds

  wallpaperWindow = new BrowserWindow({
    x,
    y,
    width,
    height,
    frame: false,
    focusable: false,
    skipTaskbar: true,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    closable: false,
    fullscreenable: false,
    hasShadow: false,
    transparent: false,
    backgroundColor: '#000000',
    type: 'desktop',
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      backgroundThrottling: false
    }
  })

  wallpaperWindow.setAlwaysOnTop(false)

  // Show window after ready, then lower it below all others
  wallpaperWindow.once('ready-to-show', () => {
    wallpaperWindow?.show()
    // Give KWin a moment to apply rules, then force lower as fallback
    setTimeout(() => lowerWallpaperWindow(), 500)
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    wallpaperWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/wallpaper.html`)
  } else {
    wallpaperWindow.loadFile(join(__dirname, '../renderer/wallpaper.html'))
  }

  // Send initial config once loaded
  wallpaperWindow.webContents.on('did-finish-load', () => {
    wallpaperWindow?.webContents.send('background-changed', config)
    if (config.paused) {
      wallpaperWindow?.webContents.send('pause-resume', true)
    }
  })

  return wallpaperWindow
}

export function getWallpaperWindow(): BrowserWindow | null {
  return wallpaperWindow
}

export function destroyWallpaperWindow(): void {
  if (wallpaperWindow && !wallpaperWindow.isDestroyed()) {
    wallpaperWindow.destroy()
    wallpaperWindow = null
  }
}
