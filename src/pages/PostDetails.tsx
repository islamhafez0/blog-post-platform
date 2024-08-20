import { Post } from "../types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { FaGreaterThan } from "react-icons/fa";
import { Spinner } from "../components/common/Spinner";
import {
  containsArabicCharacters,
  formatDateFromTimestamp,
} from "../utils/helpers";
import SocialIcons from "../components/common/SocialIcons";
import { usePosts } from "../hooks/usePosts";
import CommentSection from "../components/layout/CommentSection";

const PostDetails = () => {
  const href = location.href;
  const { id } = useParams();
  const { setLoadingPostDetails } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    setLoadingPostDetails(true);
    const docRef = doc(db, "posts", id!);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Omit<Post, "id">;
          setPost({ id: snapshot.id, ...data });
        }
        setLoadingPostDetails(false);
      },
      (error) => {
        console.log("Error getting document", error);
        setLoadingPostDetails(false);
      }
    );
    return () => unsubscribe();
  }, []);
  if (!post) {
    return (
      <div className="flex mt-16 justify-center">
        <Spinner classNames={["w-12", "h-12", "border-gray-900"]} />
      </div>
    );
  }
  return (
    <section className="max-w-5xl mx-auto px-4 md:px-8 py-8">
      <div className="flex items-center gap-2">
        <Link to="/" className="font-bold">
          Blog
        </Link>
        <FaGreaterThan size={12} />
        <span className="text-blue-600 text-sm font-mono bg-[#01ccf51a] px-2">
          {post.category}
        </span>
      </div>
      <h2
        className="text-4xl my-8 font-bold w-full"
        dir={containsArabicCharacters(post.title) ? "rtl" : "ltr"}
      >
        {post.title}
      </h2>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="bg-gray-900 text-white flex items-center justify-center text-xl font-medium w-9 h-9 rounded-full">
            {Array.from(post?.authorName!)[0]}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-bold">{post?.authorName}</span>
            <span className="text-sm font-mono">
              {formatDateFromTimestamp(post.createdAt)}
            </span>
          </div>
        </div>
        <SocialIcons postTitle={post?.title} postUrl={href} />
      </div>
      <img
        src={post?.imageURL}
        className="w-full rounded-3xl max-h-[540px]"
        alt="imageURL"
      />
      <div
        className="mt-8 pb-12 blog-body"
        dangerouslySetInnerHTML={{ __html: post.body }}
        dir={containsArabicCharacters(post.body) ? "rtl" : "ltr"}
      ></div>
      <CommentSection postId={post.id} />
      {/* <p className="mt-4">
        Vistors: <strong>{post?.views?.toString()}</strong>
      </p> */}
    </section>
  );
};

export default PostDetails;
