import React from 'react'
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog'
import CreateWalletStep from './onboarding/CreateWalletStep'
import ImportWalletStep from './onboarding/ImportWalletStep'
import WalletSetup from './onboarding/WalletSetUp'
import ViewSeedPhraseStep from './onboarding/ViewSeedPhraseStep'
import ConfirmSeedPhraseStep from './onboarding/ConfirmSeedPhraseStep'
import CreatePasswordStep from './onboarding/CreatePasswordStep'
import SuccessStep from './onboarding/SuccessStep'
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext'

interface WalletOnboardingWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const WalletOnboardingContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { currentStep } = useOnboarding()

  const renderWizard = () => {
    switch (currentStep) {
      case 'welcome':
        return <WalletSetup />
      case 'create-wallet':
        return <CreateWalletStep />
      case 'view-seed-phrase':
        return <ViewSeedPhraseStep />
      case 'confirm-seed-phrase':
        return <ConfirmSeedPhraseStep />
      case 'create-password':
        return <CreatePasswordStep />
      case 'success':
        return <SuccessStep />
      case 'import-wallet':
        return <ImportWalletStep />
      default:
        return <WalletSetup />
    }
  }

  return <div className='py-4'>{renderWizard()}</div>
}

export const WalletOnboardingWizard: React.FC<WalletOnboardingWizardProps> = ({
  open,
  onOpenChange,
}) => {
  const handleClose = () => onOpenChange(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className='fixed inset-0 bg-black/50 backdrop-blur-sm' />
      <DialogContent className='max-w-md h-[90vh] gradient-cosmic overflow-auto hide-scrollbar'>
        <OnboardingProvider>
          <WalletOnboardingContent onClose={handleClose} />
        </OnboardingProvider>
      </DialogContent>
    </Dialog>
  )
}
