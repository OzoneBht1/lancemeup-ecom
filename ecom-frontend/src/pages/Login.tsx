import React from "react";
import LoginForm from "../components/LoginForm";
import bcrypt from "bcryptjs";
import { secret } from "../components/secret-pass";
import { ILoginData, IUser, IUserJsonData } from "../types/types";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/usersSlice";
import { isValidCredentials } from "../api/api";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, secret);
  console.log(hashedPassword);
  return hashedPassword;
};

const Login = () => {
  const [error, setError] = React.useState<string | null>(null);
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const formSubmissionHandler = async (data: ILoginData) => {
    const { email, password } = data;
    const hashedPassword = await hashPassword(password);
    const user = await isValidCredentials<IUserJsonData>({
      email,
      hashedPassword,
    });
    console.log(user);

    // TODO: Dispatch action to store user data
    if (user) {
      dispatch(
        setUser({
          username: user.username,
          email: user.email,
          image: user.image,
          user_type: user.user_type,
        } as IUser)
      );
      // TODO: Use LocalStorage hook to store data
      nav("/");
    } else {
      setError("Invalid email or password");
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
