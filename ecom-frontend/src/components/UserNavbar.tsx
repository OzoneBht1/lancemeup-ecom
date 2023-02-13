import React from "react";
import AppLogo from "../assets/AppLogo.png";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { InboxStackIcon } from "@heroicons/react/24/solid";
import { logout } from "../store/slices/usersSlice";
import CartButton from "./CartButton";

enum Page {
  Home = "/",
  Products = "/products",
  AddProduct = "/add-product",
  OrderList = "/order-list",
  Login = "/login",
}

const UserNavbar = () => {
  const user = useAppSelector((state) => state.user.user);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  let navItemsToRender: string[];

  if (user) {
    if (user.user_type === "admin") {
      navItemsToRender = ["Home", "Products", "Add Product"];
    } else {
      navItemsToRender = ["Home", "Products"];
    }
  } else {
    navItemsToRender = ["Home", "Login", "Products"];
  }

  const logoutHandler = () => {
    dispatch(logout());
    nav("/", { replace: true });
  };

  return (
    <nav className="flex items-center text-center sticky top-0 left-0 p-5 h-navbar justify-between shadow-md bg-white">
      <div className="flex items-center">
        <img src={AppLogo} alt="App Logo" className="h-20 w-20" />
        {navItemsToRender.map((item) => {
          return (
            <NavLink
              key={item}
              to={Page[item.replace(" ", "") as keyof typeof Page]}
              className="text-black font-bold py-3 px-6 rounded m-3 hover:shadow-inner"
            >
              {item}
            </NavLink>
          );
        })}
      </div>

      {user && user.user_type === "user" && (
        <div className="flex items-center text-center cursor-pointer">
          <CartButton />
          <button
            className="text-white bg-gray-500 font-bold py-3 px-6 rounded m-3 hover:shadow-sm"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      )}

      {user && user.user_type === "admin" && (
        <div className="flex items-center text-center">
          <button className="text-white font-bold py-3 px-6 rounded m-3  hover:shadow-sm">
            <InboxStackIcon
              className="h-10 w-10 text-purple-dark"
              onClick={() => nav("/order-list")}
            />
          </button>
          <button
            className="text-white bg-gray-500 font-bold py-3 px-6 rounded m-3 hover:shadow-sm"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
