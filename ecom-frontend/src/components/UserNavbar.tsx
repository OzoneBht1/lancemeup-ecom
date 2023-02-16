import React, { useState } from "react";
import AppLogo from "../assets/AppLogo.png";
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
  const [openMenu, setOpenMenu] = useState(false);
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

  const openMenuHandler = () => {
    setOpenMenu(true);
  };

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
      <div className="hidden md:block">
        {navItemsToRender.map((item) => {
          console.log(item);
          return (
            <NavLink
              key={item}
              to={Page[item.replace(" ", "") as keyof typeof Page]}
              className={({ isActive }) =>
                isActive
                  ? "text-purple-md font-bold py-3 px-2 rounded m-3 hover:text-purple-md"
                  : "text-gray-500 font-bold py-3 px-2 rounded m-3 hover:text-purple-md"
              }
            >
              {item}
            </NavLink>
          );
        })}
      </div>
      {!user && (
        <div
          onClick={() => setOpenMenu((curr) => !curr)}
          className="sm:block md:hidden cursor-pointer"
        >
          <div className="space-y-2">
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
          </div>
          {openMenu && (
            <div className="absolute z-50 top-0 right-0 mt-16 mr-5 bg-white rounded-md shadow-md ">
              <div className="flex flex-col items-center gap-2 p-5 ">
                {navItemsToRender.map((item) => {
                  return (
                    <NavLink
                      key={item}
                      to={Page[item.replace(" ", "") as keyof typeof Page]}
                      className={({ isActive }) => (isActive ? "" : "")}
                    >
                      {item}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {user && user.user_type === "user" && (
        <div className="flex items-center text-center cursor-pointer">
          <CartButton />
          <button
            className=" items-center gap-2 text-purple-md border-2 border-purple-md font-bold py-3 px-6 rounded m-2 hover:scale-105 hidden md:flex"
            onClick={logoutHandler}
          >
            Logout
          </button>
          <div
            onClick={() => setOpenMenu((curr) => !curr)}
            className="sm:block md:hidden cursor-pointer"
          >
            <div className="space-y-2">
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <div className="w-8 h-0.5 bg-gray-600"></div>
            </div>
            {openMenu && (
              <div className="absolute z-50 top-0 right-0 mt-16 mr-5 bg-white rounded-md shadow-md ">
                <div className="flex flex-col items-center gap-2 p-5 ">
                  {navItemsToRender.map((item) => {
                    return (
                      <NavLink
                        key={item}
                        to={Page[item.replace(" ", "") as keyof typeof Page]}
                        className={({ isActive }) => (isActive ? "" : "")}
                      >
                        {item}
                      </NavLink>
                    );
                  })}

                  <button className="" onClick={logoutHandler}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {user && user.user_type === "admin" && (
        <div className="flex items-center text-center">
          <button
            onClick={() => nav("/order-list")}
            className="flex items-center gap-2 text-white bg-purple-md font-bold py-3 px-6 rounded m-2 hover:scale-105"
          >
            <ArchiveBoxIcon className="h-5 w-5" />
            <p className="hidden lg:block">Orders</p>
          </button>
          <button
            className="hidden lg:flex  items-center gap-2 text-purple-md border-2 border-purple-md font-bold py-3 px-6 rounded m-2 hover:scale-105"
            onClick={logoutHandler}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
          <div
            onClick={() => setOpenMenu((curr) => !curr)}
            className="sm:block md:hidden cursor-pointer"
          >
            <div className="space-y-2">
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <div className="w-8 h-0.5 bg-gray-600"></div>
            </div>
            {openMenu && (
              <div className="absolute z-50 top-0 right-0 mt-16 mr-5 bg-white rounded-md shadow-md ">
                <div className="flex flex-col items-center gap-2 p-5 ">
                  {navItemsToRender.map((item) => {
                    return (
                      <NavLink
                        key={item}
                        to={Page[item.replace(" ", "") as keyof typeof Page]}
                        className={({ isActive }) => (isActive ? "" : "")}
                      >
                        {item}
                      </NavLink>
                    );
                  })}

                  <button className="" onClick={logoutHandler}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
