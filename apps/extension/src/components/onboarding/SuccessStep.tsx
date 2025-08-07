import React from 'react'
import { CheckCircle, Sparkles, Wallet, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
interface SuccessStepProps {
  onComplete?: () => void
  walletAddress?: string
}

const SuccessStep: React.FC<SuccessStepProps> = ({ onComplete, walletAddress }) => {
  const mockAddress = '0x742d35Cc6648C4532b1E6e763B1FD0E2C0e7c6C8'
  const displayAddress = walletAddress || mockAddress

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const features = [
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'AI-powered fraud detection protects your assets',
    },
    {
      icon: Zap,
      title: 'Smart Gas Optimization',
      description: 'AI suggests optimal gas fees to save you money',
    },
    {
      icon: Sparkles,
      title: 'Intelligent Insights',
      description: 'Get AI explanations for all transactions',
    },
  ]

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='w-8'></div>
        <h2 className='text-base font-medium'>Create Wallet</h2>
        <Progress value={100} className='w-16'></Progress>
      </div>

      <div className='text-center space-y-6'>
        {/* Success Animation */}
        <div className='relative'>
          <div className='w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse'>
            <CheckCircle className='w-10 h-10 text-white' />
          </div>
          <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary to-chart-1 rounded-full flex items-center justify-center'>
            <Sparkles className='w-3 h-3 text-white' />
          </div>
        </div>

        <div className='space-y-3'>
          <h3 className='text-xl font-semibold text-foreground'>Wallet Created Successfully!</h3>
          <p className='text-muted-foreground'>
            Your MetaFox AI-powered wallet is ready to use. Welcome to the future of crypto!
          </p>
        </div>

        {/* Wallet Address */}
        <div className='bg-card border rounded-lg p-4 space-y-3'>
          <div className='flex items-center gap-2 justify-center'>
            <Wallet className='w-4 h-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Your Wallet Address</span>
          </div>
          <div className='bg-muted rounded p-2'>
            <code className='text-sm font-mono'>{formatAddress(displayAddress)}</code>
          </div>
          <p className='text-xs text-muted-foreground'>
            This is your public wallet address for receiving crypto
          </p>
        </div>

        {/* AI Features Highlight */}
        <div className='space-y-4'>
          <h4 className='text-lg font-semibold text-foreground'>AI Features Now Active</h4>
          <div className='space-y-3'>
            {features.map((feature, index) => (
              <div key={index} className='flex items-start gap-3 p-3 bg-card border rounded-lg'>
                <div className='w-8 h-8 bg-gradient-to-br from-primary to-chart-1 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <feature.icon className='w-4 h-4 text-white' />
                </div>
                <div className='text-left'>
                  <h5 className='text-sm font-medium text-foreground'>{feature.title}</h5>
                  <p className='text-xs text-muted-foreground'>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className='bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-3'>
          <h5 className='text-sm font-medium text-primary'>What's Next?</h5>
          <ul className='text-xs text-muted-foreground space-y-1 text-left'>
            <li>• Start by adding some crypto to your wallet</li>
            <li>• Explore AI-powered transaction insights</li>
            <li>• Connect to your favorite dApps securely</li>
            <li>• Let MetaFox AI optimize your crypto experience</li>
          </ul>
        </div>

        <div className='space-y-3'>
          <Button className='w-full h-11' size='lg' onClick={onComplete}>
            Start Using MetaFox
          </Button>
          <p className='text-xs text-muted-foreground'>
            Your AI-powered crypto journey begins now! 🚀
          </p>
        </div>
      </div>
    </div>
  )
}

export default SuccessStep
