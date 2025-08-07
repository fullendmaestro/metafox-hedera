import { Clock, ArrowUpRight, ArrowDownLeft, Repeat, Calendar } from 'lucide-react'
import { AppLayout } from '@/pages/Layout'
import { cn } from '@/lib/utils'

const mockTransactions = [
  {
    id: '1',
    type: 'send',
    amount: '5.00',
    token: 'HBAR',
    to: '0.0.123456',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'completed',
  },
  {
    id: '2',
    type: 'receive',
    amount: '10.50',
    token: 'HBAR',
    from: '0.0.789012',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'completed',
  },
  {
    id: '3',
    type: 'swap',
    amount: '100.00',
    token: 'USDC',
    swapTo: '150.25 HBAR',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'completed',
  },
]

const ActivityPage = () => {
  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      return `${days}d ago`
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight className='w-4 h-4' />
      case 'receive':
        return <ArrowDownLeft className='w-4 h-4' />
      case 'swap':
        return <Repeat className='w-4 h-4' />
      default:
        return <Clock className='w-4 h-4' />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'send':
        return 'text-red-600 bg-red-100'
      case 'receive':
        return 'text-green-600 bg-green-100'
      case 'swap':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <AppLayout>
      <div className='flex flex-col h-full p-4'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-foreground'>Activity</h1>
          <p className='text-sm text-muted-foreground'>Your transaction history</p>
        </div>

        {/* Activity Content */}
        <div className='flex-1'>
          {mockTransactions.length > 0 ? (
            <div className='space-y-3'>
              {mockTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className='flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer'
                >
                  <div className='flex items-center space-x-3'>
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        getTransactionColor(transaction.type),
                      )}
                    >
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className='flex items-center space-x-2'>
                        <span className='font-medium text-foreground capitalize'>
                          {transaction.type}
                        </span>
                        <span className='text-sm text-muted-foreground'>
                          {transaction.amount} {transaction.token}
                        </span>
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        {transaction.type === 'send' && `To: ${transaction.to}`}
                        {transaction.type === 'receive' && `From: ${transaction.from}`}
                        {transaction.type === 'swap' && `For: ${transaction.swapTo}`}
                      </div>
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='text-sm text-muted-foreground'>
                      {formatTime(transaction.timestamp)}
                    </div>
                    <div className='text-xs text-green-600 capitalize'>{transaction.status}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-12 space-y-4'>
              <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center'>
                <Clock className='w-8 h-8 text-muted-foreground' />
              </div>
              <div className='text-center space-y-2'>
                <h3 className='font-medium text-foreground'>No Activity Yet</h3>
                <p className='text-sm text-muted-foreground max-w-sm'>
                  Your transaction history will appear here once you start using your wallet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

export default ActivityPage
