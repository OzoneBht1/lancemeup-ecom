import React from "react";
import Login from "../pages/Login";

import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const ProtectRoute = () => {
  const user = useAppSelector((state) => state.user.user);
  return user && user.user_type === "admin" ? <Outlet /> : <Login />;
};

export default ProtectRoute;
