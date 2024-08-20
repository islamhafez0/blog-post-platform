import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="max-w-6xl mx-auto flex items-start justify-center pt-8 px-4 h-screen h-vh ">
      <Outlet />
    </section>
  );
};

export default AuthLayout;
