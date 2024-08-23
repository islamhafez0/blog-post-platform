import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { sideBarLinks } from "../../utils/constants";
import Logo from "../common/Logo";
import { Spinner } from "../common/Spinner";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ProfileSidebar = () => {
  const { logout, isLoading, user } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      setShowSidebar(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.log("Error logging out");
    }
  };
  if (!user) {
  }
  return (
    <>
      <button
        className="md:hidden m-4 bg-gray-900 text-white py-2 px-4 rounded-md"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        Show sidebar
      </button>
      <nav
        className={`${
          showSidebar ? "translate-x-0" : ""
        } w-64 absolute -translate-x-64 top-0 md:fixed md:left-0 md:translate-x-0 flex flex-col justify-between bg-white h-full overflow-hidden p-4 md:items-unset transition-transform z-20`}
      >
        <div>
          <Link to="/" className="flex items-center gap-1 pb-4 w-max">
            <Logo color={"#000"} />
            <span className="md:block">Code Space</span>
          </Link>
          <button
            onClick={() => setShowSidebar(false)}
            className="md:hidden absolute top-4 right-4 bg-gray-300 w-9 h-9 rounded-full text-xl grid place-items-center"
          >
            <IoMdClose />
          </button>
          <div className="mt-4 flex items-center gap-2">
            <span className="bg-gray-900 text-white flex items-center justify-center text-xl font-medium w-9 h-9 rounded-full">
              {Array.from(user?.displayName!)[0] || "Loading..."}
            </span>
            <div className="md:block">
              <h3 className="font-medium">{user?.displayName}</h3>
              <p className="text-[12px]">{user?.email}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            {sideBarLinks.map(({ href, image, label }) => (
              <Link
                key={href}
                to={href}
                className={`${
                  location.pathname === href ? "bg-gray-200" : ""
                } flex items-center gap-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-100 w-full p-3 rounded-md _transition`}
              >
                <img src={image} className="w-6" alt={label} />
                <span className="font-medium md:block">{label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center md:justify-start gap-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-100 w-full p-3 rounded-md`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  classNames={["h-6", "w-6", "border-gray-900", "self-cnter"]}
                />
                <span className="md:block">Logging out...</span>
              </>
            ) : (
              <>
                <img
                  src="/assets/icons/logout.svg"
                  className="w-6"
                  alt="logout"
                />
                <span className="md:block">Logout</span>
              </>
            )}
          </button>
          <p className="md:block text-center text-gray-500 mt-2 text-sm">
            &copy; Eslam Hafez
          </p>
        </div>
      </nav>
    </>
  );
};

export default ProfileSidebar;
