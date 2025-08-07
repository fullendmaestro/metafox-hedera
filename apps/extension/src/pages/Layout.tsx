import type { PropsWithChildren, ReactNode } from 'react'
import BottomNavigation from '@/components/navigation/BottomNavigation'

type GlobalLayoutProps = {
  children?: ReactNode
  location?: Location
  showBottomNav?: boolean
}

export const AppLayout = (props: PropsWithChildren<GlobalLayoutProps>) => {
  const { showBottomNav = true } = props

  return (
    <div className='relative min-h-[600px] min-w-[400px] h-screen w-screen flex items-center justify-center'>
      {/* Blurry backdrop */}
      <div className='absolute inset-0 bg-black/50 backdrop-blur-3xl'></div>

      <div className='gradient-cosmic p-0 h-[600px] max-h-[600px] w-[400px] max-w-[400px] relative flex flex-col overflow-hidden z-10'>
        <div id='drawer-boundry' className='h-full flex flex-col'>
          <div className='flex-1 overflow-hidden min-h-0'>{props.children}</div>
          {showBottomNav && (
            <div className='flex-shrink-0'>
              <BottomNavigation />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
