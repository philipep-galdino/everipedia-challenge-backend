import { createWriteStream } from 'fs'
import { v4 as uuidv4 } from 'uuid'

import { Upload } from 'src/types/Upload'

export const fileUpload = async (file: Upload) => {
  const { createReadStream, filename } = file

  console.log({ file })

  const fileId = await uuidv4()
  const fileName = `${fileId}-${filename}`

  console.log(`Processing file ${fileName}`)

  const uploadFile: Promise<boolean> = new Promise(async (resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(`src/uploads/${fileName}`))
      .on('finish', () => resolve(true))
      .on('error', (error) => {
        console.log(`There was an error uploading file ${filename}`)
        console.log(error)
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
