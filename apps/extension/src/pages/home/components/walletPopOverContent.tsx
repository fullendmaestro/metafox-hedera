import { useWallet } from '@/store'
import WalletInfoCard from './walletInfoCard'

const WalletPopOverContent = () => {
  const wallets = useWallet().wallets

  return (
    <>
      <div className='pb-4 max-h-[50vh] tw-scrollbar overflow-y-auto'>
        <div className='flex space-y-4 flex-col py-2'>{<WalletInfoCard />}</div>
      </div>
    </>
  )
}

export default WalletPopOverContent
