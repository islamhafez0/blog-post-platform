import { Route, Routes, useLocation } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/SigninForm";
import SignupForm from "./_auth/SignupForm";
import HomePage from "./pages/HomePage";
import Header from "./components/layout/Header";
import { useAuth } from "./hooks/useAuth";
import Loader from "./components/common/Loader";
import AddPostForm from "./pages/AddPostForm";
import PostDetails from "./pages/PostDetails";
import ScrollToTop from "./components/common/ScrollToTop";
import Profile from "./pages/Profile";
import Footer from "./components/layout/Footer";
import { usePosts } from "./hooks/usePosts";
import PrivateRoute from "./components/common/PrivateRoute";
import UserPostsRoute from "./pages/UserPostsRoute";

const App = () => {
  const location = useLocation();
  const { gettingCurrentUser } = useAuth();
  const { loadingDocs, loadingPostDetails } = usePosts();
  if (gettingCurrentUser) {
    return <Loader />;
  }
  const shouldShowHeaderAndFooter =
    !location.pathname.includes("/auth") &&
    !location.pathname.includes("/user/profile");
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        <ScrollToTop />
        {shouldShowHeaderAndFooter && <Header />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/posts/:id" element={<PostDetails />} />
          <Route
            path="/blog/add-new-post"
            element={
              <PrivateRoute>
                <AddPostForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          >
            <Route
              path="/user/profile/user-posts"
              element={<UserPostsRoute />}
            />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/auth/signup" element={<SignupForm />} />
            <Route path="/auth/login" element={<SigninForm />} />
          </Route>
        </Routes>
      </div>
      {shouldShowHeaderAndFooter &&
        !gettingCurrentUser &&
        !loadingDocs &&
        !loadingPostDetails && <Footer />}
    </main>
  );
};

export default App;
