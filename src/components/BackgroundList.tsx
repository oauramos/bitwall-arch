import React from 'react'
import { BackgroundCard } from './BackgroundCard'
import type { BackgroundDefinition } from '../types/backgrounds'
import './BackgroundList.css'

interface BackgroundListProps {
  backgrounds: BackgroundDefinition[]
  selectedId: string
  onSelect: (id: string) => void
}

export function BackgroundList({ backgrounds, selectedId, onSelect }: BackgroundListProps): React.ReactElement {
  return (
    <div className="background-grid">
      {backgrounds.map((bg) => (
        <BackgroundCard
          key={bg.id}
          background={bg}
          selected={bg.id === selectedId}
          onClick={() => onSelect(bg.id)}
        />
      ))}
    </div>
  )
}
