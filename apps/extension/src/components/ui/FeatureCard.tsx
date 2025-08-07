import type { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  bgColor: string
  iconColor: string
  onClick?: () => void
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  bgColor,
  iconColor,
  onClick,
}: FeatureCardProps) => {
  return (
    <div
      className='p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer'
      onClick={onClick}
    >
      <div className='flex items-center space-x-3'>
        <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <div>
          <h4 className='font-medium text-sm'>{title}</h4>
          <p className='text-xs text-muted-foreground'>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard
