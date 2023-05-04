import React, { useState } from 'react'
import { View } from './pages/view'
import 'normalize.css'
import { FileUpload } from './components'
import { isJSON } from './utils/is'

export const AppPrinter = () => {
  const [view, change] = useState<JSX.Element>(
    <div>
      <FileUpload
        onUploaded={(value: string): any =>
          change(<View data={isJSON(value) ? JSON.parse(value) : []} />)
        }
      />
      <p style={{ color: '#465d7f' }}>
        Tips: Chrome浏览器中CTRL+P即可导出为PDF文件！
      </p>
    </div>
  )
  return <div>{view}</div>
}
