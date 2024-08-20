import { createContext, ReactNode, useEffect, useState } from "react";
import {
  query,
  collection,
  orderBy,
  limit,
  QueryDocumentSnapshot,
  getDocs,
  startAfter,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { Post, PostsContextTypes } from "../types";
export const PostsContext = createContext<PostsContextTypes | null>(null);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [loadingPostDetails, setLoadingPostDetails] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(
    null
  );
  const [hasMore, setHasMore] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);
  const postsLimit = 10;

  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const q = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      limit(postsLimit)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const posts = snapshot.docs.map((doc) => {
          return { id: doc.id, ...(doc.data() as Omit<Post, "id">) };
        });
        setBlogPosts(posts);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === postsLimit);
      }
      setLoadingDocs(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchMoreDocs = async () => {
    if (!hasMore) {
      console.log("No more get out of here!");
      return;
    }
    setIsPaginating(true);
    const collectionRef = collection(db, "posts");
    const q = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(postsLimit)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const newPosts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">),
        };
      });
      setBlogPosts((prev) => [...prev, ...newPosts]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === postsLimit);
    } else {
      setHasMore(false);
    }
    setIsPaginating(false);
  };

  return (
    <PostsContext.Provider
      value={{
        blogPosts,
        loadingDocs,
        hasMore,
        isPaginating,
        loadingPostDetails,
        fetchMoreDocs,
        setLoadingPostDetails,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
