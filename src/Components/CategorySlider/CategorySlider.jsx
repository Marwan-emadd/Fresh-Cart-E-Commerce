import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Slider from "react-slick";

function getCategories() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
}

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
  };

  let { data } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
  });
  return (
    <>
      <h2 className="text-lg md:text-2xl text-gray-600 font-bold p-8">
        Popular Categories
      </h2>
      {data?.data.data ? (
        <Slider {...settings}>
          {data?.data.data.map((category) => (
            <div key={category._id} className="mt-4">
              <img
                className="object-cover w-20 h-30 md:h-50 md:w-full border rounded-xl border-gray-200 shadow-md hover:shadow-2xl transition-shadow duration-300"
                src={category.image}
                alt={category.name}
              />
            </div>
          ))}
        </Slider>
      ) : (
        ""
      )}
    </>
  );
}
