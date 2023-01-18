import 'normalize.css'

import React, { useEffect, useRef } from 'react'

import { callService } from '@saber2pr/vscode-webview'

import { useAsync } from './hooks/useAsync'
import { View } from './pages/view'
import { APP_ARGS } from './utils/getArgs'
import { safeJSONParse } from './utils/json'
import { Editor, EditorAPI } from '@saber2pr/monaco'

import type { Services } from '../../src/api/type'
import { defaultData } from './api/defaults'

export const AppEditor = () => {
  const { data, loading, setData } = useAsync(
    async () => {
      const res = await callService<Services, 'readFile'>('readFile', {
        path: APP_ARGS.file,
      })
      return res || defaultData
    },
    [],
    {
      onError(error) {
        console.error(error)
      },
      manual: false,
    }
  )

  const apiRef = useRef<EditorAPI>()

  useEffect(() => {
    const handle = () => {
      const editor = apiRef.current
      if (editor) {
        editor.getInstance().layout()
      }
    }
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  if (loading) {
    return <span>正在加载...</span>
  }
  if (!data) {
    return <span>无数据</span>
  }

  return (
    <div className="content">
      <Editor
        className="editor"
        modalFiles={{
          'main.json': data || '',
        }}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        onInit={editor => {
          editor.getModel('main.json').onDidChangeContent(async () => {
            const value = editor.getValue()
            setData(value)
            await callService<Services, 'writeFile'>('writeFile', {
              path: APP_ARGS.file,
              content: value,
            })
          })
        }}
      />
      <div className="view">
        <div className="view-inner">
          <View data={safeJSONParse(data)} />
        </div>
      </div>
    </div>
  )
}
