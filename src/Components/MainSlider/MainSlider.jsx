import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import banner1 from "../../assets/images/ad-banner-1.png";
import banner2 from "../../assets/images/ad-banner-2.png";

export default function MainSlider() {
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="flex mx-4 my-4 ">
      <div className=" w-[70%]">
        <Slider {...settings}>
          <img
            className="w-full h-50 md:h-115 object-cover"
            src={slide1}
            alt="Slides 1"
          />
          <img
            className="w-full h-50 md:h-115 object-cover"
            src={slide2}
            alt="Slides 2"
          />
          <img
            className="w-full h-50 md:h-115 object-cover"
            src={slide3}
            alt="Slides 3"
          />
        </Slider>
      </div>

      <div className="w-[30%]">
        <img
          className="h-25 md:h-57.5 object-cover"
          src={banner1}
          alt="Banner 1"
        />
        <img
          className="h-25 md:h-57.5 object-cover"
          src={banner2}
          alt="Banner 2"
        />
      </div>
    </div>
  );
}
