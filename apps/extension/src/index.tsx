import './styles/globals.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { StoreProvider } from '@/components/StoreProvider'

import App from './App'

const root = createRoot(document.querySelector('#root')!)
if (root) {
  root.render(
    <React.StrictMode>
      <StoreProvider>
        <MemoryRouter initialEntries={['/']}>
          <ThemeProvider storageKey='app-theme'>
            <App />
          </ThemeProvider>
        </MemoryRouter>
      </StoreProvider>
    </React.StrictMode>,
  )
}
