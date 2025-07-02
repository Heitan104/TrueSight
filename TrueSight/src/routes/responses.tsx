import { createFileRoute, useRouterState } from '@tanstack/react-router'
import type { AnalyzeResponse } from '@/utils/api'

type SearchType = {
  result?: AnalyzeResponse
}

export const Route = createFileRoute('/responses')({
  component: RouteComponent,
})

function RouteComponent() {
  const { location } = useRouterState()
  const search = location.search as SearchType | undefined
  const result = search?.result

  if (!result)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#181a20] text-white">
        <div className="bg-[#23262f] p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">No result data found.</h2>
          <p>Please submit a video first.</p>
        </div>
      </div>
    )

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#181a20] text-white">
      <div className="bg-[#23262f] p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Analysis Result</h1>
        <div className="mb-4">
          <p>
            <span className="font-semibold text-[#f87171]">Percent Real:</span>{" "}
            <span className="text-lg">{result.percent_real}%</span>
          </p>
          <p>
            <span className="font-semibold text-[#f87171]">Probability:</span>{" "}
            <span className="text-lg">{result.probability}</span>
          </p>
        </div>
        <div>
          <strong className="block mb-2 text-[#f87171]">Reasoning:</strong>
          <ul className="list-disc list-inside space-y-1 pl-2">
            {result.reasoning.map((reason: string, idx: number) => (
              <li key={idx} className="text-gray-200">{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
