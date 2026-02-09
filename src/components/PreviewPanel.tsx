import React, { useMemo } from 'react'
import type { BackgroundDefinition } from '../types/backgrounds'
import './PreviewPanel.css'

interface PreviewPanelProps {
  background: BackgroundDefinition
  props: Record<string, unknown>
}

export function PreviewPanel({ background, props }: PreviewPanelProps): React.ReactElement {
  const mergedProps = useMemo(() => {
    const merged: Record<string, unknown> = {}
    for (const prop of background.props) {
      merged[prop.key] = props[prop.key] ?? prop.default
    }
    return merged
  }, [background, props])

  const Component = background.component

  return (
    <div className="preview-container">
      <Component {...mergedProps} />
    </div>
  )
}
