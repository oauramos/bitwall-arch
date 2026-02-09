import React from 'react'
import type { BackgroundDefinition, PropDefinition } from '../types/backgrounds'
import { ColorPicker } from './ColorPicker'
import './SettingsPanel.css'

interface SettingsPanelProps {
  background: BackgroundDefinition
  currentProps: Record<string, unknown>
  onPropChange: (key: string, value: unknown) => void
}

export function SettingsPanel({ background, currentProps, onPropChange }: SettingsPanelProps): React.ReactElement {
  if (background.props.length === 0) {
    return <div className="settings-empty">No configurable properties</div>
  }

  return (
    <div className="settings-panel">
      {background.props.map((prop) => (
        <PropControl
          key={prop.key}
          prop={prop}
          value={currentProps[prop.key] ?? prop.default}
          onChange={(val) => onPropChange(prop.key, val)}
        />
      ))}
    </div>
  )
}

interface PropControlProps {
  prop: PropDefinition
  value: unknown
  onChange: (value: unknown) => void
}

function PropControl({ prop, value, onChange }: PropControlProps): React.ReactElement {
  switch (prop.type) {
    case 'hex-color':
      return (
        <div className="prop-row">
          <label>{prop.label}</label>
          <ColorPicker value={value as string} onChange={onChange} />
        </div>
      )

    case 'hex-color-array':
      return (
        <div className="prop-row">
          <label>{prop.label}</label>
          <div className="color-array">
            {(value as string[]).map((c, i) => (
              <ColorPicker
                key={i}
                value={c}
                onChange={(newC) => {
                  const arr = [...(value as string[])]
                  arr[i] = newC as string
                  onChange(arr)
                }}
              />
            ))}
          </div>
        </div>
      )

    case 'rgb-array':
      return (
        <div className="prop-row">
          <label>{prop.label}</label>
          <RgbControl value={value as number[]} onChange={onChange} />
        </div>
      )

    case 'hue':
      return (
        <div className="prop-row">
          <label>{prop.label}</label>
          <div className="hue-slider-wrap">
            <input
              type="range"
              className="hue-slider"
              min={0}
              max={360}
              step={1}
              value={value as number}
              onChange={(e) => onChange(Number(e.target.value))}
            />
            <span className="prop-value">{value as number}°</span>
          </div>
        </div>
      )

    case 'number':
      return (
        <div className="prop-row">
          <label>{prop.label}</label>
          <div className="number-control">
            <input
              type="range"
              min={prop.min ?? 0}
              max={prop.max ?? 100}
              step={prop.step ?? 1}
              value={value as number}
              onChange={(e) => onChange(Number(e.target.value))}
            />
            <span className="prop-value">{Number(value as number).toFixed(prop.step && prop.step < 1 ? 2 : 0)}</span>
          </div>
        </div>
      )

    case 'boolean':
      return (
        <div className="prop-row">
          <label>{prop.label}</label>
          <button
            className={`toggle ${value ? 'on' : 'off'}`}
            onClick={() => onChange(!value)}
          >
            {value ? 'ON' : 'OFF'}
          </button>
        </div>
      )

    case 'select':
      return (
        <div className="prop-row">
          <label>{prop.label}</label>
          <select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          >
            {prop.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )

    default:
      return <div />
  }
}

function RgbControl({ value, onChange }: { value: number[]; onChange: (v: unknown) => void }): React.ReactElement {
  const [r, g, b] = value
  const hexPreview = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`

  return (
    <div className="rgb-control">
      <div className="rgb-swatch" style={{ background: hexPreview }} />
      {['R', 'G', 'B'].map((ch, i) => (
        <div key={ch} className="rgb-channel">
          <span>{ch}</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={value[i]}
            onChange={(e) => {
              const arr = [...value]
              arr[i] = Number(e.target.value)
              onChange(arr)
            }}
          />
        </div>
      ))}
    </div>
  )
}
