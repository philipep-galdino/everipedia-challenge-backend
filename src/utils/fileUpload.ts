import { createWriteStream } from 'fs'
import { v4 as uuidv4 } from 'uuid'

import { File } from 'src/types/File'

export const fileUpload = async (file: File) => {
  const { createReadStream, filename } = file

  const fileId = await uuidv4()
  const fileName = `${fileId}-${filename}`

  const uploadFile: Promise<boolean> = new Promise(async (resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(`src/uploads/${fileName}`))
      .on('finish', () => {
        resolve(true)
      })
      .on('error', (error) => {
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
