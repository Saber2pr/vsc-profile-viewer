import fs from 'fs-extra'

import { createServiceHandler, HandleMap } from '@saber2pr/vscode-webview'

import { Services } from './type'
import { env } from 'vscode'

export const ServicesHandlers: HandleMap<Services, keyof Services> = {
  readFile: async ({ path }) => {
    const buf = await fs.readFile(path)
    return buf.toString()
  },
  writeFile: async ({ path, content }) => {
    await fs.writeFile(path, content)
  },
  getLang: () => env.language
}

const handleServiceMessage = createServiceHandler<Services>(ServicesHandlers)

export { handleServiceMessage }
