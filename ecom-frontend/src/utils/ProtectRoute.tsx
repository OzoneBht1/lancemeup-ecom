import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import { useAppSelector } from "../store/hooks";

const ProtectRoute = () => {
  const user = useAppSelector((state) => state.user.user);
  console.log(user);
  return user ? <Outlet /> : <Login />;
};

export default ProtectRoute;
