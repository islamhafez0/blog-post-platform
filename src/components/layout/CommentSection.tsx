import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import UserComment from "../common/UserComment";
import { Comment } from "../../types";
import { Spinner } from "../common/Spinner";
import { Link } from "react-router-dom";

const CommentSection = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentValue, setCommentValue] = useState("");
  const [replyValue, setReplayValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const isAuthenticated = !!user;

  useEffect(() => {
    const collectionRef = collection(db, "comments");
    const q = query(
      collectionRef,
      where("postId", "==", postId),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...(doc.data() as Omit<Comment, "id">),
        };
      });
      setComments(comments);
    });
    return () => unsubscribe();
  }, [postId]);

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  const handleReplyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReplayValue(e.target.value);
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentValue.trim()) return;
    try {
      setIsLoading(true);
      await addDoc(collection(db, "comments"), {
        postId,
        authorId: user?.uid,
        authorName: user?.displayName,
        authorAvatar: user?.photoURL ? user.photoURL : null,
        content: commentValue,
        timestamp: serverTimestamp(),
      });
      setCommentValue("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplySubmit = async (
    e: FormEvent<HTMLFormElement>,
    commentId: string
  ) => {
    e.preventDefault();
    const uniqueId = `replay-${Date.now()}`;
    const reply = {
      id: uniqueId,
      authorId: user?.uid,
      authorName: user?.displayName,
      authorAvatar: user?.photoURL ? user.photoURL : null,
      content: replyValue,
      timestamp: new Date(),
    };
    const documentRef = doc(db, "comments", commentId);
    try {
      await updateDoc(documentRef, {
        replies: arrayUnion(reply),
      });
      setReplayValue("");
    } catch (error) {
      console.log("Error adding reply", error);
    }
  };

  if (!comments) {
    return (
      <div className="grid place-items-center">
        <Spinner classNames={["w-6", "h-6", "border-gray-900"]} />
      </div>
    );
  }
  return (
    <div className="pt-12 border-t border-dashed border-gray-900">
      <h4 className="text-2xl mb-4 font-bold">{comments.length} Comments</h4>
      <>
        {isAuthenticated ? (
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-end gap-2 w-full justify-between md:justify-unset md:max-w-3xl mb-8"
          >
            <input
              type="text"
              name="comment"
              id="user_coment"
              value={commentValue}
              onChange={handleCommentChange}
              className="basis-2/3 bg-transparent p-3 border-b border-gray-400 focus-within:border-gray-600 outline-none _transition placeholder:text-gray-400 text-sm"
              placeholder="Leave a comment"
            />
            <button
              className="disabled:text-gray-400 bg-gray-300 text-black h-8 w-16 grid place-items-center rounded-md _transition"
              type="submit"
              disabled={!commentValue.trim() || isLoading}
            >
              {isLoading ? (
                <Spinner classNames={["w-4", "h-4", "border-gray-900"]} />
              ) : (
                "Add"
              )}
            </button>
          </form>
        ) : (
          <span>
            Please
            <Link to="/auth/login" className="mx-1 text-blue-600 font-medium">
              signin
            </Link>
            so you can add your own comment & reply to other comments
          </span>
        )}
        <ul className="mt-4 flex flex-col gap-4 justify-center">
          {comments.map((comment) => (
            <UserComment
              key={comment.id}
              comment={comment}
              handleReplyChange={handleReplyChange}
              handleReplySubmit={handleReplySubmit}
              replyValue={replyValue}
            />
          ))}
        </ul>
      </>
    </div>
  );
};

export default CommentSection;
