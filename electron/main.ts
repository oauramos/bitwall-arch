import { app, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { spawn } from 'child_process'
import { is } from '@electron-toolkit/utils'
import { createTray, destroyTray } from './tray'
import { createWallpaperWindow, destroyWallpaperWindow, getWallpaperWindow } from './wallpaper-window'
import { setupKdeIntegration } from './kde-integration'
import { loadConfig, saveConfig, BitwallConfig } from './config'

// Ensure WM_CLASS is 'bitwall' even in dev mode
app.setName('bitwall')

let settingsWindow: BrowserWindow | null = null

function createSettingsWindow(): void {
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.show()
    settingsWindow.focus()
    return
  }

  settingsWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    minWidth: 900,
    minHeight: 600,
    title: 'BitWall Settings',
    icon: join(__dirname, '../../resources/icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    settingsWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    settingsWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  settingsWindow.on('close', (e) => {
    e.preventDefault()
    settingsWindow?.hide()
  })
}

export function showSettings(): void {
  createSettingsWindow()
}

app.whenReady().then(async () => {
  const config = loadConfig()

  // Setup KDE integration (KWin rules)
  await setupKdeIntegration()

  // Create wallpaper window
  createWallpaperWindow(config)

  // Create settings window
  createSettingsWindow()

  // Create system tray
  createTray()

  // IPC handlers
  ipcMain.handle('get-config', () => {
    return loadConfig()
  })

  ipcMain.handle('save-config', (_event, newConfig: BitwallConfig) => {
    saveConfig(newConfig)
    return true
  })

  ipcMain.on('apply-background', (_event, newConfig: BitwallConfig) => {
    saveConfig(newConfig)
    const wp = getWallpaperWindow()
    if (wp && !wp.isDestroyed()) {
      wp.webContents.send('background-changed', newConfig)
    }
  })

  ipcMain.on('pause-resume', (_event, paused: boolean) => {
    const config = loadConfig()
    config.paused = paused
    saveConfig(config)
    const wp = getWallpaperWindow()
    if (wp && !wp.isDestroyed()) {
      wp.webContents.send('pause-resume', paused)
    }
  })

  // Screen lock detection via D-Bus
  setupScreenLockDetection()
})

// Don't quit when all windows are closed (tray app)
app.on('window-all-closed', (e: Event) => {
  e.preventDefault()
})

app.on('before-quit', () => {
  destroyTray()
  destroyWallpaperWindow()
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.removeAllListeners('close')
    settingsWindow.close()
  }
  app.exit(0)
})

app.on('activate', () => {
  showSettings()
})

function setupScreenLockDetection(): void {
  try {
    const monitor = spawn('dbus-monitor', [
      '--session',
      "type='signal',interface='org.freedesktop.ScreenSaver',member='ActiveChanged'"
    ])

    monitor.stdout.on('data', (data: Buffer) => {
      const str = data.toString()
      if (str.includes('boolean true')) {
        // Screen locked - pause wallpaper
        const wp = getWallpaperWindow()
        if (wp && !wp.isDestroyed()) {
          wp.webContents.send('pause-resume', true)
        }
      } else if (str.includes('boolean false')) {
        // Screen unlocked - resume if not user-paused
        const config = loadConfig()
        if (!config.paused) {
          const wp = getWallpaperWindow()
          if (wp && !wp.isDestroyed()) {
            wp.webContents.send('pause-resume', false)
          }
        }
      }
    })

    monitor.on('error', () => {
      console.warn('D-Bus monitor not available for screen lock detection')
    })

    app.on('before-quit', () => {
      monitor.kill()
    })
  } catch {
    console.warn('Screen lock detection unavailable')
  }
}
