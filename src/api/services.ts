import fs from 'fs-extra'

import { createServiceHandler, HandleMap } from '@saber2pr/vscode-webview'

import { Services } from './type'

export const ServicesHandlers: HandleMap<Services, keyof Services> = {
  readFile: async ({ path }) => {
    const buf = await fs.readFile(path)
    return buf.toString()
  },
  writeFile: async ({ path, content }) => {
    await fs.writeFile(path, content)
  },
}

const handleServiceMessage = createServiceHandler<Services>(ServicesHandlers)

export { handleServiceMessage }
