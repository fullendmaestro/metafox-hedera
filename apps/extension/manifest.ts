import fs from 'fs'
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: 'Hedera MetaFox',
  version: packageJson.version,
  description: packageJson.description || '',
  action: {
    default_icon: {
      '128': '/icons/icon128.png',
    },
    default_popup: './src/index.html',
  },
  options_page: './src/index.html',
  background: {
    service_worker: './src/background/index.ts',
    type: 'module',
  },
  icons: {
    '16': '/icons/icon16.png',
    '32': '/icons/icon32.png',
    '48': '/icons/icon48.png',
    '128': '/icons/icon128.png',
  },
  commands: {
    _execute_action: {
      suggested_key: {
        default: 'Alt+M',
      },
    },
  },
  permissions: ['storage', 'sidePanel'],
}

export default manifest
