import 'normalize.css'

import React, { useEffect, useMemo, useRef } from 'react'

import { callService } from '@saber2pr/vscode-webview'

import { useAsync } from './hooks/useAsync'
import { View } from './pages/view'
import { APP_ARGS } from './utils/getArgs'
import { safeJSONParse } from './utils/json'
import { Editor, EditorAPI } from '@saber2pr/monaco'

import type { Services } from '../../src/api/type'
import { defaultData } from './api/defaults'
import { DragSize } from './components/drag-size'
import { isJSON } from './utils/is'

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
    self.addEventListener('resize', handle)
    return () => self.removeEventListener('resize', handle)
  }, [])

  const clientWidth = useMemo(
    () => self.document.documentElement.clientWidth,
    []
  )

  const wrapRef = useRef<HTMLDivElement>()
  const previewRef = useRef<HTMLDivElement>()

  const onDragStart = () => {}
  const onDragEnd = () => {}
  const onDragSize = (pos: number, type: 'vertical' | 'horizontal') => {
    if (pos < 24) return

    const iframe = previewRef.current
    const wrap = wrapRef.current
    const api = apiRef.current
    if (iframe && wrap && api) {
      if (type === 'vertical') {
        if (pos > clientWidth - 24) return
        iframe.style.width = `calc(100vw - ${pos}px)`
        wrap.style.width = `${pos}px`
      }
      api.getInstance().layout()
    }
  }

  if (loading) {
    return <span>正在加载...</span>
  }
  if (!data) {
    return <span>无数据</span>
  }

  return (
    <div className="content">
      <div className="editor" ref={wrapRef}>
        <Editor
          style={{ height: '100%' }}
          modalFiles={{
            'main.json': data || '',
          }}
          options={{
            minimap: {
              enabled: false,
            },
          }}
          onInit={editor => {
            apiRef.current = editor
            editor.getModel('main.json').onDidChangeContent(async () => {
              const value = editor.getValue()
              if (isJSON(value)) {
                setData(value)
                await callService<Services, 'writeFile'>('writeFile', {
                  path: APP_ARGS.file,
                  content: value,
                })
              }
            })
          }}
        />
      </div>
      <div className="view" ref={previewRef}>
        <DragSize
          type="vertical"
          onMove={onDragSize}
          onEnd={onDragEnd}
          onStart={onDragStart}
        />
        <div className="view-inner">
          <View data={safeJSONParse(data)} />
        </div>
      </div>
    </div>
  )
}
