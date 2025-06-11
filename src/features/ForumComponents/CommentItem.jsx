import { useState } from "react";
import { Reply, Trash } from "lucide-react";
import { formatTimeAgo } from "../../utils/time";

export default function CommentItem({
  comment,
  allReplies,
  onReplyClick,
  onDelete,
  role,
}) {
  const [showReplies, setShowReplies] = useState(false);

  function isReplyToRoot(comment, allReplies) {
    const parent = allReplies.find((c) => c.comment_id === comment.parent_id);
    return parent && !parent.parent_id;
  }

  function getAllDescendants(parentId) {
    const result = [];
    const stack = allReplies.filter((c) => c.parent_id === parentId);
    while (stack.length > 0) {
      const current = stack.shift();
      result.push(current);
      stack.push(
        ...allReplies.filter((c) => c.parent_id === current.comment_id)
      );
    }
    return result;
  }

  const descendants = getAllDescendants(comment.comment_id);

  const parentComment = comment.parent_id
    ? allReplies.find((c) => c.comment_id === comment.parent_id)
    : null;

  return (
    <>
      <div
        className={`${
          comment.parent_id && isReplyToRoot(comment, allReplies)
            ? "ml-4"
            : "ml-0"
        } mt-4`}
      >
        <div className="text-sm mb-1 flex items-center">
          <img
            src={comment.avatar_url}
            alt={comment.username}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="font-medium mr-2">{comment.username}</span>
          <span className="text-gray-500 mx-2">•</span>
          <span className="text-gray-500">
            {formatTimeAgo(comment.created_at)}
          </span>
        </div>

        {parentComment && (
          <div className="mb-1 text-xs text-gray-500">
            Membalas{" "}
            <span className="text-cyan-500">@{parentComment.username}</span>
          </div>
        )}

        <p className="text-gray-700 mb-1">{comment.content}</p>

        <div className="flex items-center text-sm mb-2">
          <button
            className="text-gray-600 hover:text-cyan-600 flex items-center"
            onClick={() => onReplyClick(comment.comment_id)}
          >
            <Reply className="h-3 w-3 mr-1" /> Balas
          </button>
          {role === "admin" && (
            <button
              className="ml-4 text-gray-600 hover:text-red-600 flex items-center"
              onClick={() => onDelete(comment)}
            >
              <Trash className="h-3 w-3 mr-1" /> Hapus
            </button>
          )}
        </div>

        {descendants.length > 0 && !showReplies && (
          <button
            className="text-sm text-cyan-600 mb-2"
            onClick={() => setShowReplies(true)}
          >
            Buka Balasan ({descendants.length})
          </button>
        )}
      </div>

      {showReplies &&
        descendants.map((child) => (
          <div key={child.comment_id} className="mt-4 ml-8">
            <div className="text-sm mb-1 flex items-center">
              <img
                src={child.avatar_url}
                alt={child.username}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-medium mr-2">{child.username}</span>
              <span className="text-gray-500 mx-2">•</span>
              <span className="text-gray-500">
                {formatTimeAgo(child.created_at)}
              </span>
            </div>

            <div className="mb-1 text-xs text-gray-500">
              Membalas{" "}
              <span className="text-cyan-500">
                @
                {
                  allReplies.find((c) => c.comment_id === child.parent_id)
                    ?.username
                }
              </span>
            </div>

            <p className="text-gray-700 mb-1">{child.content}</p>

            <div className="flex items-center text-sm mb-2">
              <button
                className="text-gray-600 hover:text-cyan-600 flex items-center"
                onClick={() => onReplyClick(child.comment_id)}
              >
                <Reply className="h-3 w-3 mr-1" /> Balas
              </button>
              {role === "admin" && (
                <button
                  className="ml-4 text-gray-600 hover:text-red-600 flex items-center"
                  onClick={() => onDelete(child)}
                >
                  <Trash className="h-3 w-3 mr-1" /> Hapus
                </button>
              )}
            </div>
          </div>
        ))}

      {showReplies && descendants.length > 0 && (
        <div className="ml-8 mt-2">
          <button
            className="text-sm text-cyan-600"
            onClick={() => setShowReplies(false)}
          >
            Tutup Balasan
          </button>
        </div>
      )}
    </>
  );
}
