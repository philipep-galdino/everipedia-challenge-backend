import { createReadStream } from 'fs'
import { Injectable } from '@nestjs/common'
import pinataSDK from '@pinata/sdk'

import { fileUpload } from 'src/utils/fileUpload'

import { Upload } from 'src/types/Upload'

@Injectable()
export class FilesService {
  async pinFile(file: Upload): Promise<void | string> {
    try {
      const uploadedFile = await fileUpload(file)
      const fileToPin = createReadStream(`src/uploads/${uploadedFile}`)

      const pinata = pinataSDK(
        process.env.PINATA_API_KEY,
        process.env.PINATA_SECRET_API_KEY,
      )

      console.log(`Pinning ${file.filename}`)

      const pinnedFile = await pinata
        .pinFileToIPFS(fileToPin)
        .then((result) => {
          return result.IpfsHash
        })
        .catch((error) => {
          console.log('DEU ERRO')
          console.log(error)
        })

      return pinnedFile
    } catch (err) {
      console.log(err)
      console.error(`There was an error during file upload at FilesService`)
    }
  }

  testHello(): string {
    return 'hello, this works fine!'
  }
}
