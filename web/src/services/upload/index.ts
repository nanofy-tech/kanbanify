import axios from '@/libs/axios'

export const upload = {
  async post(formData: FormData) {
    const { data: fileURL } = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return fileURL
  },
}
