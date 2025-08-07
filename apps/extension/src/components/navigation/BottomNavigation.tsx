import { Home, Image, ArrowUpDown, Compass, Clock } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    path: '/',
  },
  {
    id: 'nfts',
    label: 'NFTs',
    icon: Image,
    path: '/nfts',
  },
  {
    id: 'swap',
    label: 'Swap',
    icon: ArrowUpDown,
    path: '/swap',
  },
  {
    id: 'discover',
    label: 'Discover',
    icon: Compass,
    path: '/discover',
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: Clock,
    path: '/activity',
  },
]

const BottomNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <div className='gradient-cosmic border-t-2 border-primary w-full z-50 relative'>
      <div className='grid grid-cols-5 py-3 px-2'>
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 py-2 px-1 transition-colors',
                'hover:bg-accent/50 rounded-lg mx-1',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
              data-testid={`nav-${item.id}`}
              aria-label={item.label}
            >
              <Icon className={cn('h-5 w-5', isActive && 'fill-current')} />
              <span className='text-xs font-medium leading-none'>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation
