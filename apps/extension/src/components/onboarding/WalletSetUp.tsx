import Logo from '@/assets/logos/MetaFox.svg?react'
import { Button } from '@/components/ui/button'
import { useOnboarding } from '@/contexts/OnboardingContext'

const WalletSetup: React.FC = () => {
  const { goToCreateWallet, goToImportWallet } = useOnboarding()

  return (
    <div className='flex flex-col gap-y-4 justify-center items-center h-full'>
      <div className='flex flex-col gap-6 items-center justify-center flex-1'>
        <Logo className='size-50' />
        {/* <img src={Images.Logos.MetaFox} alt='MetaFox logo'  /> */}
        <p className='text-center text-lg'>The World most powerful AI wallet</p>
      </div>
      <div className='flex flex-col gap-y-4 w-full mt-auto'>
        <Button
          className='h-[3rem] px-6 py-2 w-full rounded-full text-lg'
          onClick={goToCreateWallet}
        >
          Create a new wallet
        </Button>

        <Button
          variant='secondary'
          className='h-[3rem] px-6 py-2 w-full rounded-full text-lg'
          onClick={goToImportWallet}
        >
          Import an existing wallet
        </Button>
      </div>
    </div>
  )
}

export default WalletSetup
