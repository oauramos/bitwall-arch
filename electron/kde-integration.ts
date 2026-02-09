import { exec } from 'child_process'
import { promisify } from 'util'
import { existsSync, mkdirSync, copyFileSync } from 'fs'
import { join } from 'path'
import { app } from 'electron'

const execAsync = promisify(exec)

let kwinScriptPath = ''

export async function setupKdeIntegration(): Promise<void> {
  try {
    // Install the KWin script files
    kwinScriptPath = await installKwinScript()

    // Clean up legacy KWin rules
    await removeLegacyKwinRules()
  } catch (err) {
    console.warn('KDE integration setup failed (non-fatal):', err)
  }
}

async function installKwinScript(): Promise<string> {
  const userScriptDir = join(
    process.env.HOME || app.getPath('home'),
    '.local/share/kwin/scripts/bitwall'
  )
  const codeDir = join(userScriptDir, 'contents/code')

  let scriptSrcDir: string
  if (app.isPackaged) {
    scriptSrcDir = join(process.resourcesPath, 'kwin-script')
  } else {
    scriptSrcDir = join(app.getAppPath(), 'resources/kwin-script')
  }

  const metadataSrc = join(scriptSrcDir, 'metadata.json')
  const mainJsSrc = join(scriptSrcDir, 'contents/code/main.js')
  const mainJsDst = join(codeDir, 'main.js')

  if (existsSync(metadataSrc) && existsSync(mainJsSrc)) {
    mkdirSync(codeDir, { recursive: true })
    copyFileSync(metadataSrc, join(userScriptDir, 'metadata.json'))
    copyFileSync(mainJsSrc, mainJsDst)
  }

  return mainJsDst
}

async function removeLegacyKwinRules(): Promise<void> {
  const configFile = 'kwinrulesrc'
  const ruleGroup = 'bitwall-wallpaper'

  await execAsync(
    `kwriteconfig6 --file "${configFile}" --group "${ruleGroup}" --delete-group`
  ).catch(() => {})

  try {
    const { stdout } = await execAsync(
      `kreadconfig6 --file "${configFile}" --group "General" --key "rules"`
    )
    const existing = stdout.trim()
    if (existing.includes(ruleGroup)) {
      const rulesList = existing
        .split(',')
        .map((r) => r.trim())
        .filter((r) => r.length > 0 && r !== ruleGroup)

      if (rulesList.length > 0) {
        await execAsync(
          `kwriteconfig6 --file "${configFile}" --group "General" --key "rules" "${rulesList.join(',')}"`
        ).catch(() => {})
        await execAsync(
          `kwriteconfig6 --file "${configFile}" --group "General" --key "count" "${rulesList.length}"`
        ).catch(() => {})
      } else {
        await execAsync(
          `kwriteconfig6 --file "${configFile}" --group "General" --key "rules" --delete`
        ).catch(() => {})
        await execAsync(
          `kwriteconfig6 --file "${configFile}" --group "General" --key "count" --delete`
        ).catch(() => {})
      }
    }
  } catch {
    // No rules to clean
  }
}

export function lowerWallpaperWindow(): void {
  if (!kwinScriptPath || !existsSync(kwinScriptPath)) {
    // Fallback: just lower the window via xdotool
    exec('xdotool search --name "BitWall Wallpaper" windowlower', () => {})
    return
  }

  // Load and run the KWin script directly via D-Bus
  // The script sets skipTaskbar/skipPager/skipSwitcher on the wallpaper window
  // but does NOT set keepBelow (which conflicts with type: 'desktop' causing layer=9)
  const loadCmd = `qdbus6 org.kde.KWin /Scripting org.kde.kwin.Scripting.loadScript "${kwinScriptPath}" "bitwall-runtime"`
  const startCmd = 'qdbus6 org.kde.KWin /Scripting org.kde.kwin.Scripting.start'

  exec(
    `qdbus6 org.kde.KWin /Scripting org.kde.kwin.Scripting.unloadScript "bitwall-runtime" 2>/dev/null; ${loadCmd} && ${startCmd}`,
    (err) => {
      if (err) {
        exec('xdotool search --name "BitWall Wallpaper" windowlower', () => {})
      }
    }
  )
}
