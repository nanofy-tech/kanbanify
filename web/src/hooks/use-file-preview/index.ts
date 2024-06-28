import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function useFilePreview(
  file: FileList | null,
): [string | null, Dispatch<SetStateAction<string | null>>] {
  const [fileSource, setFileSource] = useState<string | null>(null)

  useEffect(() => {
    if (file && file[0]) {
      const url = URL.createObjectURL(file[0])

      if (url !== fileSource) {
        setFileSource(URL.createObjectURL(file[0]))
      }
    }
  }, [file])

  return [fileSource, setFileSource] as const
}
