import type { Pair } from '@saber2pr/vscode-webview'

// service type define
export type Services = {
  readFile: Pair<
    {
      path: string
    },
    string
  >
  writeFile: Pair<
    {
      path: string
      content: string
    },
    void
  >
}
