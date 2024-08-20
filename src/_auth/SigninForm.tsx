import { ChangeEvent, FormEvent, useState } from "react";
import { signinInputs } from "../utils/constants";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../components/common/Spinner";
import { customizeFirebaseErrors } from "../utils/helpers";
const SigninForm = () => {
  const initialUserData = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialUserData);
  const { isLoading, login, firebaseError, errorCode } = useAuth();
  const [formErrors, setFormErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let valid = true;
    let updatedErrors = { ...formErrors };
    const { email, password } = userData;
    if (!email.trim()) {
      updatedErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      updatedErrors.email = "Invalid email";
      valid = false;
    }
    if (!password.trim()) {
      updatedErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      updatedErrors.password = "Password must be at least 6 characters";
      valid = false;
    } else if (password.trim().length < 6) {
      updatedErrors.password = "Password mustn't contain white spaces";
      valid = false;
    }
    setFormErrors(updatedErrors);
    return valid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        const user = await login(userData);
        if (user) {
          setUserData(initialUserData);
          navigate("/");
        } else {
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black w-96 max-w-full  p-4 flex flex-col items-start rounded-sm border drop-shadow-md"
    >
      <h2 className="text-2xl mb-5">Login now!</h2>
      {firebaseError && (
        <p className="p-2 bg-red-500 text-white w-full mb-5 rounded-md text-[13px]">
          {customizeFirebaseErrors(errorCode)}
        </p>
      )}
      {signinInputs.map(({ id, label, name, type }) => (
        <div
          key={id}
          className="flex flex-col w-full mb-8 relative text-gray-500 group"
        >
          <label
            className={`text-gray-300 absolute top-1/2 -translate-y-1/2 left-2 text-sm px-1 pointer-events-none group-focus-within:-top-0.5 group-focus-within:bg-white ${
              !formErrors[name] && "group-focus-within:text-gray-500"
            } transition-all duration-200 ease-in-out 
              ${
                userData[name].trim() !== ""
                  ? "!-top-0.5 bg-white text-gray-500"
                  : ""
              }
              ${formErrors[name] ? "text-red-500" : ""}
            `}
            htmlFor={id}
          >
            {label}
          </label>
          <input
            className={`bg-transparent border-gray-300 border px-2.5 py-1 rounded-sm outline-none ${
              !formErrors[name] && "focus-within:border-gray-500"
            }  transition-all duration-200 ease-in-out 
              ${userData[name].trim() !== "" ? "border-gray-500" : ""}
              ${formErrors[name] ? "border-red-500" : ""}
            `}
            onChange={handleChange}
            value={userData[name]}
            type={type}
            name={name}
            id={id}
          />
          {formErrors[name] && (
            <p className="absolute -bottom-5 text-red-500 text-sm">
              {formErrors[name]}
            </p>
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={isLoading}
        className="text-white bg-blue-600 h-8 w-24 flex items-center justify-center rounded-sm hover:bg-blue-500 active:bg-blue-600 transition-all duration-200 ease-in-out outline-none disabled:bg-blue-400"
      >
        {isLoading ? <Spinner classNames={["w-5 h-5"]} /> : "Login"}
      </button>
      <p className="flex items-center gap-1 w-full mt-8 flex-wrap">
        Don't have an Account
        <Link to="/auth/signup" className="underline text-blue-600">
          Signup
        </Link>
      </p>
    </form>
  );
};

export default SigninForm;
