import { useState } from 'react'
import { BalanceSection, ActionButtons, AssetsList, AddressDrawer } from '@/components/wallet'
import { hederaAssets } from '@/const/hederaAssets'

const Body = () => {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [showAddressDrawer, setShowAddressDrawer] = useState(false)

  return (
    <div className='flex-1 flex flex-col p-4 overflow-auto hide-scrollbar'>
      {/* Balance Section */}
      <div className='flex flex-col space-y-6 pb-6'>
        {/* Total Balance - Centered */}
        <BalanceSection
          onAddressClick={() => setShowAddressDrawer(true)}
          balanceVisible={balanceVisible}
          onBalanceToggle={() => setBalanceVisible(!balanceVisible)}
        />

        {/* Action Buttons */}
        <ActionButtons />
      </div>

      {/* Assets List */}
      <div className='flex-1 space-y-4'>
        <AssetsList assets={hederaAssets} balanceVisible={balanceVisible} />
      </div>

      {/* Address Details Drawer */}
      <AddressDrawer isOpen={showAddressDrawer} onClose={() => setShowAddressDrawer(false)} />
    </div>
  )
}

export default Body
