import React from "react";
import UserNavbar from "./components/UserNavbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import EditProduct from "./components/EditProduct";
import Orders from "./pages/Orders";
import ProtectRoute from "./utils/ProtectRoute";
import Cart from "./components/Cart";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ICart, IUser } from "./types/types";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUser } from "./store/slices/usersSlice";
import { useEffect } from "react";
import { setCart } from "./store/slices/cartSlice";
import { useGetProductsApiQuery } from "./store/slices/apiSlices/productsApiSlice";
import { setProducts } from "./store/slices/productsSlice";

function App() {
  const [userInLocalStorage] = useLocalStorage<IUser>("user", {} as IUser);
  const [cartInLocalStorage] = useLocalStorage<ICart[]>(
    `cartItems-${userInLocalStorage?.username}`,
    []
  );
  const { data: products, isLoading: productsIsLoading } =
    useGetProductsApiQuery(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products));
    }
  }, [products]);

  useEffect(() => {
    if (userInLocalStorage && Object.keys(userInLocalStorage).length !== 0) {
      dispatch(setUser(userInLocalStorage));
    }
  }, [userInLocalStorage]);

  useEffect(() => {
    if (cartInLocalStorage && Object.keys(cartInLocalStorage).length !== 0) {
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
          <Route
            path="/products"
            element={<Products isLoading={productsIsLoading} />}
          />
          <Route element={<ProtectRoute />}>
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
          <Route path="/order-list" element={<Orders />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
