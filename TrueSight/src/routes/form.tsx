import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { analyzeVideo } from '@/utils/api'

export const Route = createFileRoute('/form')({
  component: UploadPage,
})

function UploadPage() {

  
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationKey: ['analyzeVideo'],
    mutationFn: analyzeVideo,
    onSuccess: (data) => {
      navigate({
        to: '/responses',
        search: {
          result: data
        },
      })
    },
    onError: (error: any) => {
      console.error('Error status:', error)
    },
  })
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const video = formData.get('video') as File | null
    const url = formData.get('url') as string | null
    mutation.mutate({
      video: video ?? undefined,
      url: url ?? undefined,
    })
  }






  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='url' placeholder='Enter a video URL' />
      <input type='file' name='video' accept='video/*' />
      <button type='submit' disabled={mutation.isPending}>
        {mutation.isPending ? 'Analyzing...' : 'Analyze Video'}
        </button>
    </form>
  )
}
