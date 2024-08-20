import { User } from 'firebase/auth'
import { Dispatch, SetStateAction } from 'react';
export type AuthContextTypes = {
  login: ({email, password}: {email: string, password: string}) => Promise<boolean>;
  signup: ({displayName, email, password}: {displayName: string, email: string, password: string}) => Promise<boolean>;
  logout: () => Promise<boolean>;
  signupWithGoogle: () => Promise<boolean>
  isLoading: boolean;
  isLoggingwithPopup: boolean;
  firebaseError: string;
  gettingCurrentUser: boolean
  errorCode: string;
  user: User | null;
}

export type Post = {
  id: string;
  authoId: string;
  authorName: string;
  title: string;
  excerpt: string;
  body: string;
  tags: string[];
  createdAt: {
    nanoseconds: number;
    seconds: number;
  }
  category: string;
  imageURL: string;
  views: number;
}

export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  replies: Reply[];
};
export type Reply = {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    timestamp: {
      nanoseconds: number;
      seconds: number;
    }
}


export type PostsContextTypes = {
  blogPosts: Post[];
  loadingDocs: boolean;
  loadingPostDetails: boolean;
  isPaginating: boolean;
  hasMore: boolean;
  setLoadingPostDetails: Dispatch<SetStateAction<boolean>>
  fetchMoreDocs: () => void;
}
type SignupNames = 'displayName' | 'email' | 'password';

type SigninNames = 'email' | 'password';
type UpdateProfileNames = 'email' | 'password'| 'displayName' | 'imageURL';

export type SigninProps = {
  type: string;
  name: SigninNames;
  id: string;
  label: string;
};

export type SignupProps = {
  type: string;
  name: SignupNames;
  id: string;
  label: string;
};
export type UpdateProfileProps = {
  type: string;
  name: UpdateProfileNames;
  id: string;
  label: string;
};