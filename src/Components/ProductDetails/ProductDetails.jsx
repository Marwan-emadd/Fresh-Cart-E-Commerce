import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

function getProductDetails(id) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
}

export default function ProductDetails() {
  let params = useParams();
  let { data } = useQuery({
    queryKey: ["ProductDetails"],
    queryFn: () => getProductDetails(params.id),
  });

  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
      <HelmetProvider>
        <Helmet>
          <title>{data?.data.data.title}</title>
        </Helmet>
        {data?.data.data ? (
          <div className="w-[92%] md:w-[90%] mx-auto flex flex-col md:flex-row justify-around gap-6 py-6">
            <div className="border border-gray-200 rounded-lg py-4 w-full md:w-[35%] mt-0 md:mt-5 shadow-md">
              <Slider {...settings}>
                {data?.data.data.images.map((image) => (
                  <img key={image} src={image} alt="Product Image" />
                ))}
              </Slider>
            </div>

            <div className="w-full md:w-[40%] flex flex-col flex-wrap justify-center gap-4">
              <h2 className="text-md font-bold">{data?.data.data.title}</h2>
              <p className="text-sm font-light text-gray-500">
                {" "}
                {data?.data.data.description}
              </p>
              <h6 className="text-main">{data?.data.data.category?.name}</h6>
              <h6 className="text-main">Price : {data?.data.data.price} EGP</h6>
              <div className="flex justify-between gap-3">
                <span className="text-sm font-extralight">
                  Rating Quantity : {data?.data.data.ratingsQuantity}
                </span>
                <span>
                  {" "}
                  <i className="fas fa-star text-yellow-400 text-sm">
                    {data?.data.data.ratingsAverage}
                  </i>
                </span>
              </div>
              <button
                onClick={() => addProduct(data?.data.data._id)}
                className="bg-main text-white py-2 px-4 rounded-lg hover:opacity-90 mt-2 transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </HelmetProvider>
    </>
  );
}
