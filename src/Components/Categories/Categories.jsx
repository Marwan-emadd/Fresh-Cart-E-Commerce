import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

function getCategories() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
}

export default function Categories() {
  let { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Fresh Cart | Categories</title>
        </Helmet>
      </HelmetProvider>

      {isLoading ? (
        <div className="w-full py-5 flex justify-center">
          <i className="fa-solid fa-spinner fa-spin-pulse text-main fa-2xl "></i>{" "}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-5 py-2">
          <h2 className="text-lg md:text-2xl font-semibold text-[#4B5469] p-4 my-6">
            Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
            {data?.data.data.map((category) => (
              <div
                key={category._id}
                className="relative w-full h-100 bg-white rounded-lg shadow-lg border border-gray-100"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-80 object-contain md:object-cover rounded-lg"
                />
                <h3 className="absolute bottom-2 left-0 right-0 text-sm md:text-lg font-semibold text-[#4B5469]  text-center hover:text-[#0aad0a] transition-colors duration-300 cursor-pointer ">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
