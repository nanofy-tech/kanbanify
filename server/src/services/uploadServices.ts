import { randomUUID } from 'node:crypto'
import { extname } from 'node:path'

async function uploadImage(file) {
  if (!file) {
    throw new Error('Upload image not found')
  }

  const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
  const isValidImageFormat = mimeTypeRegex.test(file.mimetype)

  if (!isValidImageFormat) {
    throw new Error('Invalid image format')
  }

  const fileId = randomUUID()
  const extension = extname(file.name)
  const fileName = fileId.concat(extension)

  file.mv(`./src/uploads/${fileName}`)

  // ! Change this to the get the file URL automatically
  const fileURL = `${process.env.URL}/uploads/${fileName}`

  return fileURL
}

export default { uploadImage }
