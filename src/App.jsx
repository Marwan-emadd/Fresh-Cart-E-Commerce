import React, { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import NotFound from "./Components/Notfound/Notfound";
import { UserContext } from "./Context/UserContext";
import ProtectedRouting from "./Components/ProtectedRouting/ProtectedRouting";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContextProvider";
import { Toaster } from "react-hot-toast";

let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRouting>
            <Home />
          </ProtectedRouting>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "products",
        element: (
          <ProtectedRouting>
            <Products />
          </ProtectedRouting>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRouting>
            <Categories />
          </ProtectedRouting>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRouting>
            <Brands />
          </ProtectedRouting>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRouting>
            <Cart />
          </ProtectedRouting>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRouting>
            <ProductDetails />
          </ProtectedRouting>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  let { setUserToken } = useContext(UserContext); // Access userToken from UserContext

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken")); // Update userToken in context if it exists in localStorage
    }
  }, [setUserToken]); // Add setUserToken to dependency array to avoid warning
  return (
    <CartContextProvider>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </CartContextProvider>
  );
}
