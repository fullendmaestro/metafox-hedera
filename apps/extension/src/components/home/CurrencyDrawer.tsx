import { Button } from '@/components/ui/button'
import BottomModal from '@/components/ButtomDrawer'
import { DollarSign, Euro, PoundSterling, CircleDollarSign } from 'lucide-react'
import { useState } from 'react'

interface CurrencyDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const CurrencyDrawer = ({ isOpen, onClose }: CurrencyDrawerProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD') // Could be from a settings context

  const currencies = [
    {
      id: 'USD',
      title: 'US Dollar',
      symbol: '$',
      code: 'USD',
      icon: DollarSign,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 'EUR',
      title: 'Euro',
      symbol: '€',
      code: 'EUR',
      icon: Euro,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'GBP',
      title: 'British Pound',
      symbol: '£',
      code: 'GBP',
      icon: PoundSterling,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      id: 'JPY',
      title: 'Japanese Yen',
      symbol: '¥',
      code: 'JPY',
      icon: CircleDollarSign,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ]

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency)
    // TODO: Implement currency switching logic
    console.log('Currency changed to:', currency)
  }

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      title='Display Currency'
      footerComponent={
        <div className='flex gap-2 w-full'>
          <Button variant='outline' className='flex-1' onClick={onClose}>
            Cancel
          </Button>
          <Button className='flex-1' onClick={onClose}>
            Save Changes
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        <div className='space-y-3'>
          {currencies.map(({ id, title, symbol, code, icon: Icon, bgColor, iconColor }) => (
            <div
              key={id}
              className={`p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer ${
                selectedCurrency === id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => handleCurrencySelect(id)}
            >
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className='flex-1'>
                  <div className='flex items-center space-x-2'>
                    <h4 className='font-medium text-sm'>{title}</h4>
                    <span className='text-xs bg-muted px-2 py-1 rounded'>{code}</span>
                  </div>
                  <p className='text-xs text-muted-foreground'>Symbol: {symbol}</p>
                </div>
                {selectedCurrency === id && (
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
            Currency changes affect balance display only. Exchange rates are updated in real-time.
          </p>
        </div>
      </div>
    </BottomModal>
  )
}

export default CurrencyDrawer
