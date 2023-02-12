import { useState } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useRoutes,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";
import UserNavbar from "./components/UserNavbar";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AddProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
