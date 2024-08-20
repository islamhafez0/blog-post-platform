import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/common/PostCard";
import { Spinner } from "../components/common/Spinner";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PostsLayout = () => {
  const { blogPosts: posts, loadingDocs, hasMore, fetchMoreDocs } = usePosts();
  const { user } = useAuth();
  const { inView, ref } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasMore) {
      fetchMoreDocs();
    }
  }, [inView, hasMore]);

  const isAuthenticated = !!user;
  return (
    <section>
      <div className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-60 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-medium text-gray-900">Code Space</h2>
          <p className="text-gray-500 mt-4 text-center">
            Our latest news, updates, and stories for developers
          </p>
          <Link
            to={`${isAuthenticated ? "/blog/add-new-post" : "/auth/login"}`}
            className="bg-blue-600 py-2 px-4 mt-4 text-white _transition hover:bg-blue-500 active:bg-blue-600 rounded-md"
          >
            Add your post
          </Link>
        </div>
      </div>
      <div className="py-16 max-w-7xl mx-auto px-4 md:px-8 ">
        {loadingDocs ? (
          <div className="flex mt-16 justify-center">
            <Spinner classNames={["w-12", "h-12", "border-gray-900"]} />
          </div>
        ) : (
          <ul className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 place-items-center lg:place-items-unset gap-4">
            {posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </ul>
        )}
        {hasMore && !loadingDocs ? (
          <div ref={ref} className="flex justify-center mt-12">
            <Spinner classNames={["w-7", "h-7", "border-gray-700"]} />
          </div>
        ) : (
          !loadingDocs && <p className="mt-12 text-center">No More Posts!</p>
        )}
      </div>
    </section>
  );
};

export default PostsLayout;
