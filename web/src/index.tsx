import './index.less'

import React from 'react'
import ReactDOM from 'react-dom'
import { setLogLevel } from 'webpack-dev-server/client/utils/log'

import { callService, isInVscode } from '@saber2pr/vscode-webview'

import { AppEditor } from './app-editor'
import { AppPrinter } from './app-printer'
import type { Services } from '../../src/api/type'
import { i18n } from './i18n'
import { parseUrlParam } from './utils/parseUrlParam'

setLogLevel('none')

if (isInVscode) {
  callService<Services, 'getLang'>('getLang', null).then(lang => {
    i18n.setLocal(lang)
    ReactDOM.render(<AppEditor />, document.getElementById('root'))
  })
} else {
  const lang = parseUrlParam(window.location.search).lang
  i18n.setLocal(lang)
  ReactDOM.render(<AppPrinter />, document.getElementById('root'))
}
