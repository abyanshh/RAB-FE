import { useState, useEffect } from "react";
import { getThreadsbyUserId } from "../../services/forum";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../../services/auth";
import { Clock, PlusCircle } from "lucide-react";
import { formatTimeAgo } from "../../utils/time";
import Button from "../../components/Button";

const ThreadSaya = () => {
    const [threads, setThreads] = useState([]);
    useEffect(() => {
        init();
      }, []);
      const init = async () => {
        const accessToken = await refreshToken();
        const decoded = jwtDecode(accessToken);
        await getThreads(decoded.id);
      };
      const getThreads = async (Id) => {
        try {
          const data = await getThreadsbyUserId(Id);
          setThreads(data);
        } catch (error) {
          console.error("Gagal mengambil data user:", error);
        }
      };
  
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="max-w-6xl">
        <h2 className="text-2xl font-semibold text-cyan-800 mb-4">Thread Saya</h2>
        {threads.length === 0 ? (
          <div className="space-y-2">
            <p className=" text-gray-600 font-semibold">
              Belum ada Thread yang kamu buat
            </p>
            <Button
              to="/forum"
              as="link"
              variant={"blue"}
              className="flex rounded-md items-center gap-2 max-w-fit bg-white"
            >
              <PlusCircle size={16} />
              Buat Thread
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {threads.map((thread) => (
              <div key={thread.id} className="border border-cyan-700 bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-cyan-700">{thread.title}</h3>
                <p className="flex items-center text-sm text-gray-500 mb-2"><Clock className="mr-1 w-4 h-4" />{formatTimeAgo(thread.created_at)}</p>
                <p className="text-gray-600 max-w-6xl break-words">{thread.content}</p>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    );
  };
  
  export default ThreadSaya;
  