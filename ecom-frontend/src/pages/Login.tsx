import React from "react";
import LoginForm from "../components/LoginForm";
import bcrypt from "bcryptjs";
import { secret } from "../components/secret-pass";
import { ILoginData, IUser } from "../types/types";
import userData from "../data/dummyUsers.json";
import { useNavigate } from "react-router-dom";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, secret);
  console.log(hashedPassword);
  return hashedPassword;
};

const Login = () => {
  const nav = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const formSubmissionHandler = async (data: ILoginData) => {
    const { email, password } = data;
    const hashedPassword = await hashPassword(password);
    const user = userData.find(
      (user: IUser) => user.email === email && user.password === hashedPassword
    );
    // TODO: Dispatch action to store user data
    if (user) {
      nav("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  const resetError = () => {
    setError(null);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <LoginForm
        onReceiveLoginData={formSubmissionHandler}
        error={error}
        resetSubmissionError={resetError}
      />
    </div>
  );
};

export default Login;
