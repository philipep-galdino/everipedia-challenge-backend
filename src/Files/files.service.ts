import { Injectable } from '@nestjs/common'

import { pinFile2Fps, fileUpload } from '../utils'

import { File } from '../types/File'

@Injectable()
export class FilesService {
  async uploadAndPinFile(file: File): Promise<void | string> {
    try {
      const uploadedFile = await fileUpload(file)
      const pinnedFile = await pinFile2Fps(uploadedFile)

      return pinnedFile
    } catch (err) {
      console.log(err)
    }
  }

  testHello(): string {
    return 'hello, this works fine!'
  }
}
