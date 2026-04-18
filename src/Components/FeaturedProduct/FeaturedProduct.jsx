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
    cacheTime: 3000,
    refetchInterval: 5000,
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
  }

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-md p-3 animate-pulse"
              >
                <div className="bg-gray-200 h-40 sm:h-48 rounded-lg mb-3" />
                <div className="bg-gray-200 h-3 rounded w-1/2 mb-2" />
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2" />
                <div className="bg-gray-200 h-3 rounded w-1/3 mb-4" />
                <div className="bg-gray-200 h-8 rounded-xl" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-5 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {data?.data.data.map((product) => (
          <div key={product.id}>
            <div className="group product cursor-pointer py-3 px-2 sm:px-3 bg-white rounded-2xl border border-gray-100 shadow-md hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
              <Link
                to={`/ProductDetails/${product.id}`}
                className="flex flex-col flex-1"
              >
                {/* Image */}
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-36 sm:h-44 md:h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Category */}
                <span className="text-main text-xs font-semibold mt-3 block truncate">
                  {product.category.name}
                </span>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-medium text-gray-800 mt-1 leading-snug line-clamp-2">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>

                {/* Price + Rating */}
                <div className="flex justify-between items-center mt-auto pt-2">
                  <span className="text-main text-xs sm:text-sm font-semibold">
                    {product.price} EGP
                  </span>
                  <span className="text-yellow-500 text-xs flex items-center gap-1">
                    <i className="fa-solid fa-star"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>

              {/* Add to Cart */}
              <button
                onClick={() => addProduct(product.id)}
                className="bg-main hover:opacity-80 text-white text-xs sm:text-sm w-full mt-3 py-2 rounded-xl transition-opacity duration-300 cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
