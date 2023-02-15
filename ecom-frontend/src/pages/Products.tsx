import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetProductsApiQuery } from "../store/slices/apiSlices/productsApiSlice";
import {
  ShoppingCartIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Product from "../components/Product";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ICart, IProduct } from "../types/types";
import { addToCart } from "../store/slices/cartSlice";
import {
  deleteProduct,
  setEditModalVisibility,
} from "../store/slices/productsSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface IProductsProps {
  isLoading: boolean;
}

let CATEGORIES: string[] | null = null;
const Products = ({ isLoading }: IProductsProps) => {
  const products = useAppSelector((state) => state.products.products);
  const [open, setOpen] = useState(false);
  console.log(products);

  const username = useAppSelector((state) => state.user.user?.username);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);

  const [cartItems, setCartItems] = useLocalStorage(
    `cartItems-${username}`,
    [] as ICart[]
  );
  const [category, setCategory] = useState<string>("");

  const [filteredProducts, setFilteredProducts] = useState<
    IProduct[] | undefined
  >(undefined);
  console.log(filteredProducts);

  const [value, setValue] = useState<[number, number]>([0, 1000]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  function handlePriceChange(value: any) {
    setValue(value as [number, number]);
    // setFilteredProducts((currProducts) =>
    //   products?.filter(
    //     (products) => products.price >= value[0] && products.price <= value[1]
    //   )
    // );
  }

  useEffect(() => {
    setFilteredProducts(products);
    const categoriesSet = new Set(
      products?.map(
        (product) =>
          product.category.charAt(0).toUpperCase() + product.category.slice(1)
      )
    );

    const uniqueCategories = Array.from(categoriesSet);
    CATEGORIES = [...uniqueCategories];
  }, [products]);

  useEffect(() => {
    console.log(category);
    if (!!category) {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            product.category === category.toLowerCase() &&
            product.price >= value[0] &&
            product.price <= value[1]
        )
      );
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            product.price >= value[0] &&
            product.price <= value[1]
        )
      );
    }
  }, [products, searchTerm, value, category]);

  const addToCartHandler = (id: number, quantity: number) => {
    const item = products?.find((product) => product.id === id);
    if (item) {
      const alreadyInCart = cart!.find((item) => item.id === id);
      console.log(alreadyInCart);
      dispatch(addToCart({ item, quantity }));
      if (alreadyInCart) {
        setCartItems(
          cart!.map((item) =>
            item.id === id
              ? { ...alreadyInCart, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        setCartItems([...cartItems!, { ...item, quantity }]);
      }
    }
  };
  const deleteHandler = (id: number) => {
    dispatch(deleteProduct(id));
  };
  const editHandler = (id: number) => {
    dispatch(setEditModalVisibility({ id, visibile: true }));
  };

  const setCategoryHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setCategory(e?.currentTarget.innerText.toLowerCase());
    setOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex w-full justify-between bg-white sticky h-52 md:h-auto top-10 md:top-20 left-0 items-center mx-2 md:mx-4 p-2 md:p-5 border-2 gap-2 ">
            <div className="flex w-3/5 p-2">
              <button
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                onClick={() => setOpen(!open)}
                className=" justify-between z-10 w-1/6 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none "
                type="button"
              >
                Categories
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              {open && (
                <div
                  id="dropdown"
                  className="absolute z-20 w-1/11 py-2 mt-8 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-button"
                >
                  {CATEGORIES?.map((category) => (
                    <button
                      key={category}
                      onClick={setCategoryHandler}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm  text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="Search Title"
                  onKeyUp={(e) => {
                    setSearchTerm(e.currentTarget.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col w-1/4 justify-center bl-2 border-gray-500">
              <h2 className="text-lg font-medium mb-4">Filter by Price</h2>
              <div className="w-full">
                <Slider
                  range
                  min={0}
                  max={1000}
                  value={value}
                  onChange={handlePriceChange}
                  railStyle={{ backgroundColor: "#CBD5E0" }}
                  trackStyle={[{ backgroundColor: "#4299E1" }]}
                  handleStyle={[
                    { backgroundColor: "#FFFFFF", border: "2px solid #4299E1" },
                    { backgroundColor: "#FFFFFF", border: "2px solid #4299E1" },
                  ]}
                />
              </div>
              <div className="flex items-center justify-between w-full mt-4">
                <span className="text-gray-500">${value[0]}</span>
                <span className="text-gray-500">${value[1]}</span>
              </div>
            </div>
          </div>

          <table className="table-auto m-5 justify-center border-x-2">
            <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.map((product) => {
                return (
                  <Product
                    onEditProduct={editHandler}
                    onDeleteProduct={deleteHandler}
                    product={product}
                    key={product.id}
                    onAddToCart={addToCartHandler}
                  />
                );
              })}
              {filteredProducts?.length === 0 && (
                <tr>
                  <td className="px-4 py-2 text-center" colSpan={7}>
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Products;
