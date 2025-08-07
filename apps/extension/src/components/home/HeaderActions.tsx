import { Button } from '@/components/ui/button'
import { Brain, Globe, MoreVertical } from 'lucide-react'

interface HeaderActionsProps {
  onAIAssistantClick: () => void
  onConnectedAppsClick: () => void
  onMoreOptionsClick: () => void
}

const HeaderActions = ({
  onAIAssistantClick,
  onConnectedAppsClick,
  onMoreOptionsClick,
}: HeaderActionsProps) => {
  const actions = [
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: Brain,
      onClick: onAIAssistantClick,
    },
    {
      id: 'connected-apps',
      label: 'Connected dApps',
      icon: Globe,
      onClick: onConnectedAppsClick,
    },
    {
      id: 'more-options',
      label: 'More options',
      icon: MoreVertical,
      onClick: onMoreOptionsClick,
    },
  ]

  return (
    <div className='flex items-center space-x-1 ml-2'>
      {actions.map(({ id, label, icon: Icon, onClick }) => (
        <Button
          key={id}
          variant='ghost'
          size='icon'
          className=' bg-secondary/8 hover:bg-primary/16'
          aria-label={label}
          onClick={onClick}
        >
          <Icon className='!size-5' strokeWidth={3} />
        </Button>
      ))}
    </div>
  )
}

export default HeaderActions
