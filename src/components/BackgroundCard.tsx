import React from 'react'
import type { BackgroundDefinition } from '../types/backgrounds'
import './BackgroundCard.css'

interface BackgroundCardProps {
  background: BackgroundDefinition
  selected: boolean
  onClick: () => void
}

export function BackgroundCard({ background, selected, onClick }: BackgroundCardProps): React.ReactElement {
  return (
    <button
      className={`background-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="card-thumbnail">
        <div className="card-tech-badge">{background.renderTech}</div>
      </div>
      <span className="card-name">{background.name}</span>
    </button>
  )
}
