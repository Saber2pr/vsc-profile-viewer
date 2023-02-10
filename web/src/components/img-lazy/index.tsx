/*
 * @Author: saber2pr
 * @Date: 2019-06-12 10:35:34
 * @Last Modified by: saber2pr
 * @Last Modified time: 2023-01-18 11:19:15
 */
import { isInVscode } from '@saber2pr/vscode-webview'
import React, { useState, useRef } from 'react'
import { FileUpload } from '../file-upload'
import { readFileContentAsDataUrl } from '../file-upload/readFile'

const useDefault = (defaultImg: JSX.Element): [JSX.Element, VoidFunction] => {
  const [body, alter] = useState(defaultImg)

  const destory = () => alter(null)

  return [body, destory]
}

export interface ImgLazy
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  defaultClassName?: string
}

export const ImgLazy = ({
  defaultClassName,
  onLoad,
  alt,
  ...props
}: ImgLazy) => {
  const isUseHttpImg = /^https?:/.test(props.src)

  const [src, setSrc] = useState<string>('')

  const [defaultImg, destory] = useDefault(
    <div>
      <i className="iconfont icon-huabanfuben" />
      <div>
        <FileUpload
          accept=".jpg"
          onFileUploaded={async files => {
            const dataUrl = await readFileContentAsDataUrl(files[0])
            destory()
            setSrc(
              dataUrl.replace('data:application/octet-stream', 'data:image/png')
            )
          }}
        />
      </div>
    </div>
  )
  const ref = useRef<HTMLImageElement>()

  if (isUseHttpImg) {
    return <img {...props} />
  }

  return (
    <>
      <img {...props} src={src} />
      {defaultImg}
      {isInVscode ? (
        <></>
      ) : (
        <img
          ref={ref}
          {...props}
          onError={() => ref.current.remove()}
          onLoad={event => {
            destory()
            onLoad && onLoad(event)
          }}
        />
      )}
    </>
  )
}
