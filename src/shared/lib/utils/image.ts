import imageCompression from 'browser-image-compression'

export async function compressImage(file: File) {
  const options = {
    maxWidthOrHeight: 1200, // 비율 유지하면서 resize
    maxSizeMB: 1, // 용량 제한 (MB 단위)
    useWebWorker: true,
  }

  try {
    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch (error) {
    console.error(error)
    throw error
  }
}
