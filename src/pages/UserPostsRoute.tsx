import UserPosts from "../components/layout/UserPosts";
import { useAuth } from "../hooks/useAuth";

const UserPostsRoute = () => {
  const { user } = useAuth();
  return (
    <aside className="ml-20 px-4 md:ml-64 md:px-8 flex flex-col gap-8 flex-1 py-16">
      <h2 className="text-xl md:text-2xl font-bold">
        {user?.displayName}'s Posts
      </h2>
      <UserPosts userId={user?.uid!} />
    </aside>
  );
};

export default UserPostsRoute;
