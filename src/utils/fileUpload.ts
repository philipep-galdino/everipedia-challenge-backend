import { createWriteStream } from 'fs'

import { File } from 'src/types/File'

export const fileUpload = async (file: File) => {
  const { createReadStream, filename } = file

  const uploadFile: Promise<boolean> = new Promise(async (resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(`src/uploads/${filename}`))
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

  return `src/uploads/${filename}`
}
