import { Button } from '@/components/ui/button'
import BottomModal from '@/components/ButtomDrawer'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useState } from 'react'

interface ColorModeDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const ColorModeDrawer = ({ isOpen, onClose }: ColorModeDrawerProps) => {
  const [selectedMode, setSelectedMode] = useState('system') // Could be from a theme context

  const colorModes = [
    {
      id: 'light',
      title: 'Light Mode',
      description: 'Use light theme',
      icon: Sun,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      id: 'dark',
      title: 'Dark Mode',
      description: 'Use dark theme',
      icon: Moon,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'system',
      title: 'System',
      description: 'Follow system preference',
      icon: Monitor,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
    },
  ]

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode)
    // TODO: Implement theme switching logic
    console.log('Theme changed to:', mode)
  }

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      title='Color Mode'
      footerComponent={
        <div className='flex gap-2 w-full'>
          <Button variant='outline' className='flex-1' onClick={onClose}>
            Cancel
          </Button>
          <Button className='flex-1' onClick={onClose}>
            Apply
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        <div className='space-y-3'>
          {colorModes.map(({ id, title, description, icon: Icon, bgColor, iconColor }) => (
            <div
              key={id}
              className={`p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer ${
                selectedMode === id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => handleModeSelect(id)}
            >
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className='flex-1'>
                  <h4 className='font-medium text-sm'>{title}</h4>
                  <p className='text-xs text-muted-foreground'>{description}</p>
                </div>
                {selectedMode === id && (
                  <div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center'>
                    <div className='w-2 h-2 bg-primary-foreground rounded-full' />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className='bg-muted/50 rounded-lg p-4'>
          <p className='text-xs text-muted-foreground text-center'>
            Theme changes will be applied immediately
          </p>
        </div>
      </div>
    </BottomModal>
  )
}

export default ColorModeDrawer
