import './index.less'

import React from 'react'
import ReactDOM from 'react-dom'
import { setLogLevel } from 'webpack-dev-server/client/utils/log'

import { isInVscode } from '@saber2pr/vscode-webview'

import { AppEditor } from './app-editor'
import { AppPrinter } from './app-printer'

setLogLevel('none')

if (isInVscode) {
  ReactDOM.render(<AppEditor />, document.getElementById('root'))
} else {
  ReactDOM.render(<AppPrinter />, document.getElementById('root'))
}
