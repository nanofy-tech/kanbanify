import { upload } from '@/services/upload'

export default function useUploadFile(): {
  uploadFile: (file: FileList) => Promise<string>
} {
  const uploadFile = async (file: FileList) => {
    const formData = new FormData()

    if (file.length > 0) {
      formData.append('media', file[0])

      return upload.post(formData)
    }
  }

  return { uploadFile }
}
