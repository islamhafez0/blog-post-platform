import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("Context must be used within provider!");
  }
  return context;
};
