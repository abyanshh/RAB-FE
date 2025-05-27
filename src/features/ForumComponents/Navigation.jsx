import { ChevronRight } from "lucide-react"

export default function Navigation({ currentThread, onBackToThreads }) {
  return (
    <div className="flex items-center text-sm text-gray-600 mb-6">
      <button onClick={onBackToThreads} className="hover:text-gray-900 hover:underline">
        Forum
      </button>

      {currentThread && (
        <>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-gray-900 truncate max-w-xs">{currentThread.title}</span>
        </>
      )}
    </div>
  )
}
