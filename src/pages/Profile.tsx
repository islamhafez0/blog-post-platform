import ProfileSidebar from "../components/layout/ProfileSidebar";
import { Outlet } from "react-router-dom";
const Profile = () => {
  return (
    <section>
      <ProfileSidebar />
      <Outlet />
    </section>
  );
};

export default Profile;
