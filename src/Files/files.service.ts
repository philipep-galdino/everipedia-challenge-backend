import { Injectable } from '@nestjs/common'

import { Upload } from 'src/types/Upload'
import { fileUpload } from 'src/utils/fileUpload'

@Injectable()
export class FilesService {
  async uploadFile(file: Upload): Promise<string> {
    try {
      const fileUrl = await fileUpload(file)
      return fileUrl
    } catch (err) {
      console.error(`There was an error during file upload at FilesService`)
    }
  }

  testHello(): string {
    return 'hello, this works fine!'
  }
}
