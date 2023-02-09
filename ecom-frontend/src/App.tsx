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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <UserNavbar /> */}
        <Routes>
          <Route path="/" element={<Home />} loader={Loader} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
