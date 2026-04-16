import React, { useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {
  let { getLoggedUserCart, removeCartItem, updateCartCount } =
    useContext(CartContext);

  let { data: cartDetails, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
    removeCartItem,
    updateCartCount,
    refetchInterval: 1000, // Refetch every 1 second
  });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Fresh Cart | Cart</title>
        </Helmet>
      </HelmetProvider>

      {isLoading ? (
        <div className="w-full py-5 flex justify-center">
          <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
        </div>
      ) : (
        <div className="w-[80%] bg-[#eeeeee] p-4 m-10 mx-auto border border-gray-300 rounded-xl shadow-xl">
          <h3 className="text-2xl font-semibold text-center mb-2">
            Shopping Cart
          </h3>
          <h4 className="text-main text-center mb-2">
            Cart items : {cartDetails?.numOfCartItems}
          </h4>
          <h4 className="text-main text-center mb-5">
            Total Cart Price : {cartDetails?.data?.totalCartPrice} EGP
          </h4>

          {cartDetails?.data?.products?.map((product) => (
            <div
              className="flex items-center gap-4 mb-4 border-b border-gray-300 pb-4"
              key={product.product._id}
            >
              <div>
                <img
                  className="w-20 h-25 object-cover border border-gray-300 rounded-lg shadow-md"
                  src={product.product.imageCover}
                  alt=""
                />
              </div>

              <div className="flex justify-between items-center flex-1">
                <div>
                  <h3 className="font-medium text-gray-800">
                    {product.product.title.split(" ").slice(0, 3).join(" ")}
                  </h3>
                  <h6 className="text-main mt-1">
                    Price : {product.price} EGP
                  </h6>
                  <div>
                    <button
                      onClick={() => removeCartItem(product.product._id)}
                      className="text-xs mt-1 flex items-center gap-1 hover:opacity-70 transition-opacity duration-200"
                    >
                      <i className="fas fa-trash-can text-red-500"></i>
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1 bg-white shadow-md">
                  <button
                    onClick={() =>
                      updateCartCount(product.product._id, product.count + 1)
                    }
                    className="text-lg font-semibold text-main hover:opacity-70 transition-opacity duration-200"
                  >
                    +
                  </button>
                  <span className="mx-2 font-medium">{product.count}</span>
                  <button
                    onClick={() =>
                      updateCartCount(product.product._id, product.count - 1)
                    }
                    className="text-lg font-semibold text-main hover:opacity-70 transition-opacity duration-200"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
