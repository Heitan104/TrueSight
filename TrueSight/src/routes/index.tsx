import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'



export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center bg-[#282c34]">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <h1 className="text-9xl font-bold mb-4 text-red-400">
          TRUE SIGHT
        </h1>
        <p>
          Welcome to TrueSight, a hackathon project for SpurHacks 2025!
        </p>

        <p>
          Click Below to get Started
        </p>

        <Button asChild className='p-4 bg-slate-300 hover:bg-white text-slate-800'>
          <Link to="/form" className="mt-4">
            Go to Demo
          </Link>
        </Button>

        <p className='mt-4 text-base'>
          Download the app on our github for the best experience!
        </p>
        
      </header>
    </div>
  )
}
