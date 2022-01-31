import { createWriteStream, WriteStream } from 'fs'
import { mocked } from 'jest-mock'

import { FilesService } from './files.service'

import { File } from '../types/File'

jest.mock('fs')

describe('FilesService', () => {
  afterAll(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  it('should upload and pin file', async () => {
    const mockReadStream = { pipe: jest.fn() }

    const mockFile: File = {
      filename: 'test',
      mimetype: 'image/jpeg',
      encoding: '7bit',
      createReadStream: jest.fn().mockReturnValueOnce(mockReadStream),
    }

    const mockWriteStream = {
      on: jest
        .fn()
        .mockImplementation(function (
          this: any,
          event: string,
          handler: () => void,
        ) {
          if (event === 'finish') handler()
          return this
        }),
    }

    const service = new FilesService()

    mocked(createWriteStream).mockReturnValueOnce(
      mockWriteStream as unknown as WriteStream,
    )

    const toTest = await service.uploadAndPinFile(mockFile)

    expect(mockFile.createReadStream).toBeCalledTimes(1)
    expect(mockReadStream.pipe).toBeCalledTimes(1)
    expect(createWriteStream).toBeCalledWith(
      expect.stringContaining('src/uploads/test'),
    )
    expect(mockWriteStream.on).toBeCalledWith('finish', expect.any(Function))
    expect(mockWriteStream.on).toBeCalledWith('error', expect.any(Function))
    expect(toTest).toBeTruthy()
  })
})
