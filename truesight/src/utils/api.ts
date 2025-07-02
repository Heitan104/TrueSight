import axios from 'axios'

export type AnalyzeResponse = {
  percent_real: number
  probability: string
  reasoning: Array<string>
}

export async function analyzeVideo(input: { video?: File; url?: string }): Promise<AnalyzeResponse> {
  const formData = new FormData()
  if (input.video instanceof File && input.video.size > 0) {
    formData.append('video', input.video)
  } else if (typeof input.url === 'string' && input.url.trim().length > 0) {
    formData.append('url', input.url)
  }
  console.log('Sending form data:', formData)

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/analyze`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      // Throw the backend error message so your UI can display it
      throw new Error(error.response.data?.error || 'Bad Request')
    }
    throw error
  }
}
