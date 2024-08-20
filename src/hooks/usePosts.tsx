import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw Error("Context must be used within provider!");
  }
  return context;
};
