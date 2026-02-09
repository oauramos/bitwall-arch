import React from 'react'
import './ColorPicker.css'

interface ColorPickerProps {
  value: string
  onChange: (value: unknown) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps): React.ReactElement {
  return (
    <div className="color-picker">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="color-text"
        maxLength={7}
      />
    </div>
  )
}
