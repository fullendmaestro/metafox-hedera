import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store'

interface StoreProviderProps {
  children: React.ReactNode
}

const LoadingComponent = () => <div>Loading...</div>

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        <>{children}</>
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider
