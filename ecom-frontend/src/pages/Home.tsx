import React, { useEffect } from "react";
import LandingPageImg from "../assets/LandingPageImg.jpg";
import bcrypt from "bcryptjs";

import { secret } from "../components/secret-pass";
import { useNavigate } from "react-router-dom";

// this function was used to create the hashed password for users
// const hashPassword = async (password: string) => {
//   const hashedPassword = await bcrypt.hash(password, secret);
//   return hashedPassword;
// };
const Home = () => {
  const nav = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen-minus-navbar  ">
      <div className="flex sm:w-full justify-center lg:w-2/5 border-r-1 h-3/4 items-center lg:justify-end bg-white text-center ">
        <div className="text-left">
          <h1 className="text-5xl font-bold m-3 text-purple-md ">
            Buy the experience
            <br />
            <span className="text-gray-500 text-4xl">Keep the memories.</span>
          </h1>
          <button
            onClick={() => nav("/products")}
            className="bg-purple-md text-white font-bold py-3 px-6 rounded m-3 mt-5 hover:bg-purple-md  hover:scale-105"
          >
            Explore
          </button>
          <a href="https://github.com/OzoneBht1" target="_blank">
            <button className=" text-gray-500 font-bold py-3 px-6 rounded m-3 mt-5 hover:bg-purple-md hover:text-white hover:scale-105">
              Learn More
            </button>
          </a>
        </div>
      </div>
      <div className="flex w-full justify-center lg:w-3/5 border-r-1 h-3/4 border-red-500 items-center lg:justify-center bg-white">
        <img
          src={LandingPageImg}
          alt="Landing Page"
          className="w-full min-w-[525px] min-h-[350px] md: max-w-[620px] max-h-[420px] lg:min-w-[620px] lg:min-h-[420px] "
        />
      </div>
    </div>
  );
};

export default Home;
