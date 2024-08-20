import { ReactNode } from "react";
import { AuthProvider } from "./AuthenticationContext";
import { PostsProvider } from "./PostsContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <PostsProvider>{children}</PostsProvider>
    </AuthProvider>
  );
};
