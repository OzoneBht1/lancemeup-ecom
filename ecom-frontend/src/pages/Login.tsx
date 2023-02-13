import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import bcrypt from "bcryptjs";
import { secret } from "../components/secret-pass";
import { ILoginData, IUser, IUserJsonData } from "../types/types";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/slices/usersSlice";
import { isValidCredentials } from "../api/api";
import { useLocalStorage } from "../hooks/useLocalStorage";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, secret);
  console.log(hashedPassword);
  return hashedPassword;
};

const Login = () => {
  const [error, setError] = React.useState<string | null>(null);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user.user);
  const [state, setState] = useLocalStorage<IUser>("user", {} as IUser);

  useEffect(() => {
    if (Object.keys(state as IUser).length > 0 && userState) {
      nav("/");
    }
  }, [state]);

  const formSubmissionHandler = async (data: ILoginData) => {
    const { email, password } = data;
    const hashedPassword = await hashPassword(password);

    try {
      const user = await isValidCredentials<IUserJsonData>({
        email,
        hashedPassword,
      });

      if (user) {
        setState({
          username: user.username,
          email: user.email,
          image: user.image,
          user_type: user.user_type,
        } as IUser);

        dispatch(
          setUser({
            username: user.username,
            email: user.email,
            image: user.image,
            user_type: user.user_type,
          } as IUser)
        );
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      console.log(err, typeof err);
      if (err instanceof Error && err.message === "Invalid credentials") {
        setError(err.message);
      } else if (err instanceof TypeError) {
        setError("There was an error with the server. Please try again later.");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  const resetError = () => {
    setError(null);
  };

  return (
    <div className="flex items-center justify-center h-screen-minus-navbar bg-gray-200">
      <LoginForm
        onReceiveLoginData={formSubmissionHandler}
        error={error}
        resetSubmissionError={resetError}
      />
    </div>
  );
};

export default Login;
