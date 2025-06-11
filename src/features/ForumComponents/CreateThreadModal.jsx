import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

export default function CreateThreadModal({
  isOpen,
  onClose,
  onSubmit,
  categoryName,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = () => {
    if (title && content) {
      onSubmit({ title, content });
      setTitle("");
      setContent("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          ref={modalRef}
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Buat Thread Baru
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Silakan isi judul dan konten thread yang ingin Anda buat.
                </p>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="thread-title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Judul Thread
                  </label>
                  <input
                    type="text"
                    id="thread-title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    placeholder="Masukkan judul thread"
                    value={title}
                    maxLength={75}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                  <label
                    htmlFor="thread-content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Konten
                  </label>
                  <div className="text-right text-xs text-gray-400">
                    {title.length} / 75
                  </div>
                  </div>
                  <textarea
                    id="thread-content"
                    rows={6}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    placeholder="Tulis konten thread Anda di sini..."
                    value={content}
                    maxLength={200}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="mt-2 text-right text-xs text-gray-400">
                    {content.length} / 200
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm ${
                !title || !content ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={!title || !content}
            >
              Buat Thread
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
