import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ClipLoader } from "react-spinners";

function getBrands() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
}
export default function Brands() {
  let { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Fresh Cart | Brands</title>
        </Helmet>
      </HelmetProvider>

      {isLoading ? (
        <div className="w-full h-110 py-5 flex justify-center items-center">
          <ClipLoader color="#0aad0a" size={50} />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-5 py-2">
          <h2 className="text-lg md:text-2xl font-semibold text-[#4B5469] p-4 my-6">
            Brands
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {data?.data.data.map((brand) => (
              <div
                key={brand._id}
                className="relative p-4 bg-white rounded-lg shadow-lg border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
                <h3 className="absolute bottom-2 left-3 text-lg font-semibold text-main text-center ">
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
