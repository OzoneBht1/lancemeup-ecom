import React from "react";
import AppLogo from "../assets/AppLogo.png";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ArchiveBoxIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { logout } from "../store/slices/usersSlice";
import CartButton from "./CartButton";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  const [userInLocalStorage, setUserInLocalStorage, deleteFromLocalStorage] =
    useLocalStorage("user", {});

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
    deleteFromLocalStorage("user");
    dispatch(logout());
    nav("/", { replace: true });
  };

  return (
    <nav className="flex items-center text-center sticky top-0 left-0 p-5 h-navbar justify-between shadow-md bg-white">
      <div className="flex items-center gap-2">
        <img src={AppLogo} alt="App Logo" className="h-14 w-14" />
        <h1 className="text-2xl text-gray-500">
          Shop<b className="text-purple-md">Now</b>
        </h1>
      </div>
      <div>
        {navItemsToRender.map((item) => {
          return (
            <NavLink
              key={item}
              to={Page[item.replace(" ", "") as keyof typeof Page]}
              className="text-gray-500 font-bold py-3 px-2 rounded m-3 hover:text-purple-md"
            >
              {item}
            </NavLink>
          );
        })}
      </div>
      {!user && <div></div>}

      {user && user.user_type === "user" && (
        <div className="flex items-center text-center cursor-pointer">
          <CartButton />
          <button
            className="flex items-center gap-2 text-purple-md border-2 border-purple-md font-bold py-3 px-6 rounded m-2 hover:scale-105"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      )}

      {user && user.user_type === "admin" && (
        <div className="flex items-center text-center">
          <button
            onClick={() => nav("/order-list")}
            className="flex items-center gap-2 text-white bg-purple-md font-bold py-3 px-6 rounded m-2 hover:scale-105"
          >
            <ArchiveBoxIcon className="h-5 w-5" />
            Orders
          </button>
          <button
            className="flex items-center gap-2 text-purple-md border-2 border-purple-md font-bold py-3 px-6 rounded m-2 hover:scale-105"
            onClick={logoutHandler}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
