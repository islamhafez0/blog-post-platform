import { ChangeEvent, FormEvent, useState } from "react";
import { Comment, Reply } from "../../types";
import { formatCommentsTimestamp } from "../../utils/helpers";
import CommentReplies from "./CommentReplies";

const UserComment = ({
  comment,
  handleReplyChange,
  handleReplySubmit,
  replyValue,
}: {
  comment: Comment;
  handleReplyChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleReplySubmit: (
    e: FormEvent<HTMLFormElement>,
    commentId: string
  ) => Promise<void>;
  replyValue: string;
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const formattedDate =
    comment && comment.timestamp
      ? formatCommentsTimestamp(comment.timestamp)
      : "";
  const replies = comment.replies as Reply[];
  return (
    <li className="bg-gray-300 p-4 rounded-md">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <div>
            <span className="bg-gray-900 text-white flex items-center justify-center text-xl font-medium w-10 h-10 rounded-full">
              {Array.from(comment.authorName[0])}
            </span>
          </div>
          <div>
            <span className="font-bold text-sm md:text-xl">
              @{comment.authorName}
            </span>
            <span className="ml-1 md:ml-2 text-gray-500 text-sm">
              {formattedDate}
            </span>
            <p className="text-sm w-full max-w-xs md:max-w-xl text-gray-500 mt-1">
              {comment.content}
            </p>
          </div>
        </div>
      </div>
      <CommentReplies
        setShowReplyForm={setShowReplyForm}
        showReplyForm={showReplyForm}
        replies={replies}
        handleReplyChange={handleReplyChange}
        handleReplySubmit={handleReplySubmit}
        replyValue={replyValue}
        commnetId={comment.id}
      />
    </li>
  );
};

export default UserComment;
