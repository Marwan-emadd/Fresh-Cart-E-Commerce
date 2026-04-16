import axios from "axios";
import { useState } from "react";
import { CartContext } from "./CartContext";

export default function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  }

  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  }

  function updateCartCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        cartCount,
        setCartCount,
        removeCartItem,
        updateCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
