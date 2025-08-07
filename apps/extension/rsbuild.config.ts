import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginWebExtension } from 'rsbuild-plugin-web-extension'
import { pluginSvgr } from '@rsbuild/plugin-svgr'

import manifest from './manifest'

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSvgr(),
    pluginWebExtension({
      manifest,
    }),
  ],
})
