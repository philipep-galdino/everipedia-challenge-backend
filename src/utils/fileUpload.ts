import { FileUpload } from 'graphql-upload'
import { createWriteStream } from 'fs'
import { v4 as uuidv4 } from 'uuid'

export const fileUpload = async (file: FileUpload) => {
  const { createReadStream, filename } = file

  const fileId = await uuidv4()
  const fileName = `${fileId}-${filename}`

  const uploadFile: Promise<boolean> = new Promise(async (resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(`../../uploads/${fileName}`))
      .on('finish', () => resolve(true))
      .on('error', () => {
        console.log(`There was an error uploading file ${filename}`)
        reject(false)
      }),
  )

  if (!uploadFile) {
    console.log(
      'Something wrong happened in fileUpload function during upload...',
    )
  }

  return `/${fileName}`
}
