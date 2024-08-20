import { Link } from "react-router-dom";
import { Post } from "../../types";
import {
  containsArabicCharacters,
  formatDateFromTimestamp,
  handleShowingTags,
} from "../../utils/helpers";
import { usePosts } from "../../hooks/usePosts";
import PostCardSkeleton from "./PostCardSkeleton";
const PostCard = ({ post }: { post: Post }) => {
  const { loadingDocs } = usePosts();

  if (loadingDocs) {
    return <PostCardSkeleton key={post?.id} />;
  }

  return (
    <li className="relative p-4 md:p-6 w-full max-w-[550px] rounded-lg shadow-md bg-gray-800 border-gray-700 hover:bg-gray-700 _transition group">
      <div className="w-full h-auto flex items-center object-scale-down">
        <img
          className="rounded-lg h-full max-h-[255px] lg:aspect-square w-full self-center brightness-75 group-hover:brightness-100 _transition"
          src={post.imageURL}
          alt={post.title}
        />
      </div>
      <h2
        dir={containsArabicCharacters(post.title) ? "rtl" : "ltr"}
        className="my-2 text-2xl font-bold tracking-tight text-white truncate"
      >
        {post.title}
      </h2>
      <p
        dir={containsArabicCharacters(post.excerpt) ? "rtl" : "ltr"}
        className="mb-4 text-sm font-medium dark:text-gray-300 max-h-6 overflow-hidden"
      >
        {post.excerpt}
      </p>
      <div className="mb-4 text-gray-600 dark:text-gray-400">
        <span className="font-medium text-sm">{post.authorName}</span> |{" "}
        <span className="text-sm font-mono">
          {formatDateFromTimestamp(post.createdAt)}
        </span>
      </div>
      <div className="mb-4 flex flex-wrap gap-1">
        {typeof post.tags === "string"
          ? handleShowingTags(post.tags).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-900 text-blue-300 hover:bg-blue-600 hover:text-white _transition"
                dir={containsArabicCharacters(tag) ? "rtl" : "ltr"}
              >
                {tag}
              </span>
            ))
          : post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-900 text-blue-300 hover:bg-blue-600 hover:text-white _transition"
              >
                {tag}
              </span>
            ))}
      </div>
      <Link
        to={`/blog/posts/${post.id}`}
        className="inline-flex items-center justify-center px-4 py-2 mt-8 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Read More
        <svg
          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 8h14m0 0l-4 4m4-4l-4-4"
          ></path>
        </svg>
      </Link>
    </li>
  );
};

export default PostCard;
