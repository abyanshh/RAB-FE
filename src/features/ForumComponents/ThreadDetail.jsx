import { formatTimeAgo } from "../../utils/time"
import { Clock, Reply, Trash } from "lucide-react"
import { useState, useEffect } from "react"
import { getAllComments, createComment, getThreadsbyId, deleteCommentById } from "../../services/forum"
import ReplyModal from "./ReplyModal"
import { useParams, useNavigate } from "react-router-dom"
import Navigation from "./Navigation"
import CommentItem from "./CommentItem"

export default function ThreadDetail({ token, role }) {
  const [replies, setReplies] = useState([])
  const [isReplyModalOpen, setIsReplyModalOpen] = useState({ open: false, parent_id: null });
  const [thread, setThread] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  const getThreads = async () => {
    const data = await getThreadsbyId(id)
    setThread(data)
  }

  const getReplies = async () => {
    const data = await getAllComments(id)
    setReplies(data)
  }

  useEffect(() => {
    if (id) getThreads()
  }, [id])

  useEffect(() => {
    getReplies()
  }, [])

  const handleSubmitComment = async (replies) => {
    try {
      await createComment({
        forumId: thread.id,
        content: replies.content,
        parentId: replies.parent_id || null,
        token: token,
      });
      getReplies();
      setIsReplyModalOpen({ open: false, parent_id: null });
    } catch (err) {
      alert("Gagal mengirim komentar.");
      console.error(err);
    }
  };

  const handleDeleteComment = async (reply) => {
    try {
      await deleteCommentById(thread.id, reply.comment_id, token);
      getReplies();
      alert(`Komentar "${reply.content}" berhasil dihapus!`);
    } catch (error) {
      console.error("Gagal menghapus komentar:", error);
      alert("Gagal menghapus komentar");
    }
  };

  const handleBackToThreads = () => {
    navigate("/forum")
  }

  const handleReplyClick = (parentId = null) => {
    if (!token) {
      navigate("/login");
    } else {
      setIsReplyModalOpen({ open: true, parent_id: parentId });
    }
  }

  const mainReplies = replies.filter(reply => reply.parent_id === null);

  return (
    <>
      <Navigation currentThread={thread} onBackToThreads={handleBackToThreads} />
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-1 border-gray-200">
        {/* Thread Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-bold text-2xl mb-3">{thread.title}</h2>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <img src={thread.avatar_url} alt={thread.username} className="w-8 h-8 rounded-full mr-2" />
            <span className="font-medium mr-2">{thread.username}</span>
            <span className="text-gray-500 mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTimeAgo(thread.created_at)}</span>
          </div>
          <div className="text-gray-800 mb-6">
            <p className="whitespace-pre-line">{thread.content}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-cyan-600" onClick={() => handleReplyClick(null)}>
                <Reply className="h-5 w-5 mr-1" />
                <span>Balas</span>
              </button>
            </div>
            <button
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors"
              onClick={() => handleReplyClick(null)}
            >
              Balas Thread
            </button>
          </div>
        </div>

        {/* Replies Header */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-bold text-lg">Balasan ({replies?.length || 0})</h3>
        </div>

        {/* Replies List */}
        <div className="divide-y divide-gray-200">
          {mainReplies.length > 0 ? (
            mainReplies.slice(0).reverse().map(reply => (
              <div key={reply.comment_id} className="p-6">
                <CommentItem
                  comment={reply}
                  allReplies={replies}
                  onReplyClick={handleReplyClick}
                  onDelete={handleDeleteComment}
                  role={role}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Belum ada balasan. Jadilah yang pertama membalas!</p>
              <button
                className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors inline-flex items-center"
                onClick={() => handleReplyClick(null)}
              >
                <Reply className="h-5 w-5 mr-2" />
                Balas Thread
              </button>
            </div>
          )}
        </div>

        {/* Reply Modal */}
        <ReplyModal
          isOpen={isReplyModalOpen.open}
          onClose={() => setIsReplyModalOpen({ open: false, parent_id: null })}
          onSubmit={(data) => handleSubmitComment({ ...data, parent_id: isReplyModalOpen.parent_id })}
          threadTitle={thread.title}
        />
      </div>
    </>
  )
}

