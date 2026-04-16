import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";

export default function Products() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Fresh Cart | Products</title>
        </Helmet>
      </HelmetProvider>
      <h2 className="text-lg md:text-2xl font-semibold text-[#4B5469] px-9 py-5 my-6">
        All Products
      </h2>
      <FeaturedProduct />
    </>
  );
}
