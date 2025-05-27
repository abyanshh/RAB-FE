import { formatTimeAgo } from "../../utils/Time"
import { Clock, Reply, ThumbsUp } from "lucide-react"
import { useState, useEffect } from "react"
import { getAllComments, createComment, getThreadsbyId } from "../../services/forum"
import ReplyModal from "./ReplyModal"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Navigation from "./Navigation"

export default function ThreadDetail({ token }) {
  const [replies, setReplies] = useState([])
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [thread, setThread] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  const getThreads = async () => {
    const data = await getThreadsbyId(id)
    setThread(data)
  }

  useEffect(() => {
    if (id) getThreads()
  }, [id])

  const getReplies = async () => {
    const data = await getAllComments(id)
    setReplies(data)
  }

  useEffect(() => {
    getReplies()
  }, [])

  const handleSubmitComment = async (replies) => {
    try {
      await createComment({
        forumId: thread.id,
        content: replies.content,
        token: token,
      });
      alert("Komentar berhasil dikirim!");
      getReplies();
    } catch (err) {
      alert("Gagal mengirim komentar.");
      console.error(err);
    }
  };
  
  const handleBackToThreads = () => {
    navigate("/forum")
  }
  

  return (
    <>
       <Navigation currentThread={thread} onBackToThreads={handleBackToThreads} />
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-1 border-gray-200">
        {/* Thread Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-bold text-2xl mb-3">{thread.title}</h2>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="font-medium mr-2">Oleh: {thread.username}</span>
            <span className="text-gray-500 mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTimeAgo(thread.created_at)}</span>
          </div>

          <div className="text-gray-800 mb-6">
            <p className="whitespace-pre-line">{thread.content}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-cyan-600" onClick={() => setIsReplyModalOpen(true)}>
                <Reply className="h-5 w-5 mr-1" />
                <span>Balas</span>
              </button>
            </div>
            <button
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors"
              onClick={() => setIsReplyModalOpen(true)}
            >
              Balas Thread
            </button>
          </div>
        </div>

        {/* Replies Header */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-bold text-lg">Balasan ({replies?.length || 0})</h3>
        </div>

        {/* Replies */}
        {replies && replies.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {replies.map((reply) => (
              <div key={reply.id} className="p-6">
                <div className="flex">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{reply.username.charAt(0)}</span>
                  </div>
                  <div className="ml-4 flex-grow max-w-sm md:max-w-4xl">
                    <div className="flex items-center mb-2">
                      <span className="font-medium mr-2">{reply.username}</span>
                      <span className="text-gray-500 mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-sm text-gray-500">{formatTimeAgo(reply.created_at)}</span>
                    </div>

                    <div className="text-gray-800 mb-3">
                      <p className="whitespace-pre-line">{reply.content}</p>
                    </div>

                    <div className="flex items-center">
                      <button
                        className="flex items-center text-sm text-gray-600 hover:text-cyan-600"
                        onClick={() => setIsReplyModalOpen(true)}
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        <span>Balas</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Belum ada balasan. Jadilah yang pertama membalas!</p>
            <button
              className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors inline-flex items-center"
              onClick={() => setIsReplyModalOpen(true)}
            >
              <Reply className="h-5 w-5 mr-2" />
              Balas Thread
            </button>
          </div>
        )}

        {/* Reply Modal */}
        {isReplyModalOpen && (
          <ReplyModal
            isOpen={isReplyModalOpen}
            onClose={() => setIsReplyModalOpen(false)}
            onSubmit={handleSubmitComment}
            threadTitle={thread.title}
          />
        )}
      </div>
    </>
    
  )
}

