import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Reply } from "../../types";
import { formatCommentsTimestamp } from "../../utils/helpers";
import { IoIosArrowDown } from "react-icons/io";

const CommentReplies = ({
  showReplyForm,
  setShowReplyForm,
  replies,
  replyValue,
  handleReplyChange,
  handleReplySubmit,
  commnetId,
}: {
  showReplyForm: boolean;
  setShowReplyForm: React.Dispatch<SetStateAction<boolean>>;
  replies: Reply[];
  handleReplyChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleReplySubmit: (
    e: FormEvent<HTMLFormElement>,
    commentId: string
  ) => Promise<void>;
  replyValue: string;
  commnetId: string;
}) => {
  const { user } = useAuth();
  const isAuth = !!user;
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleReplySubmit(e, commnetId);
  };
  const [showReplies, setShowReplies] = useState(false);
  return (
    <div className="mt-2">
      {showReplyForm ? (
        <form className="ml-12 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <span className="bg-gray-900 text-white flex items-center justify-center text-sm font-medium w-6 h-6 rounded-full">
              {user?.displayName?.[0]}
            </span>
            <input
              type="text"
              placeholder="Add a reply"
              className="w-full max-w-md bg-transparent p-2 border-b border-gray-400 focus-within:border-gray-600 outline-none _transition placeholder:text-gray-400 text-sm"
              onChange={handleReplyChange}
              value={replyValue}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="disabled:bg-blue-400 bg-blue-600 text-white py-1 px-4 rounded-full"
              type="submit"
              disabled={!replyValue.trim()}
            >
              Reply
            </button>
            <button
              className="bg-gray-900 text-white py-1 px-4 rounded-full"
              type="button"
              onClick={() => setShowReplyForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : isAuth ? (
        <button
          type="button"
          className="ml-8 hover:bg-gray-400 font-bold py-1 px-4 rounded-full _transition"
          onClick={() => setShowReplyForm(true)}
        >
          Reply
        </button>
      ) : (
        ""
      )}
      <>
        <button
          onClick={() => setShowReplies((prev) => !prev)}
          className="ml-8 mt-6 mb-6 bg-blue-400 text-white h-8 w-28 rounded-full flex items-center justify-between px-2"
        >
          <IoIosArrowDown
            size={18}
            className={`${showReplies ? "rotate-180" : ""}`}
          />
          <span>
            {replies?.length} {replies?.length == 1 ? "Reply" : "Replies"}
          </span>
        </button>
        {showReplies && (
          <ul className="ml-8">
            {replies?.map((reply) => {
              return (
                <li key={reply.id} className="mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <div>
                        <span className="text-white bg-gray-400 flex items-center justify-center text-sm font-medium w-8 h-8 rounded-full">
                          {reply.authorName[0]}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-sm">
                          @{reply.authorName}
                        </span>
                        <span className="ml-1 md:ml-2 text-gray-500 text-sm">
                          {formatCommentsTimestamp(reply.timestamp)}
                        </span>
                        <p className="text-sm text-gray-500 mt-1 w-full max-w-xs md:max-w-xl">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </>
    </div>
  );
};

export default CommentReplies;
