import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";
import { Post } from "../../types";
import PostCard from "../common/PostCard";
import { Spinner } from "../common/Spinner";

const UserPosts = ({ userId }: { userId: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      where("authorId", "==", userId)
    );
    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return { id: doc.id, ...(doc.data() as Omit<Post, "id">) };
      });
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner classNames={["w-12", "h-12", "border-gray-900"]} />
      </div>
    );
  }

  return (
    <ul className="flex justify-center md:justify-unset flex-wrap gap-4">
      {(posts.length == 0 || !posts.length) && (
        <p className="text-center w-full text-gray-400">No posts yet</p>
      )}
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </ul>
  );
};

export default UserPosts;
