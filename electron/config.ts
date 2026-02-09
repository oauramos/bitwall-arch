import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

export interface BitwallConfig {
  backgroundId: string
  props: Record<string, unknown>
  paused: boolean
}

const CONFIG_DIR = join(homedir(), '.config', 'bitwall')
const CONFIG_PATH = join(CONFIG_DIR, 'config.json')

const DEFAULT_CONFIG: BitwallConfig = {
  backgroundId: 'aurora',
  props: {},
  paused: false
}

export function loadConfig(): BitwallConfig {
  try {
    if (existsSync(CONFIG_PATH)) {
      const raw = readFileSync(CONFIG_PATH, 'utf-8')
      return { ...DEFAULT_CONFIG, ...JSON.parse(raw) }
    }
  } catch {
    // Fall through to default
  }
  return { ...DEFAULT_CONFIG }
}

export function saveConfig(config: BitwallConfig): void {
  try {
    if (!existsSync(CONFIG_DIR)) {
      mkdirSync(CONFIG_DIR, { recursive: true })
    }
    writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to save config:', err)
  }
}
