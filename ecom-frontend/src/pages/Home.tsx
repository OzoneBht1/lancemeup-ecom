import React, { useEffect } from "react";
import bcrypt from "bcryptjs";
import { secret } from "../components/secret-pass";
import { useAppSelector } from "../store/hooks";
import LandingPageImg from "../assets/LandingPageImg.jpg";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, secret);
  return hashedPassword;
};
const Home = () => {
  const user = useAppSelector((state) => state.user.user);
  console.log(user);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen-minus-navbar bg-gray-200">
      <div className="flex w-1/2 border-r-1 h-3/4 border-red-500 bg-white justify-center items-start pt-56  text-center">
        <div className="text-left">
          <h1 className="text-6xl font-bold m-3 ">
            Buy the experience. <br />
            <span className="text-purple-500">Keep the memories.</span>
          </h1>
          <button className="bg-purple-500 text-white font-bold py-3 px-6 rounded m-3 mt-5 hover:shadow-lg">
            Shop Now
          </button>
          <a href="https://github.com/OzoneBht1" target="_blank">
            <button className=" text-purple-500 font-bold py-3 px-6 rounded m-3 mt-5 hover:bg-slate-200">
              Learn More
            </button>
          </a>
        </div>
      </div>
      <div className="w-1/2 border-r-1 h-3/4 border-red-500 bg-white">
        <img src={LandingPageImg} alt="Landing Page" />
      </div>
    </div>
  );
};

export default Home;
