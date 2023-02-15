import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserNavbar from "./components/UserNavbar";

import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ICart, IUser } from "./types/types";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUser } from "./store/slices/usersSlice";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import { setCart } from "./store/slices/cartSlice";
import { useGetProductsApiQuery } from "./store/slices/apiSlices/productsApiSlice";
import { setProducts } from "./store/slices/productsSlice";
import EditProduct from "./components/EditProduct";

function App() {
  const [userInLocalStorage, setUserInLocalStorage] = useLocalStorage<IUser>(
    "user",
    {} as IUser
  );
  const [cartInLocalStorage, setCartInLocalStorage] = useLocalStorage<ICart[]>(
    `cartItems-${userInLocalStorage?.username}`,
    []
  );
  const { data: products, isLoading: productsIsLoading } =
    useGetProductsApiQuery(null);
  console.log(products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products));
    }
  }, [products]);

  useEffect(() => {
    if (userInLocalStorage && Object.keys(userInLocalStorage).length !== 0) {
      // update state only if user is not empty
      dispatch(setUser(userInLocalStorage));
    }
  }, [userInLocalStorage]);

  useEffect(() => {
    if (cartInLocalStorage && Object.keys(cartInLocalStorage).length !== 0) {
      // update state only if user is not empty
      dispatch(setCart(cartInLocalStorage));
    }
  }, [cartInLocalStorage]);

  const cartVisibility = useAppSelector((state) => state.cart.showCart);
  const editModalVisibility = useAppSelector(
    (state) => state.products.editVisible
  );

  return (
    <BrowserRouter>
      <div className="App">
        {cartVisibility && <Cart />}
        {editModalVisibility.visibile && <EditProduct />}
        <UserNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
