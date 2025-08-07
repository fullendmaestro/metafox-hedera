import SelectWallet from './SelectWallet'
import {
  WalletSelector,
  HeaderActions,
  AIAssistantDrawer,
  ConnectedAppsDrawer,
  MoreOptionsDrawer,
  AddressBookDrawer,
  ColorModeDrawer,
  CurrencyDrawer,
  NetworkDrawer,
} from '@/components/home'
import { useDrawerState } from '@/hooks/useDrawerState'

const Head = () => {
  const {
    showSelectWallet,
    showAIAssistant,
    showConnectedApps,
    showMoreOptions,
    showAddressBook,
    showColorMode,
    showCurrency,
    showNetwork,
    openSelectWallet,
    closeSelectWallet,
    openAIAssistant,
    closeAIAssistant,
    openConnectedApps,
    closeConnectedApps,
    openMoreOptions,
    closeMoreOptions,
    openAddressBook,
    closeAddressBook,
    openColorMode,
    closeColorMode,
    openCurrency,
    closeCurrency,
    openNetwork,
    closeNetwork,
  } = useDrawerState()

  return (
    <>
      <div className='flex justify-between items-center mb-4 relative gradient-cosmic px-4 py-2'>
        <WalletSelector onWalletSelect={openSelectWallet} />
        <HeaderActions
          onAIAssistantClick={openAIAssistant}
          onConnectedAppsClick={openConnectedApps}
          onMoreOptionsClick={openMoreOptions}
        />
      </div>

      <SelectWallet isVisible={showSelectWallet} onClose={closeSelectWallet} />

      {/* Main drawers */}
      <AIAssistantDrawer isOpen={showAIAssistant} onClose={closeAIAssistant} />
      <ConnectedAppsDrawer isOpen={showConnectedApps} onClose={closeConnectedApps} />
      <MoreOptionsDrawer
        isOpen={showMoreOptions}
        onClose={closeMoreOptions}
        onAddressBookOpen={openAddressBook}
        onColorModeOpen={openColorMode}
        onCurrencyOpen={openCurrency}
        onNetworkOpen={openNetwork}
      />

      {/* Settings drawers */}
      <AddressBookDrawer isOpen={showAddressBook} onClose={closeAddressBook} />
      <ColorModeDrawer isOpen={showColorMode} onClose={closeColorMode} />
      <CurrencyDrawer isOpen={showCurrency} onClose={closeCurrency} />
      <NetworkDrawer isOpen={showNetwork} onClose={closeNetwork} />
    </>
  )
}

export default Head
