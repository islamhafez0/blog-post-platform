import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextTypes } from "../types";
import { auth } from "../utils/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
export const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [gettingCurrentUser, setGettingCurrentUser] = useState(true);
  const [isLoggingwithPopup, setIsLoggingWithPopup] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setGettingCurrentUser(false);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        console.log("No user!");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async ({
    email,
    password,
    displayName,
  }: {
    email: string;
    password: string;
    displayName: string;
  }) => {
    try {
      setIsLoading(true);
      const creds = await createUserWithEmailAndPassword(auth, email, password);
      if (creds.user) {
        await updateProfile(creds.user, { displayName });
      }
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithGoogle = async (): Promise<boolean> => {
    try {
      setIsLoggingWithPopup(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setIsLoggingWithPopup(false);
    }
  };

  const handleError = (error: any) => {
    if (error instanceof FirebaseError) {
      setFirebaseError(error.message);
      setErrorCode(error.code);
      setTimeout(() => {
        setFirebaseError("");
        setErrorCode("");
      }, 4000);
      console.log(error);
    }
  };

  const authValue = {
    login,
    signup,
    logout,
    signupWithGoogle,
    isLoading,
    gettingCurrentUser,
    firebaseError,
    errorCode,
    user,
    isLoggingwithPopup,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
