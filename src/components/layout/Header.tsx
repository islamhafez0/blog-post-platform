import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import Logo from "../common/Logo";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="py-4 px-4 md:px-8 bg-gray-900 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="font-normal text-2xl text-white flex items-center gap-2"
        >
          <Logo color="#fff" />
          <span className="text-base">Code Space</span>
        </Link>
        <nav className="flex items-center gap-6">
          {user ? (
            <Link to={user ? "/user/profile/user-posts" : "/auth/login"}>
              <FaRegUserCircle
                fontSize={26}
                className="text-gray-200"
                size={24}
              />
            </Link>
          ) : (
            <Link
              to="/auth/login"
              className="flex items-center justify-center md:justify-start gap-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-100 w-full py-1 px-4 rounded-md"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
