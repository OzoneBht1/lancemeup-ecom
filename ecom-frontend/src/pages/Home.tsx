import React, { useEffect } from "react";
import bcrypt from "bcryptjs";
import { secret } from "../components/secret-pass";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, secret);
  return hashedPassword;
};
const Home = () => {
  console.log("HE");
  useEffect(() => {
    const hashed = hashPassword("user2password").then((str) =>
      console.log(str)
    );
  }, []);

  return <div className="text-red-500 font-extrabold text-5xl">HI</div>;
};

export default Home;
