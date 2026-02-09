import { Tray, Menu, nativeImage, app } from 'electron'
import { join } from 'path'
import { showSettings } from './main'
import { getWallpaperWindow } from './wallpaper-window'
import { loadConfig, saveConfig } from './config'

let tray: Tray | null = null

export function createTray(): void {
  const iconPath = join(__dirname, '../../resources/icon.png')
  const icon = nativeImage.createFromPath(iconPath).resize({ width: 22, height: 22 })
  tray = new Tray(icon)

  updateTrayMenu()
  tray.setToolTip('BitWall')
  tray.on('click', () => showSettings())
}

function updateTrayMenu(): void {
  if (!tray) return
  const config = loadConfig()

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Settings',
      click: () => showSettings()
    },
    {
      label: config.paused ? 'Resume' : 'Pause',
      click: () => {
        const cfg = loadConfig()
        cfg.paused = !cfg.paused
        saveConfig(cfg)
        const wp = getWallpaperWindow()
        if (wp && !wp.isDestroyed()) {
          wp.webContents.send('pause-resume', cfg.paused)
        }
        updateTrayMenu()
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => app.quit()
    }
  ])

  tray.setContextMenu(contextMenu)
}

export function destroyTray(): void {
  if (tray) {
    tray.destroy()
    tray = null
  }
}
