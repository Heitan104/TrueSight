import { createFileRoute, useRouterState } from '@tanstack/react-router'
import type { AnalyzeResponse } from '@/utils/api'

type SearchType = {
  result?: AnalyzeResponse
}

export const Route = createFileRoute('/responses')({
  component: RouteComponent,
})

function RouteComponent() {
  // Access the router search to get the result passed from the form
  const { location } = useRouterState()
  const search = location.search as SearchType | undefined
  const result = search?.result

  if (!result) return <div>No result data found. Please submit a video first.</div>

  return (
    <div>
      <h1>Analysis Result</h1>
      <p><strong>Percent Real:</strong> {result.percent_real}%</p>
      <p><strong>Probability:</strong> {result.probability}</p>
      <div>
        <strong>Reasoning:</strong>
        <ul>
          {result.reasoning.map((reason: string, idx: number) => (
            <li key={idx}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
