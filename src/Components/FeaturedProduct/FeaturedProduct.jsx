import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

function getFeaturedProducts() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/products");
}

export default function FeaturedProduct() {
  let { isLoading, data } = useQuery({
    queryKey: ["FeaturedProducts"],
    queryFn: getFeaturedProducts,
    // enabled: false, // Disable automatic fetching on component mount
    cacheTime: 3000, // Cache for 3 seconds
    // staleTime: 1000 * 60 * 1, // Data is fresh for 1 minute
    // refetchOnMount: true, // Refetch when component mounts
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  let { addToCart } = useContext(CartContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.status === "success") {
      toast.success("Product added to cart successfully!", {
        duration: 4000,
        position: "bottom-right",
      });
    } else {
      toast.error("Failed to add product to cart. Please try again.", {
        duration: 4000,
        position: "bottom-right",
      });
    }
    console.log(response);
  }

  return (
    <>
      {isLoading ? (
        <div className="w-full py-5 flex justify-center">
          <i className="fa-solid fa-spinner fa-spin-pulse text-main fa-2xl "></i>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-5 py-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {data?.data.data.map((product) => (
              <div key={product.id}>
                <div className="group product cursor-pointer py-3 px-2 bg-white rounded-2xl border border-gray-100 shadow-md hover:border-emerald-400 hover:shadow-2xl transition-all duration-300">
                  <Link to={`/ProductDetails/${product.id}`} key={product.id}>
                    <img
                      src={product.imageCover}
                      alt=""
                      className="w-full h-50 object-contain md:object-cover border-white rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="text-main text-xs md:text-sm font-semibold mt-2 block">
                      {product.category.name}
                    </span>
                    <h3 className="text-xs md:text-sm font-medium text-gray-800 mt-1">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-main text-xs md:text-sm font-semibold">
                        {product.price} EGP
                      </span>
                      <span className="text-yellow-500 text-xs flex items-center gap-1">
                        <i className="fa-solid fa-star"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addProduct(product.id)}
                    className="bg-main hover:opacity-80 text-white text-xs md:text-sm w-full mt-3 py-2 rounded-xl transition-opacity duration-300 cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
