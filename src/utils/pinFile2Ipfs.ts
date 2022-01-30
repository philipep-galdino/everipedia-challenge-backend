import { ReadStream } from 'fs'
import pinataSDK from '@pinata/sdk'

export const pinFile2Fps = async (fileToPin: ReadStream) => {
  const pinata = pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_API_KEY,
  )

  const pinnedFile = await pinata
    .pinFileToIPFS(fileToPin)
    .then((result) => {
      return result.IpfsHash
    })
    .catch((error) => {
      console.log(error)
    })

  return pinnedFile
}
