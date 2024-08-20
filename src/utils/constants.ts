import { SigninProps, SignupProps, UpdateProfileProps } from "../types";

export const signinInputs: SigninProps[] = [
  {
    type: "email",
    name: "email",
    id: "user_email",
    label: "Email"
  },
  {
    type: "password",
    name: "password",
    id: "user_password",
    label: "Password"
  },
]

export const signupIputs: SignupProps[] = [
  {
    type: "text",
    name: "displayName",
    id: "username",
    label: "Username"
  },
  {
    type: "email",
    name: "email",
    id: "user_email",
    label: "Email"
  },
  {
    type: "password",
    name: "password",
    id: "user_password",
    label: "Password"
  },
]

export const updateProfileInputs: UpdateProfileProps[] = [
  {
    type: "text",
    name: "displayName",
    id: "username",
    label: "Username"
  },
  {
    type: "email",
    name: "email",
    id: "user_email",
    label: "Email"
  },
  {
    type: "password",
    name: "password",
    id: "user_password",
    label: "Password"
  },
  {
    type: "text",
    name: "imageURL",
    id: "user_image",
    label: "Image URL"
  },
]

export const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export const sideBarLinks = [
  {
    label: "Your Posts",
    image: "/assets/icons/posts.svg",
    href: "/user/profile/user-posts"
  },
  {
    label: "Home",
    image: "/assets/icons/home.svg",
    href: "/",
  },
  {
    label: "Add Post",
    image: "/assets/icons/add-post.svg",
    href: "/blog/add-new-post",
  },
]