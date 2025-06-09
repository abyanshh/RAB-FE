import { useState } from "react";
import { Reply, Trash } from "lucide-react";
import { formatTimeAgo } from "../../utils/time";

export default function CommentItem({ comment, allReplies, onReplyClick, onDelete, role }) {
  const [showReplies, setShowReplies] = useState(false);
  const childReplies = allReplies.filter(c => c.parent_id === comment.comment_id);

  const parentComment = comment.parent_id
    ? allReplies.find(c => c.comment_id === comment.parent_id)
    : null;

  return (
    <div className="ml-4 mt-4 border-l-2 border-gray-300 px-4">
      <div className="text-sm mb-1 flex items-center">
        <img src={comment.avatar_url} alt={comment.username} className="w-8 h-8 rounded-full mr-2" />
        <span className="font-medium mr-2">{comment.username}</span>
        <span className="text-gray-500 mx-2">•</span>
        <span className="text-gray-500">{formatTimeAgo(comment.created_at)}</span>
      </div>

      {parentComment && (
        <div className="mb-1 text-xs text-gray-500">
          Membalas <span className="text-cyan-500">@{parentComment.username}</span>
        </div>
      )}

      <p className="text-gray-700 mb-1">{comment.content}</p>

      <div className="flex items-center text-sm mb-2">
        <button className="text-gray-600 hover:text-cyan-600 flex items-center" onClick={() => onReplyClick(comment.comment_id)}>
          <Reply className="h-3 w-3 mr-1" /> Balas
        </button>
        {role === "admin" && (
          <button className="ml-4 text-gray-600 hover:text-red-600 flex items-center" onClick={() => onDelete(comment)}>
            <Trash className="h-3 w-3 mr-1" /> Hapus
          </button>
        )}
      </div>

      {childReplies.length > 0 && (
        <button
          className="text-sm text-cyan-600 mb-2"
          onClick={() => setShowReplies(!showReplies)}
        >
          {showReplies ? "Tutup Balasan" : `Buka Balasan (${childReplies.length})`}
        </button>
      )}

      {showReplies &&
        childReplies.map(child => (
          <CommentItem
            key={child.comment_id}
            comment={child}
            allReplies={allReplies}
            onReplyClick={onReplyClick}
            onDelete={onDelete}
            role={role}
          />
        ))
      }
    </div>
  );
}
