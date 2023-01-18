import * as vscode from 'vscode'

import { VIEW_TYPE } from './constants'
import { CustomEditor } from './CustomEditor'

// install
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      VIEW_TYPE,
      new CustomEditor(context)
    )
  )
}

// uninstall
export function deactivate() {}
