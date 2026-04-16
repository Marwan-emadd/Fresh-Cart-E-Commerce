import React from "react";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Fresh Cart Home</title>
        </Helmet>
      </HelmetProvider>
      <MainSlider />
      <CategorySlider />
      <h2 className="text-lg md:text-2xl font-semibold text-[#4B5469] px-9 py-5 my-6">
        Popular Products
      </h2>
      <FeaturedProduct />
    </>
  );
}
