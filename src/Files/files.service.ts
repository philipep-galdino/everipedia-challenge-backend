import { createReadStream } from 'fs'
import { Injectable } from '@nestjs/common'

import { pinFile2Fps, fileUpload } from 'src/utils'

import { File } from 'src/types/File'

@Injectable()
export class FilesService {
  async uploadAndPinFile(file: File): Promise<void | string> {
    try {
      const uploadedFile = await fileUpload(file)
      const fileToPin = createReadStream(`src/uploads/${uploadedFile}`)

      const pinnedFile = await pinFile2Fps(fileToPin)

      return pinnedFile
    } catch (err) {
      console.log(err)
    }
  }

  testHello(): string {
    return 'hello, this works fine!'
  }
}
