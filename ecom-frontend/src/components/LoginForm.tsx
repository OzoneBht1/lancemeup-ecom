import React from "react";
import loginAvatar from "./loginAvatar.png";
import { ILoginData } from "../types/types";

interface ILoginForm {
  onReceiveLoginData: ({ email, password }: ILoginData) => void;
}

const LoginForm = ({ onReceiveLoginData }: ILoginForm) => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const [formValidity, setFormValidity] = React.useState({
    email: true,
    password: true,
  });

  const setFormToValid = () => {
    console.log("CALLING");
    setFormValidity({
      email: true,
      password: true,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const emailIsValid = !!email && email!.includes("@");
    const passwordIsValid = !!password && password!.trim().length > 6;
    console.log(passwordIsValid);

    if (!emailIsValid || !passwordIsValid) {
      setFormValidity({
        email: emailIsValid,
        password: passwordIsValid,
      });
      return;
    } else {
      onReceiveLoginData({
        email,
        password,
      });
    }
  };

  const labelClassName = "text-gray-700";
  const emailInputClassName =
    "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none  invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500";

  const passwordInputClassName =
    "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none  invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500";

  return (
    <form onSubmit={submitHandler}>
      <div className="bg-white w-96 p-6 shadow-md ">
        <div className="flex flex-col  items-center justify-center mb-4">
          <h1 className="font-bold text-2xl">Login</h1>
          <img src={loginAvatar} className="w-20 h-20 " />
        </div>
        <label className={labelClassName} htmlFor="email">
          Email:
        </label>
        <input
          className={emailInputClassName}
          type="email"
          ref={emailRef}
          onKeyDown={(e) => setFormToValid()}
        />
        {formValidity.email ? null : (
          <p className="text-red-500">Please enter a valid email</p>
        )}
        <label className={labelClassName} htmlFor="password">
          Password:
        </label>
        <input
          className={passwordInputClassName}
          type="password"
          ref={passwordRef}
          onKeyDown={(e) => setFormToValid()}
        />
        {formValidity.password ? null : (
          <p className="text-red-500">Please enter a valid password</p>
        )}
        <button
          type="submit"
          className="px-3 py-2 mt-4 bg-purple-400 text-white rounded "
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
