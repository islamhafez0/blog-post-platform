const PostCardSkeleton = () => {
  return (
    <li className="relative p-4 md:p-6 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-md">
      <div className="w-full h-[253px] bg-gray-700 rounded-lg mb-4 animate-pulse"></div>
      <div className="h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-700 rounded mb-2 w-1/3 animate-pulse"></div>
      <div className="flex gap-2 mb-4 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-20 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-20 animate-pulse"></div>
      </div>
      <div className="h-8 w-36 bg-gray-700 rounded  mt-8 animate-pulse"></div>
    </li>
  );
};

export default PostCardSkeleton;
