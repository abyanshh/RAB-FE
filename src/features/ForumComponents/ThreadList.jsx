import { MessageSquare, Users, Clock, PlusCircle } from "lucide-react"
import { formatTimeAgo } from "../../utils/time"
import { useNavigate } from "react-router-dom"
import { getAllThreads } from "../../services/forum"
import { useEffect, useState } from "react"
import { createThread, deleteThreadById } from "../../services/forum"
import CreateThreadModal from "./CreateThreadModal"
import Navigation from "./Navigation"
import Search from "../../components/SearchFilter"
import Button from "../../components/Button"
import { Link } from "react-router-dom"
import StatusModal from "../../components/StatusModal"

export default function ThreadList ({ token, role })  {
  const [ isCreateThreadModalOpen, setIsCreateThreadModalOpen ] = useState(false)
  const [ threads, setThreads ] = useState([])
  const [ currentThread, setCurrentThread ] = useState(null)
  const [ searchTerm, setSearchTerm ] = useState("")
  const [ statusModalOpen, setStatusModalOpen ] = useState(false);
  const navigate = useNavigate()

  const getThreads = async () => {
    const data = await getAllThreads()
    setThreads(data)
  }
  useEffect(() => {
    getThreads()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setStatusModalOpen(false), 2000);
    return () => clearTimeout(timer);
  }, [statusModalOpen])

  const handleDeleteThreads = async (thread, token) => {
    try {
      await deleteThreadById(thread.id, token);
      alert(`Thread "${thread.title}" berhasil dihapus!`);
      getThreads();
    } catch (error) {
      console.error("Gagal menghapus thread:", error);
      alert("Gagal menghapus thread");
    }
  } 

  const handleThreadClick = (thread) => {
    navigate(`/forum/${thread.id}`)
  }

  const handleBackToThreads = () => {
    navigate("/forum")
  }

  const handleCreateThread = async (thread) => {
    try {
      await createThread(thread, token);
      setIsCreateThreadModalOpen(false);
      setStatusModalOpen(true);
      getThreads();
    } catch (error) {
      console.error("Gagal membuat thread:", error);
      alert("Gagal membuat thread");
    }
  }

  const filteredThreads = threads.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <Navigation currentThread={currentThread} onBackToThreads={handleBackToThreads} />
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <Search value={searchTerm} onChange={setSearchTerm} placeholder={("Cari...")} />
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-1 border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-xl">Forum Diskusi</h2>
              <p className="text-gray-600 text-sm">Tempat berbagi dan berdiskusi tentang berbagai topik</p>
            </div>
            {!token ? (
              <Link to="/login">
                <button
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors flex items-center"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Thread Baru
                </button>
              </Link>
            ) : (
              <button
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors flex items-center"
                onClick={() => setIsCreateThreadModalOpen(true)}
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Thread Baru
              </button>
            )}
          </div>
        </div>

        {/* Threads */}
        {filteredThreads.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredThreads.map((thread) => (
              <div key={thread.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="flex-grow" onClick={() => handleThreadClick(thread)}>
                    <h3 className="font-bold text-lg mb-1">{thread.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{thread.content}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-4">Oleh: {thread.username}</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatTimeAgo(thread.created_at)}</span>
                    </div>
                  </div>

                  <div className="text-right text-sm ml-4">
                    <div className="flex items-center justify-end mb-1">
                      <MessageSquare className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{thread.replies} balasan</span>
                    </div>
                    <div className="flex items-center justify-end">
                      <Users className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{thread.views} dilihat</span>
                    </div>
                    {role === "admin" && (
                      <Button 
                        variant="red" 
                        className="mt-4 rounded-md"
                        onClick={() => handleDeleteThreads(thread, token)}
                      >
                        Hapus
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Belum ada thread</h3>
            <p className="text-gray-600 mt-2">Jadilah yang pertama membuat thread di forum ini</p>
            {!token ? (
              <Link to="/login">
                <button
                  className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors inline-flex items-center"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Thread Baru
                </button>
              </Link>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors inline-flex items-center"
                onClick={() => setIsCreateThreadModalOpen(true)}
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Thread Baru
              </button>
            )}
          </div>
        )}

        {/* Modals */}
        <CreateThreadModal
          isOpen={isCreateThreadModalOpen}
          onClose={() => setIsCreateThreadModalOpen(false)}
          onSubmit={handleCreateThread}
        />

        <StatusModal
          type="success"
          message="Thread berhasil dibuat"
          isOpen={statusModalOpen}
          onClose={(() => setStatusModalOpen(false))}
        />
      </div>
    </>
  )
}

