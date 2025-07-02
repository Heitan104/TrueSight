import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { TuploadVideoSchema } from '@/lib/types'
import { analyzeVideo } from '@/utils/api'
import { VideoForm } from '@/components/videoForm'

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
  
  const handleVideoFormSubmit = (data: TuploadVideoSchema) => {
    mutation.mutate(data)
  }






  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#181a20] text-white p-4">
        <div className="mt-8 flex justify-center items-center">
          <div className="bg-gray-100 text-black rounded-lg shadow-lg p-8 w-full max-w-md">
            <VideoForm onSubmit={handleVideoFormSubmit} />
          </div>
        </div>
      </div>
    </>
  )
}
