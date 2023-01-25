import React, { useEffect } from 'react'
import { readFile, addUploadListener } from './readFile'

export interface FileUploadProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onUploaded?(value: string): any
  onFileUploaded?(value: FileList): any
  accept?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUploaded,
  onFileUploaded,
  accept = '.profile',
  ...props
}) => {
  const read = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    onFileUploaded && onFileUploaded(event.target.files)
    onUploaded &&
      readFile(event.target.files[0]).then(res => {
        onUploaded(res.toString())
      })
  }

  useEffect(() =>
    addUploadListener(({ content }) => onUploaded(String(content)))
  )

  return <input accept={accept} {...props} type="file" onChange={read} />
}
