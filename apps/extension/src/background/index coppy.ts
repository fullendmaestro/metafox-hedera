// store.js (updated)
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist-webextension-storage' // or 'redux-persist/lib/storage' for localStorage

import rootReducer from './reducers'

const persistConfig = {
  key: 'appStore',
  storage, // Use webextension storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
