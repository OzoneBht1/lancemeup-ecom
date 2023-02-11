import React from "react";
import AppLogo from "../assets/AppLogo.png";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "../store/hooks";
import { NavLink } from "react-router-dom";

const UserNavbar = () => {
  const user = useAppSelector((state) => state.user.user);
  let navItemsCentral: string[];
  let navItemsEnd: string;

  return (
    <nav className="flex items-center sticky top-0 left-0 p-5 h-navbar justify-between shadow-md">
      <div className="flex items-center">
        <img src={AppLogo} alt="App Logo" className="h-20 w-20" />
        <button className="text-black font-bold py-3 px-6 rounded m-3 mt-5 hover:shadow-lg">
          Login
        </button>
        <NavLink to="/login">
          <button className="text-black font-bold py-3 px-6 rounded m-3 mt-5 hover:shadow-lg">
            Register
          </button>
        </NavLink>
      </div>
      <div>
        <button className="text-white font-bold py-3 px-6 rounded m-3 mt-5 hover:shadow-lg">
          <ShoppingCartIcon className="h-10 w-10 text-purple-dark" />
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
