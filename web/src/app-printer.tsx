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
          {
            if(isJSON(value)) {
              const data = JSON.parse(value)
              if(data?.profile) {
                change(<View data={data} />)
              } else {
                alert('文件内容不完整，请编辑器修改文件后保存重新上传！')
              }
            } else {
              alert('文件内容格式错误')
            }
          }
        }
      />
      <p style={{ color: '#465d7f' }}>
        Tips: Chrome浏览器中CTRL+P即可导出为PDF文件！
      </p>
    </div>
  )
  return <div>{view}</div>
}
