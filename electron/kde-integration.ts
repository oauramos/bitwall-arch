import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function kread(file: string, group: string, key: string): Promise<string> {
  try {
    const { stdout } = await execAsync(
      `kreadconfig6 --file "${file}" --group "${group}" --key "${key}"`
    )
    return stdout.trim()
  } catch {
    return ''
  }
}

async function kwrite(file: string, group: string, key: string, value: string): Promise<void> {
  await execAsync(
    `kwriteconfig6 --file "${file}" --group "${group}" --key "${key}" "${value}"`
  ).catch(() => {})
}

export async function setupKdeIntegration(): Promise<void> {
  try {
    const ruleGroup = 'bitwall-wallpaper'
    const configFile = 'kwinrulesrc'

    const rules: Record<string, string> = {
      Description: 'BitWall Wallpaper',
      wmclass: 'bitwall',
      wmclassmatch: '2', // substring match
      below: 'true',
      belowrule: '2', // force
      skiptaskbar: 'true',
      skiptaskbarrule: '2',
      skippager: 'true',
      skippagerrule: '2',
      skipswitcher: 'true',
      skipswitcherrule: '2',
      acceptfocus: 'false',
      acceptfocusrule: '2',
      noborder: 'true',
      noborderrule: '2'
    }

    // Write rule properties
    for (const [key, value] of Object.entries(rules)) {
      await kwrite(configFile, ruleGroup, key, value)
    }

    // Read existing rules list from [General]
    const existingRules = await kread(configFile, 'General', 'rules')

    // Parse existing rules and ensure ours is included
    const rulesList: string[] = existingRules
      ? existingRules.split(',').map((r) => r.trim()).filter((r) => r.length > 0)
      : []

    if (!rulesList.includes(ruleGroup)) {
      rulesList.push(ruleGroup)
    }

    // Write updated rules list and count (count is required by KWin)
    await kwrite(configFile, 'General', 'rules', rulesList.join(','))
    await kwrite(configFile, 'General', 'count', String(rulesList.length))

    // Reload KWin to apply rules
    await execAsync(
      'qdbus6 org.kde.KWin /KWin reconfigure'
    ).catch(() => {
      return execAsync(
        'dbus-send --type=method_call --dest=org.kde.KWin /KWin org.kde.KWin.reconfigure'
      ).catch(() => {})
    })
  } catch (err) {
    console.warn('KDE integration setup failed (non-fatal):', err)
  }
}

export function lowerWallpaperWindow(): void {
  // Fallback: use xdotool to lower the window below all others
  exec('xdotool search --class bitwall windowlower', (err) => {
    if (err) {
      exec('wmctrl -r bitwall -b add,below', () => {})
    }
  })
}
