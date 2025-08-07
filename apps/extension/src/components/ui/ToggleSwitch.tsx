import { useState } from 'react'

interface ToggleSwitchProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  className?: string
}

const ToggleSwitch = ({ enabled, onChange, className = '' }: ToggleSwitchProps) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        enabled ? 'bg-primary' : 'bg-muted'
      } ${className}`}
      role='switch'
      aria-checked={enabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

export default ToggleSwitch
