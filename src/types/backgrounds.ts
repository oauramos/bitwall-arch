import type { ComponentType } from 'react'

export type PropType =
  | 'hex-color'
  | 'hex-color-array'
  | 'rgb-array'
  | 'hue'
  | 'number'
  | 'boolean'
  | 'select'

export interface PropDefinition {
  key: string
  label: string
  type: PropType
  default: unknown
  min?: number
  max?: number
  step?: number
  options?: { label: string; value: string | number }[]
}

export interface BackgroundDefinition {
  id: string
  name: string
  description: string
  renderTech: 'three' | 'ogl' | 'canvas' | 'gsap' | 'css'
  props: PropDefinition[]
  component: ComponentType<Record<string, unknown>>
}

export interface BitwallConfig {
  backgroundId: string
  props: Record<string, unknown>
  paused: boolean
}
