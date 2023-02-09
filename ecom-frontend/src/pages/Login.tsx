import React from "react";
import LoginForm from "../components/LoginForm";
import bcrypt from "bcryptjs";
import { secret } from "../components/secret-pass";
import { ILoginData, IUser } from "../types/types";
import userData from "../data/dummyUsers.json";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, secret);
  console.log(hashedPassword);
  return hashedPassword;
};

const Login = () => {
  const formSubmissionHandler = async (data: ILoginData) => {
    const { email, password } = data;
    const hashedPassword = await hashPassword(password);
    const user = userData.find(
      (user: IUser) => user.email === email && user.password === hashedPassword
    );
    if (user) {
      console.log("User found");
    } else {
      console.log("User doesnt exist");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <LoginForm onReceiveLoginData={formSubmissionHandler} />
    </div>
  );
};

export default Login;
